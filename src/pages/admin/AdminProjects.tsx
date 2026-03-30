import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Eye, 
  Star,
  MoreVertical,
  User,
  Code,
  Github,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ref, get, update, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';

interface ProjectSubmission {
  id: string;
  userId: string;
  skillId: string;
  moduleId: string;
  githubUrl: string;
  demoUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: number;
  feedback?: string;
  isFeatured?: boolean;
  userName?: string;
  userEmail?: string;
}

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectSubmission | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    const projectsRef = ref(db, 'user_projects');
    const unsubscribe = onValue(projectsRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const projectList: ProjectSubmission[] = [];
        
        // Flatten the nested structure: user_projects/{userId}/{skillId}/{moduleId}
        for (const userId in data) {
          for (const skillId in data[userId]) {
            for (const moduleId in data[userId][skillId]) {
              const project = data[userId][skillId][moduleId];
              projectList.push({
                ...project,
                id: `${userId}_${skillId}_${moduleId}`,
                userId,
                skillId,
                moduleId
              });
            }
          }
        }

        // Sort by submittedAt descending
        projectList.sort((a, b) => b.submittedAt - a.submittedAt);
        setProjects(projectList);
      } else {
        setProjects([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleReview = async (status: 'approved' | 'rejected') => {
    if (!selectedProject) return;
    setReviewing(true);
    try {
      const { userId, skillId, moduleId } = selectedProject;
      const projectPath = `user_projects/${userId}/${skillId}/${moduleId}`;
      
      await update(ref(db, projectPath), {
        status,
        feedback: reviewFeedback,
        reviewedAt: Date.now(),
        reviewedBy: 'admin'
      });

      // If approved, maybe unlock next module or issue certificate?
      // For now, just update the status.
      
      setSelectedProject(null);
      setReviewFeedback('');
      alert(`Project ${status} successfully!`);
    } catch (error) {
      console.error('Error reviewing project:', error);
      alert('Failed to review project.');
    } finally {
      setReviewing(false);
    }
  };

  const toggleFeatured = async (project: ProjectSubmission) => {
    try {
      const { userId, skillId, moduleId } = project;
      const projectPath = `user_projects/${userId}/${skillId}/${moduleId}`;
      await update(ref(db, projectPath), {
        isFeatured: !project.isFeatured
      });
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skillId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Project Submissions</h1>
          <p className="text-gray-400">Review and manage student project submissions across all skills.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by User ID or Skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all w-full md:w-64 text-sm"
            />
          </div>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${statusFilter === s ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Skill / Module</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Submitted</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Featured</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{project.userId.substring(0, 8)}...</p>
                        <p className="text-xs text-gray-500">Student ID</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-white text-sm capitalize">{project.skillId.replace(/-/g, ' ')}</p>
                      <p className="text-xs text-gray-500">Module: {project.moduleId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      project.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                      project.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {project.status === 'approved' ? <CheckCircle2 className="w-3 h-3" /> :
                       project.status === 'rejected' ? <XCircle className="w-3 h-3" /> :
                       <Clock className="w-3 h-3" />}
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-400">{new Date(project.submittedAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleFeatured(project)}
                      className={`p-2 rounded-lg transition-all ${project.isFeatured ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-600 hover:text-gray-400'}`}
                    >
                      <Star className={`w-5 h-5 ${project.isFeatured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !reviewing && setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#161616]">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">Project Review</h2>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {/* Project Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Student ID</p>
                    <p className="text-white font-mono text-sm">{selectedProject.userId}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Skill Path</p>
                    <p className="text-white font-bold text-sm capitalize">{selectedProject.skillId.replace(/-/g, ' ')}</p>
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Project Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-blue-500/50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        <span className="text-sm font-medium">GitHub Repository</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                    </a>
                    <a 
                      href={selectedProject.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-blue-500/50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        <span className="text-sm font-medium">Live Demo</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                    </a>
                  </div>
                </div>

                {/* Feedback */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Review Feedback</h3>
                  <textarea 
                    rows={4}
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    placeholder="Provide constructive feedback to the student..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all resize-none text-sm"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-white/10 bg-[#161616] flex items-center gap-4">
                <button 
                  onClick={() => handleReview('rejected')}
                  disabled={reviewing}
                  className="flex-1 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Reject Project
                </button>
                <button 
                  onClick={() => handleReview('approved')}
                  disabled={reviewing}
                  className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Approve Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
