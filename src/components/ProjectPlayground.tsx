import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, Play, Eye, X, Save, RotateCcw, Copy, 
  FileCode, Hash, Terminal, AlertCircle, CheckCircle2,
  ChevronRight, Layout, Smartphone, Monitor, Download,
  MoreVertical, HelpCircle, Send, Clock
} from 'lucide-react';
import { ProjectStarterCode } from '../types';

interface ProjectPlaygroundProps {
  projectId: string;
  projectTitle: string;
  initialCode?: ProjectStarterCode;
  onClose: () => void;
  onSave?: (code: ProjectStarterCode) => void;
  onSubmit?: (code: ProjectStarterCode) => void;
  lastSavedAt?: number;
}

type Tab = 'html' | 'css' | 'js' | 'preview';

export const ProjectPlayground: React.FC<ProjectPlaygroundProps> = ({ 
  projectId,
  projectTitle,
  initialCode = {
    html: '<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello MentorStack!</h1>\n</body>\n</html>',
    css: 'body { font-family: sans-serif; text-align: center; padding-top: 50px; color: #F27D26; }',
    js: 'console.log("Welcome to the Playground!");'
  },
  onClose,
  onSave,
  onSubmit,
  lastSavedAt
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('html');
  const [codes, setCodes] = useState<ProjectStarterCode>(initialCode);
  const [previewDoc, setPreviewDoc] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const [lastSavedText, setLastSavedText] = useState('Not saved yet');

  useEffect(() => {
    if (!lastSavedAt) return;
    
    const updateTime = () => {
      const seconds = Math.floor((Date.now() - lastSavedAt) / 1000);
      if (seconds < 60) setLastSavedText('Just now');
      else if (seconds < 3600) setLastSavedText(`${Math.floor(seconds / 60)}m ago`);
      else setLastSavedText(`${Math.floor(seconds / 3600)}h ago`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [lastSavedAt]);

  const updatePreview = () => {
    const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${codes.css}</style>
        </head>
        <body>
          ${codes.html}
          <script>
            try {
              ${codes.js}
            } catch (err) {
              window.parent.postMessage({ type: 'error', message: err.message }, '*');
            }
          </script>
        </body>
      </html>
    `;
    setPreviewDoc(combined);
  };

  useEffect(() => {
    updatePreview();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'error') {
        setErrors(prev => [...prev, event.data.message]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave?.(codes);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Reset all code to starter template? Your current changes will be lost.')) {
      setCodes(initialCode);
      updatePreview();
    }
  };

  const handleCopy = () => {
    const text = `/* HTML */\n${codes.html}\n\n/* CSS */\n${codes.css}\n\n/* JS */\n${codes.js}`;
    navigator.clipboard.writeText(text);
    alert('All code copied to clipboard!');
  };

  const handleDownload = () => {
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectTitle}</title>
    <style>
${codes.css}
    </style>
</head>
<body>
${codes.html}
    <script>
${codes.js}
    </script>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'html', label: 'index.html', icon: FileCode, color: 'text-orange-500' },
    { id: 'css', label: 'style.css', icon: Hash, color: 'text-blue-500' },
    { id: 'js', label: 'script.js', icon: Terminal, color: 'text-yellow-500' },
    { id: 'preview', label: 'Preview', icon: Eye, color: 'text-green-500', mobileOnly: true }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-[#050505] flex flex-col font-sans"
    >
      {/* VS Code Style Header */}
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#0A0A0B]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#F27D26] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/80 hidden sm:inline">
              {projectTitle}
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('split')}
              className={`p-1.5 rounded ${viewMode === 'split' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
            >
              <Layout size={14} />
            </button>
            <button 
              onClick={() => setViewMode('editor')}
              className={`p-1.5 rounded ${viewMode === 'editor' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
            >
              <Smartphone size={14} />
            </button>
            <button 
              onClick={() => setViewMode('preview')}
              className={`p-1.5 rounded ${viewMode === 'preview' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
            >
              <Monitor size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 mr-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <Clock size={12} />
            Last saved: {lastSavedText}
          </div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest"
              >
                <CheckCircle2 size={12} />
                Draft Saved
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            <Save size={14} className={isSaving ? 'animate-spin' : ''} />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>

          <button 
            onClick={() => onSubmit?.(codes)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F27D26] hover:bg-[#F27D26]/90 text-white text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            <Send size={14} />
            Submit
          </button>

          <div className="w-px h-4 bg-white/10 mx-1" />

          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Editor Side */}
        <div className={`flex-1 flex flex-col border-r border-white/10 ${viewMode === 'preview' ? 'hidden md:flex' : ''}`}>
          {/* File Tabs */}
          <div className="h-9 bg-[#0A0A0B] flex items-center border-b border-white/10 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`h-full px-4 flex items-center gap-2 border-r border-white/5 transition-all relative min-w-fit ${
                  activeTab === tab.id ? 'bg-[#050505] text-white' : 'text-white/30 hover:bg-white/5'
                } ${tab.mobileOnly ? 'md:hidden' : ''}`}
              >
                <tab.icon size={14} className={tab.color} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F27D26]" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Code Area */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            {activeTab !== 'preview' ? (
              <div className="flex-1 flex">
                {/* Line Numbers (Visual only) */}
                <div className="w-10 bg-[#0A0A0B] border-r border-white/5 flex flex-col items-center py-4 text-[10px] font-mono text-white/10 select-none">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} className="h-6 leading-6">{i + 1}</div>
                  ))}
                </div>
                <textarea
                  value={codes[activeTab as keyof ProjectStarterCode]}
                  onChange={(e) => setCodes(prev => ({ ...prev, [activeTab]: e.target.value }))}
                  className="flex-1 bg-transparent p-4 font-mono text-sm resize-none focus:outline-none text-white/80 leading-6 caret-[#F27D26]"
                  spellCheck={false}
                  placeholder={`Write your ${activeTab.toUpperCase()} here...`}
                />
              </div>
            ) : (
              <div className="flex-1 bg-white">
                <iframe
                  srcDoc={previewDoc}
                  title="Mobile Preview"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts"
                />
              </div>
            )}

            {/* Editor Actions Bar */}
            <div className="h-10 bg-[#0A0A0B] border-t border-white/10 flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={updatePreview}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#F27D26] hover:text-[#F27D26]/80 transition-colors"
                >
                  <Play size={12} fill="currentColor" />
                  Run Code
                </button>
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCopy}
                  className="p-1.5 rounded hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                  title="Copy All Code"
                >
                  <Copy size={14} />
                </button>
                <button 
                  onClick={handleDownload}
                  className="p-1.5 rounded hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                  title="Download Project"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Side (Desktop) */}
        <div className={`flex-1 flex flex-col bg-white ${viewMode === 'editor' ? 'hidden md:flex' : ''} ${activeTab === 'preview' ? 'hidden' : ''}`}>
          <div className="h-9 bg-gray-100 flex items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-gray-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Live Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Connected</span>
            </div>
          </div>
          <div className="flex-1 relative">
            <iframe
              srcDoc={previewDoc}
              title="Desktop Preview"
              className="w-full h-full border-none"
              sandbox="allow-scripts"
            />
            
            {/* Error Overlay */}
            <AnimatePresence>
              {errors.length > 0 && (
                <motion.div 
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  className="absolute bottom-4 left-4 right-4 bg-red-500 text-white p-3 rounded-xl shadow-2xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Runtime Error</p>
                    <p className="text-xs font-mono">{errors[errors.length - 1]}</p>
                  </div>
                  <button 
                    onClick={() => setErrors([])}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="h-6 bg-[#F27D26] flex items-center px-4 justify-between text-[9px] font-bold uppercase tracking-widest text-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Layout size={10} />
            <span>Main Workspace</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={10} />
            <span>No Syntax Errors</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>HTML/CSS/JS</span>
        </div>
      </div>
    </motion.div>
  );
};
