'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  ExternalLink, 
  Github, 
  Star,
  Zap,
  Users,
  Calendar,
  ArrowRight,
  Play,
  Eye,
  Download
} from 'lucide-react';

interface Project3DShowcaseProps {
  projects?: any[];
}

export const Project3DShowcase: React.FC<Project3DShowcaseProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  if (!projects) {
    return (
      <div className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Loading projects...</p>
        </div>
      </div>
    );
  }

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'Python': 'from-yellow-500 to-orange-500',
      'JavaScript': 'from-yellow-400 to-yellow-600',
      'TypeScript': 'from-blue-500 to-blue-700',
      'React': 'from-cyan-400 to-cyan-600',
      'Next.js': 'from-gray-700 to-gray-900',
      'Node.js': 'from-green-500 to-green-700',
      'FastAPI': 'from-teal-500 to-teal-700',
      'Streamlit': 'from-red-500 to-red-700',
      'Flask': 'from-gray-500 to-gray-700',
      'PyTorch': 'from-orange-500 to-red-500',
      'Transformers': 'from-purple-500 to-purple-700',
      'Hugging Face': 'from-yellow-500 to-yellow-700',
      'MySQL': 'from-blue-600 to-blue-800',
      'PostgreSQL': 'from-blue-500 to-blue-700',
      'MongoDB': 'from-green-600 to-green-800',
      'Docker': 'from-blue-400 to-blue-600',
      'AWS': 'from-orange-500 to-orange-700',
      'Tailwind CSS': 'from-cyan-500 to-cyan-700'
    };
    return colors[tech] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Project Showcase
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Immersive 3D experience showcasing my innovative AI/ML projects
          </p>
        </motion.div>

        {/* Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50
                  }}
                  onHoverStart={() => setHoveredProject(index)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedProject === index ? 'ring-2 ring-blue-400' : ''
                  }`}
                  onClick={() => setSelectedProject(index)}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 h-full">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <Code className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                          <p className="text-purple-200 text-sm">{project.category}</p>
                        </div>
                      </div>
                      {selectedProject === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                        >
                          <Star className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.technologies || []).slice(0, 3).map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTechColor(tech)} text-white`}
                        >
                          {tech}
                        </span>
                      ))}
                      {(project.technologies || []).length > 3 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-600 text-white">
                          +{(project.technologies || []).length - 3}
                        </span>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                      <div className="flex space-x-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            <Github className="w-4 h-4 text-white" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <AnimatePresence>
                      {hoveredProject === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                          >
                            <Eye className="w-8 h-8 text-white" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Project Details Panel */}
          <div className="lg:col-span-1">
            <motion.div
              key={selectedProject}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-8"
            >
              <div className="space-y-6">
                {/* Project Header */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Code className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {projects[selectedProject]?.title}
                  </h3>
                  <p className="text-purple-200">
                    {projects[selectedProject]?.category}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {projects[selectedProject]?.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {(projects[selectedProject]?.features || []).slice(0, 4).map((feature: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Zap className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject]?.technologies?.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTechColor(tech)} text-white`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Impact</h4>
                  <p className="text-gray-300 text-sm">
                    {projects[selectedProject]?.impact}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {projects[selectedProject]?.githubUrl && (
                    <a
                      href={projects[selectedProject].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </a>
                  )}
                  {projects[selectedProject]?.demoUrl && (
                    <a
                      href={projects[selectedProject].demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg transition-colors"
                    >
                      <Play className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {(projects[selectedProject]?.technologies || []).length}
                    </div>
                    <div className="text-sm text-gray-400">Technologies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {(projects[selectedProject]?.features || []).length}
                    </div>
                    <div className="text-sm text-gray-400">Features</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Project Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedProject === index 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
