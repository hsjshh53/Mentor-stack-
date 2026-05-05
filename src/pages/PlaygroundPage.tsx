import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Play, Save, Share2, 
  Settings, ChevronRight, ArrowLeft,
  Code2, Layout, Database, Zap, X,
  FileCode, FileJson, FileText, Eye,
  RotateCcw, Copy, Download, Github,
  Send, CheckCircle2, AlertCircle, ExternalLink,
  Lock, Globe, Loader2
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { LoadingScreen } from '../components/LoadingScreen';
import { useUserData } from '../hooks/useUserData';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/projectService';
import { githubService } from '../services/githubService';
import { DETAILED_PROJECTS } from '../constants/projects';
import { ProjectStarterCode, GithubConnection, GithubRepoMetadata } from '../types';

type TabType = 'html' | 'css' | 'js' | 'preview';

export const PlaygroundPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId?: string }>();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { loading: dataLoading } = useUserData();
  
  const [activeTab, setActiveTab] = useState<TabType>('html');
  const [files, setFiles] = useState<ProjectStarterCode>({
    html: '<!-- index.html -->\n<div id="app">\n  <h1>Hello OLYNQ Stack!</h1>\n  <p>Start coding to see the magic.</p>\n</div>',
    css: '/* style.css */\nbody {\n  font-family: system-ui, sans-serif;\n  background: #0A0A0B;\n  color: white;\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n\n#app {\n  text-align: center;\n  padding: 2rem;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 1rem;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(10px);\n}',
    js: '// script.js\nconsole.log("Playground ready!");\n\nconst title = document.querySelector("h1");\ntitle.style.color = "#10b981";'
  });
  
  const [output, setOutput] = useState<{ type: 'log' | 'error' | 'success', content: string }[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [projectData, setProjectData] = useState<any>(null);
  const [githubConnection, setGithubConnection] = useState<GithubConnection | null>(null);
  const [githubMetadata, setGithubMetadata] = useState<GithubRepoMetadata | null>(null);
  
  // Submission form state
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GitHub publish form state
  const [repoName, setRepoName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load project or draft
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      if (projectId) {
        const detailedProject = DETAILED_PROJECTS.find(p => p.id === projectId);
        setProjectData(detailedProject);

        const progress = await projectService.getProjectProgress(user.uid, projectId);
        if (progress?.draft) {
          setFiles(progress.draft);
        } else if (detailedProject?.starterCode) {
          setFiles(detailedProject.starterCode);
        }
        
        if (progress?.githubMetadata) {
          setGithubMetadata(progress.githubMetadata);
          setGithubLink(progress.githubMetadata.repoUrl);
        }
      }
    };

    loadData();
    
    // Subscribe to GitHub connection
    const unsubscribe = githubService.subscribeToConnection(user.uid, (conn) => {
      setGithubConnection(conn);
    });
    
    return () => unsubscribe();
  }, [projectId, user]);

  // Generate preview
  const generatePreview = () => {
    const combinedCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${files.css}</style>
        </head>
        <body>
          ${files.html}
          <script>
            // Capture console logs
            const originalLog = console.log;
            const originalError = console.error;
            
            console.log = (...args) => {
              window.parent.postMessage({ type: 'console', method: 'log', content: args.join(' ') }, '*');
              originalLog.apply(console, args);
            };
            
            console.error = (...args) => {
              window.parent.postMessage({ type: 'console', method: 'error', content: args.join(' ') }, '*');
              originalError.apply(console, args);
            };

            window.onerror = (msg, url, line, col, error) => {
              window.parent.postMessage({ type: 'console', method: 'error', content: \`Error: \${msg} at line \${line}\` }, '*');
              return false;
            };

            try {
              ${files.js}
            } catch (err) {
              console.error(err.message);
            }
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([combinedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setOutput(prev => [...prev, { type: 'log', content: '> Preview updated' }]);
  };

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        setOutput(prev => [...prev, { 
          type: event.data.method === 'error' ? 'error' : 'log', 
          content: event.data.content 
        }]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleRun = () => {
    generatePreview();
    setActiveTab('preview');
  };

  const handleSave = async () => {
    if (!user || !projectId) return;
    setIsSaving(true);
    try {
      await projectService.saveProjectDraft(user.uid, projectId, files);
      setOutput(prev => [...prev, { type: 'log', content: '> Draft saved to cloud' }]);
    } catch (err) {
      setOutput(prev => [...prev, { type: 'error', content: '> Failed to save draft' }]);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset? All unsaved changes will be lost.')) {
      if (projectData?.starterCode) {
        setFiles(projectData.starterCode);
      } else {
        setFiles({
          html: '<!-- index.html -->\n<div id="app">\n  <h1>Hello OLYNQ Stack!</h1>\n</div>',
          css: '/* style.css */\nbody { background: #0A0A0B; color: white; }',
          js: '// script.js\nconsole.log("Reset complete");'
        });
      }
      setOutput([{ type: 'log', content: '> Workspace reset' }]);
    }
  };

  const handleDownload = () => {
    const downloadFile = (content: string, fileName: string, contentType: string) => {
      const a = document.createElement('a');
      const file = new Blob([content], { type: contentType });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    };

    downloadFile(files.html, 'index.html', 'text/html');
    downloadFile(files.css, 'style.css', 'text/css');
    downloadFile(files.js, 'script.js', 'text/javascript');
    setOutput(prev => [...prev, { type: 'log', content: '> Project files downloaded' }]);
  };

  const handleCopy = () => {
    const content = activeTab === 'preview' ? '' : files[activeTab as keyof ProjectStarterCode];
    if (content) {
      navigator.clipboard.writeText(content);
      setOutput(prev => [...prev, { type: 'log', content: `> Copied ${activeTab.toUpperCase()} to clipboard` }]);
    }
  };

  const handleConnectGithub = async () => {
    if (!user) return;
    try {
      setOutput(prev => [...prev, { type: 'log', content: '> Connecting to GitHub...' }]);
      await githubService.connectGithub(user.uid);
      setOutput(prev => [...prev, { type: 'success', content: '> GitHub account connected successfully' }]);
    } catch (err: any) {
      setOutput(prev => [...prev, { type: 'error', content: `> GitHub connection failed: ${err.message}` }]);
    }
  };

  const handleDisconnectGithub = async () => {
    if (!user) return;
    if (window.confirm('Are you sure you want to disconnect your GitHub account?')) {
      try {
        await githubService.disconnectGithub(user.uid);
        setGithubConnection(null);
        setOutput(prev => [...prev, { type: 'log', content: '> GitHub account disconnected' }]);
      } catch (err) {
        setOutput(prev => [...prev, { type: 'error', content: '> Failed to disconnect GitHub' }]);
      }
    }
  };

  const handlePublishToGithub = async () => {
    if (!user || !projectId || !repoName) return;
    setIsPublishing(true);
    setOutput(prev => [...prev, { type: 'log', content: `> Publishing to GitHub repository: ${repoName}...` }]);
    
    try {
      // 1. Check if we need to create the repo first
      // In this flow, we assume if githubMetadata is null, we might need to create it
      // or at least try to create it. githubService.publishToGithub handles the push.
      
      if (!githubMetadata) {
        setOutput(prev => [...prev, { type: 'log', content: '> Creating new repository...' }]);
        await githubService.createRepo(user.uid, repoName, isPrivate);
        setOutput(prev => [...prev, { type: 'success', content: '> Repository created' }]);
      }

      // 2. Push files
      setOutput(prev => [...prev, { type: 'log', content: '> Pushing files to GitHub...' }]);
      const metadata = await githubService.publishToGithub(user.uid, projectId, repoName, files);
      
      setGithubMetadata(metadata);
      setGithubLink(metadata.repoUrl);
      setOutput(prev => [...prev, { type: 'success', content: `> Successfully published to: ${metadata.repoUrl}` }]);
      setShowGithubModal(false);
    } catch (err: any) {
      console.error('GitHub Publish Error:', err);
      setOutput(prev => [...prev, { type: 'error', content: `> GitHub Publish failed: ${err.message}` }]);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSubmitProject = async () => {
    if (!user || !projectId) return;
    if (!githubLink) {
      alert('Please provide a GitHub repository link.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await projectService.submitProject(user.uid, projectId, {
        githubLink,
        liveLink,
        notes,
        code: files
      });
      setOutput(prev => [...prev, { type: 'success', content: '> Project submitted successfully!' }]);
      setShowSubmissionModal(false);
      
      // Show success message then navigate
      setTimeout(() => {
        navigate(`/project/${projectId}`);
      }, 1500);
    } catch (err) {
      setOutput(prev => [...prev, { type: 'error', content: '> Failed to submit project' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || dataLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(projectId ? `/project/${projectId}` : '/dashboard')}
            className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-bold text-lg tracking-tight">
              {projectData ? projectData.title : 'Playground'}
            </h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
              {projectData ? 'Project Workspace' : 'Interactive Sandbox'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 mr-4 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Auto-saving enabled</span>
          </div>

          <Button 
            variant="outline" 
            className="h-10 px-4 text-xs border-white/10 hover:bg-white/5"
            onClick={handleSave}
            disabled={isSaving || !projectId}
          >
            <Save size={16} className={`mr-2 ${isSaving ? 'animate-spin' : ''}`} />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>

          <Button 
            className="h-10 px-6 text-xs bg-emerald-500 hover:bg-emerald-600 text-black font-bold shadow-lg shadow-emerald-500/20" 
            onClick={handleRun}
          >
            <Play size={16} className="mr-2" fill="currentColor" />
            Run Code
          </Button>

          {projectId && (
            <Button 
              className="h-10 px-6 text-xs bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-bold"
              onClick={() => setShowSubmissionModal(true)}
            >
              <Send size={16} className="mr-2" />
              Submit
            </Button>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar / File Explorer (Mobile Tabs) */}
        <div className="w-full md:w-16 bg-[#0A0A0B] border-r border-white/5 flex md:flex-col items-center py-2 md:py-6 gap-4 shrink-0 overflow-x-auto md:overflow-y-auto px-4 md:px-0">
          <button 
            onClick={() => setActiveTab('html')}
            className={`p-3 rounded-xl transition-all shrink-0 ${activeTab === 'html' ? 'bg-emerald-500/10 text-emerald-500' : 'text-white/20 hover:text-white/40'}`}
            title="index.html"
          >
            <FileCode size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('css')}
            className={`p-3 rounded-xl transition-all shrink-0 ${activeTab === 'css' ? 'bg-blue-500/10 text-blue-500' : 'text-white/20 hover:text-white/40'}`}
            title="style.css"
          >
            <Layout size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('js')}
            className={`p-3 rounded-xl transition-all shrink-0 ${activeTab === 'js' ? 'bg-yellow-500/10 text-yellow-500' : 'text-white/20 hover:text-white/40'}`}
            title="script.js"
          >
            <FileJson size={24} />
          </button>
          <div className="hidden md:block w-8 h-px bg-white/5 my-2" />
          <button 
            onClick={() => setActiveTab('preview')}
            className={`p-3 rounded-xl transition-all shrink-0 ${activeTab === 'preview' ? 'bg-purple-500/10 text-purple-500' : 'text-white/20 hover:text-white/40'}`}
            title="Live Preview"
          >
            <Eye size={24} />
          </button>
        </div>

        {/* Editor Area */}
        <div className="flex-grow flex flex-col min-w-0">
          <div className="bg-white/[0.02] px-6 py-2 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                {activeTab === 'preview' ? 'Live Preview' : `Editing ${activeTab.toUpperCase()}`}
              </span>
              {activeTab !== 'preview' && (
                <Badge className="text-[8px] border-white/5 text-white/40">
                  UTF-8
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleCopy} className="p-1.5 text-white/20 hover:text-white transition-colors" title="Copy Code">
                <Copy size={14} />
              </button>
              <button onClick={handleDownload} className="p-1.5 text-white/20 hover:text-white transition-colors" title="Download Files">
                <Download size={14} />
              </button>
              <button onClick={handleReset} className="p-1.5 text-white/20 hover:text-white transition-colors" title="Reset Code">
                <RotateCcw size={14} />
              </button>
              <Settings size={14} className="text-white/20 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>
          
          <div className="flex-grow relative overflow-hidden bg-[#050505]">
            <AnimatePresence mode="wait">
              {activeTab === 'preview' ? (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white"
                >
                  {previewUrl ? (
                    <iframe 
                      ref={iframeRef}
                      src={previewUrl}
                      className="w-full h-full border-none"
                      title="preview"
                      sandbox="allow-scripts"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0A0A0B] text-white/20 gap-4">
                      <Play size={48} className="opacity-10" />
                      <p className="text-sm font-medium">Click "Run Code" to see preview</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute inset-0 flex"
                >
                  {/* Line Numbers Mockup */}
                  <div className="w-12 bg-black/20 border-r border-white/5 flex flex-col items-center py-8 text-[10px] font-mono text-white/10 select-none">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div key={i} className="h-5 leading-5">{i + 1}</div>
                    ))}
                  </div>
                  <textarea 
                    value={files[activeTab as keyof ProjectStarterCode]}
                    onChange={(e) => setFiles(prev => ({ ...prev, [activeTab]: e.target.value }))}
                    className="flex-grow bg-transparent p-8 font-mono text-sm text-emerald-300/90 resize-none focus:ring-0 border-none outline-none leading-5"
                    spellCheck={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Console Area */}
        <div className="w-full md:w-80 bg-[#0A0A0B] border-l border-white/5 flex flex-col shrink-0">
          <div className="bg-white/[0.02] px-6 py-2 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-white/20" />
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest py-2">Console</span>
            </div>
            <button 
              onClick={() => setOutput([])} 
              className="text-[10px] font-black text-white/20 hover:text-white transition-colors uppercase tracking-widest"
            >
              Clear
            </button>
          </div>
          <div className="flex-grow p-6 font-mono text-[11px] space-y-2 overflow-y-auto bg-black/30 scrollbar-thin scrollbar-thumb-white/10">
            {output.length === 0 ? (
              <div className="text-white/10 italic">No output yet...</div>
            ) : (
              output.map((log, i) => (
                <div key={i} className={`flex gap-2 ${log.type === 'error' ? 'text-rose-400' : log.type === 'success' ? 'text-emerald-400' : 'text-white/60'}`}>
                  <span className="text-white/10 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                  <span className="break-all">{log.content}</span>
                </div>
              ))
            )}
          </div>
          
          {/* Quick Actions Footer */}
          <div className="p-4 border-t border-white/5 bg-white/[0.02]">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className={`h-8 text-[10px] border-white/5 hover:bg-white/5 ${githubConnection ? 'text-emerald-500 border-emerald-500/20' : ''}`}
                onClick={() => setShowGithubModal(true)}
              >
                <Github size={12} className="mr-2" />
                {githubConnection ? 'Published' : 'GitHub'}
              </Button>
              <Button variant="outline" className="h-8 text-[10px] border-white/5 hover:bg-white/5">
                <Share2 size={12} className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* GitHub Modal */}
      <AnimatePresence>
        {showGithubModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGithubModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0D0D0E] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5">
                      <Github size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">GitHub Integration</h2>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Version Control</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowGithubModal(false)}
                    className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {!githubConnection ? (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                      <Github size={48} className="mx-auto mb-4 text-white/20" />
                      <h3 className="font-bold mb-2">Connect your account</h3>
                      <p className="text-sm text-white/40 leading-relaxed mb-6">
                        Connect GitHub to publish your projects directly to repositories and showcase your code.
                      </p>
                      <Button 
                        fullWidth 
                        className="bg-white text-black hover:bg-white/90 font-bold"
                        onClick={handleConnectGithub}
                      >
                        Connect GitHub
                      </Button>
                    </div>
                  </div>
                ) : githubMetadata ? (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                          <CheckCircle2 size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-emerald-500">Project Published</h3>
                          <p className="text-xs text-emerald-500/60">Successfully synced with GitHub</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/40">Repository</span>
                          <span className="text-white font-mono">{githubMetadata.repoName}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/40">Status</span>
                          <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]">Active</span>
                        </div>
                      </div>
                      <Button 
                        fullWidth 
                        variant="outline" 
                        className="mt-6 border-white/10 hover:bg-white/5"
                        onClick={() => window.open(githubMetadata.repoUrl, '_blank')}
                      >
                        View on GitHub
                        <ExternalLink size={14} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <img src={githubConnection.avatarUrl} alt="" className="w-10 h-10 rounded-full border border-white/10" />
                        <div>
                          <div className="text-sm font-bold">{githubConnection.username}</div>
                          <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Connected</div>
                        </div>
                      </div>
                      <button 
                        onClick={handleDisconnectGithub}
                        className="text-[10px] font-black text-rose-500/60 hover:text-rose-500 uppercase tracking-widest transition-colors"
                      >
                        Disconnect
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Repository Name</label>
                        <input 
                          type="text" 
                          value={repoName}
                          onChange={(e) => setRepoName(e.target.value)}
                          placeholder="my-awesome-project"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-3">
                          {isPrivate ? <Lock size={18} className="text-white/40" /> : <Globe size={18} className="text-white/40" />}
                          <span className="text-sm font-medium">{isPrivate ? 'Private Repository' : 'Public Repository'}</span>
                        </div>
                        <button 
                          onClick={() => setIsPrivate(!isPrivate)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${isPrivate ? 'bg-emerald-500' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isPrivate ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>

                      <Button 
                        fullWidth 
                        className="h-12 bg-emerald-500 hover:bg-emerald-600 text-black font-bold"
                        disabled={!repoName || isPublishing}
                        onClick={handlePublishToGithub}
                      >
                        {isPublishing ? (
                          <>
                            <Loader2 size={18} className="mr-2 animate-spin" />
                            Publishing...
                          </>
                        ) : (
                          <>
                            <Github size={18} className="mr-2" />
                            Publish to GitHub
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Submission Modal */}
      <AnimatePresence>
        {showSubmissionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSubmissionModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0D0D0E] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">Submit Project</h2>
                    <p className="text-sm text-white/40">Ready to showcase your work to the world?</p>
                  </div>
                  <button 
                    onClick={() => setShowSubmissionModal(false)}
                    className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">GitHub Repository</label>
                    <div className="relative">
                      <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        type="url" 
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        placeholder="https://github.com/username/repo"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Live Demo URL</label>
                    <div className="relative">
                      <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        type="url" 
                        value={liveLink}
                        onChange={(e) => setLiveLink(e.target.value)}
                        placeholder="https://your-project.vercel.app"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Notes for Mentors</label>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific features or challenges you'd like to highlight?"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors h-24 resize-none"
                    />
                  </div>

                  {!githubConnection && (
                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex gap-4">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 h-fit">
                        <Zap size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-emerald-500 mb-1">Connect GitHub</h4>
                        <p className="text-[11px] text-emerald-500/60 leading-relaxed">
                          Connecting your GitHub account allows us to automatically sync your code and verify your commits for extra XP!
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-grow h-12 rounded-2xl border-white/5 hover:bg-white/5"
                      onClick={() => setShowSubmissionModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-grow h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold"
                      onClick={handleSubmitProject}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Submission'}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
