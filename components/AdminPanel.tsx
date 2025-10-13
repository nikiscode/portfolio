'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Github, Award, Code, User, BookOpen } from 'lucide-react';
import { PortfolioData, Achievement, Project } from '@/types';

interface AdminPanelProps {
  portfolioData: PortfolioData;
  onDataUpdate: (data: PortfolioData) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ portfolioData, onDataUpdate }) => {
  const [activeTab, setActiveTab] = useState('achievements');
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [githubUsername, setGithubUsername] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'certificates', label: 'Certificates', icon: BookOpen },
    { id: 'github', label: 'GitHub Sync', icon: Github },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleAdd = async (type: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data: formData })
      });

      if (response.ok) {
        const result = await response.json();
        onDataUpdate(result.data);
        setIsAdding(false);
        setFormData({});
      }
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (type: string, id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, data: formData })
      });

      if (response.ok) {
        const result = await response.json();
        onDataUpdate(result.data);
        setEditingItem(null);
        setFormData({});
      }
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/portfolio?type=${type}&id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const result = await response.json();
        onDataUpdate(result.data);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncGitHub = async () => {
    if (!githubUsername) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: githubUsername, 
          token: githubToken,
          autoSync: true 
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.portfolioUpdated) {
          // Refresh portfolio data
          const portfolioResponse = await fetch('/api/portfolio');
          const updatedData = await portfolioResponse.json();
          onDataUpdate(updatedData);
        }
        alert(`GitHub sync completed! Added ${result.newProjectsAdded} new projects.`);
      }
    } catch (error) {
      console.error('Error syncing GitHub:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderAchievements = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gemini-text">Achievements</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-accent text-white rounded-lg hover:bg-gemini-accent/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gemini-darker p-6 rounded-lg border border-gemini-border"
        >
          <h4 className="text-md font-semibold text-gemini-text mb-4">Add New Achievement</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
            />
            <input
              type="text"
              placeholder="Type (e.g., Award, Recognition)"
              value={formData.type || ''}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
            />
            <input
              type="text"
              placeholder="Date"
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
              rows={3}
            />
            <textarea
              placeholder="Impact"
              value={formData.impact || ''}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
              rows={2}
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => handleAdd('achievement')}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setFormData({});
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {portfolioData.achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gemini-darker p-4 rounded-lg border border-gemini-border"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-md font-semibold text-gemini-text">{achievement.title}</h4>
                <p className="text-sm text-gemini-text-secondary mt-1">{achievement.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gemini-text-secondary">
                  <span>{achievement.date}</span>
                  <span className="px-2 py-1 bg-gemini-accent/20 text-gemini-accent rounded">
                    {achievement.type}
                  </span>
                </div>
                {achievement.impact && (
                  <p className="text-sm text-gemini-text-secondary mt-2">
                    <strong>Impact:</strong> {achievement.impact}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingItem(achievement.title);
                    setFormData(achievement);
                  }}
                  className="p-2 text-gemini-text-secondary hover:text-gemini-text transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('achievement', achievement.title)}
                  className="p-2 text-gemini-text-secondary hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gemini-text">Projects</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-accent text-white rounded-lg hover:bg-gemini-accent/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gemini-darker p-6 rounded-lg border border-gemini-border"
        >
          <h4 className="text-md font-semibold text-gemini-text mb-4">Add New Project</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
            />
            <input
              type="text"
              placeholder="Status"
              value={formData.status || ''}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
              rows={3}
            />
            <textarea
              placeholder="Tech Stack (comma separated)"
              value={formData.techStack?.join(', ') || ''}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value.split(',').map(s => s.trim()) })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
              rows={3}
            />
            <textarea
              placeholder="Features (comma separated)"
              value={formData.features?.join(', ') || ''}
              onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(s => s.trim()) })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
              rows={3}
            />
            <textarea
              placeholder="Impact"
              value={formData.impact || ''}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              className="px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
              rows={2}
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => handleAdd('project')}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setFormData({});
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {portfolioData.projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gemini-darker p-4 rounded-lg border border-gemini-border"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-md font-semibold text-gemini-text">{project.title}</h4>
                <p className="text-sm text-gemini-text-secondary mt-1">{project.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gemini-text-secondary">
                  <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded">
                    {project.status}
                  </span>
                  <span>{project.techStack.join(', ')}</span>
                </div>
                {project.impact && (
                  <p className="text-sm text-gemini-text-secondary mt-2">
                    <strong>Impact:</strong> {project.impact}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingItem(project.id.toString());
                    setFormData(project);
                  }}
                  className="p-2 text-gemini-text-secondary hover:text-gemini-text transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('project', project.id.toString())}
                  className="p-2 text-gemini-text-secondary hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderGitHubSync = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gemini-text mb-4">GitHub Integration</h3>
        <p className="text-gemini-text-secondary mb-6">
          Sync your GitHub repositories with your portfolio. This will automatically add your top repositories as projects.
        </p>
      </div>

      <div className="bg-gemini-darker p-6 rounded-lg border border-gemini-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gemini-text mb-2">
              GitHub Username
            </label>
            <input
              type="text"
              placeholder="your-username"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gemini-text mb-2">
              GitHub Token (Optional)
            </label>
            <input
              type="password"
              placeholder="ghp_xxxxxxxxxxxx"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              className="w-full px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text placeholder-gemini-text-secondary"
            />
            <p className="text-xs text-gemini-text-secondary mt-1">
              Token increases API rate limit and access to private repos
            </p>
          </div>
        </div>
        
        <button
          onClick={syncGitHub}
          disabled={!githubUsername || isLoading}
          className="mt-4 flex items-center space-x-2 px-4 py-2 bg-gemini-accent text-white rounded-lg hover:bg-gemini-accent/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Github className="w-4 h-4" />
          <span>{isLoading ? 'Syncing...' : 'Sync GitHub Data'}</span>
        </button>
      </div>

      <div className="bg-gemini-darker p-4 rounded-lg border border-gemini-border">
        <h4 className="text-md font-semibold text-gemini-text mb-2">Current GitHub Profile</h4>
        <p className="text-sm text-gemini-text-secondary">
          <strong>URL:</strong> {portfolioData.student.github}
        </p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gemini-text mb-4">Profile Information</h3>
      </div>

      <div className="bg-gemini-darker p-6 rounded-lg border border-gemini-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gemini-text mb-2">Name</label>
            <input
              type="text"
              value={portfolioData.student.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gemini-text mb-2">Title</label>
            <input
              type="text"
              value={portfolioData.student.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gemini-text mb-2">University</label>
            <input
              type="text"
              value={portfolioData.student.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="w-full px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gemini-text mb-2">Email</label>
            <input
              type="email"
              value={portfolioData.student.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gemini-text mb-2">LinkedIn</label>
            <input
              type="url"
              value={portfolioData.student.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gemini-text mb-2">GitHub</label>
            <input
              type="url"
              value={portfolioData.student.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full px-3 py-2 bg-gemini-dark border border-gemini-border rounded-lg text-gemini-text"
            />
          </div>
        </div>
        
        <button
          onClick={() => handleUpdate('student', 'profile')}
          disabled={isLoading}
          className="mt-4 flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>Update Profile</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gemini-dark">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gemini-text mb-2">Portfolio Admin Panel</h1>
          <p className="text-gemini-text-secondary">Manage your portfolio data and sync with GitHub</p>
        </div>

        <div className="bg-gemini-darker rounded-lg border border-gemini-border">
          {/* Tabs */}
          <div className="border-b border-gemini-border">
            <div className="flex space-x-1 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gemini-accent text-white'
                        : 'text-gemini-text-secondary hover:text-gemini-text hover:bg-gemini-dark'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'achievements' && renderAchievements()}
                {activeTab === 'projects' && renderProjects()}
                {activeTab === 'certificates' && renderAchievements()}
                {activeTab === 'github' && renderGitHubSync()}
                {activeTab === 'profile' && renderProfile()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
