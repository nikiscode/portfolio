'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { 
  ExternalLink, 
  Github, 
  Play, 
  FileText, 
  Globe, 
  Smartphone, 
  BookOpen, 
  Package,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  Users,
  TrendingUp
} from 'lucide-react';

interface ProjectShowcaseProps {
  projects: Project[];
  title?: string;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ 
  projects, 
  title = "Featured Projects" 
}) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const getLinkIcon = (linkType: string) => {
    switch (linkType) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'demo': return <Play className="w-4 h-4" />;
      case 'caseStudy': return <FileText className="w-4 h-4" />;
      case 'website': return <Globe className="w-4 h-4" />;
      case 'appStore':
      case 'playStore': return <Smartphone className="w-4 h-4" />;
      case 'documentation': return <BookOpen className="w-4 h-4" />;
      case 'pypi': return <Package className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-900 text-green-300 border-green-500';
      case 'Active Development': return 'bg-blue-900 text-blue-300 border-blue-500';
      case 'Beta Testing': return 'bg-yellow-900 text-yellow-300 border-yellow-500';
      case 'Maintained': return 'bg-purple-900 text-purple-300 border-purple-500';
      default: return 'bg-gray-900 text-gray-300 border-gray-500';
    }
  };

  const getTechStackColor = (tech: string) => {
    const colors = [
      'bg-blue-900 text-blue-300 border-blue-500',
      'bg-green-900 text-green-300 border-green-500',
      'bg-purple-900 text-purple-300 border-purple-500',
      'bg-orange-900 text-orange-300 border-orange-500',
      'bg-pink-900 text-pink-300 border-pink-500',
      'bg-cyan-900 text-cyan-300 border-cyan-500',
    ];
    return colors[tech.length % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gemini-text mb-2"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gemini-text-secondary"
        >
          Interactive showcase of my latest projects
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative group"
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className={`
                bg-gradient-to-br from-gemini-darker to-gemini-dark
                border border-gemini-border rounded-xl p-6
                transition-all duration-300 cursor-pointer
                ${hoveredProject === index 
                  ? 'border-gemini-accent shadow-2xl shadow-gemini-accent/20' 
                  : 'hover:border-gemini-accent/50'
                }
              `}
              onClick={() => setExpandedProject(expandedProject === index ? null : index)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gemini-text mb-2 group-hover:text-gemini-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gemini-text-secondary text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedProject === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expandedProject === index ? (
                      <ChevronUp className="w-5 h-5 text-gemini-text-secondary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gemini-text-secondary" />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gemini-text mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-gemini-accent" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: techIndex * 0.05 }}
                      className={`px-2 py-1 rounded-md text-xs font-medium border ${getTechStackColor(tech)}`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 rounded-md text-xs font-medium bg-gemini-hover text-gemini-text-secondary border border-gemini-border">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Impact */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gemini-text mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                  Impact
                </h4>
                <p className="text-sm text-gemini-text-secondary">{project.impact}</p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(project.links).slice(0, 3).map(([key, value]) => {
                  if (!value) return null;
                  return (
                    <motion.a
                      key={key}
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-3 py-2 bg-gemini-hover border border-gemini-border rounded-lg hover:border-gemini-accent transition-colors text-sm text-gemini-text"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {getLinkIcon(key)}
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </motion.a>
                  );
                })}
                {Object.keys(project.links).length > 3 && (
                  <span className="px-3 py-2 text-sm text-gemini-text-secondary">
                    +{Object.keys(project.links).length - 3} more links
                  </span>
                )}
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedProject === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-gemini-border"
                  >
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gemini-text mb-3 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-gemini-accent rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gemini-text-secondary">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* All Links */}
                    <div>
                      <h4 className="text-sm font-medium text-gemini-text mb-3 flex items-center">
                        <ExternalLink className="w-4 h-4 mr-2 text-gemini-accent" />
                        All Links
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(project.links).map(([key, value]) => {
                          if (!value) return null;
                          return (
                            <motion.a
                              key={key}
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center space-x-2 px-3 py-2 bg-gemini-hover border border-gemini-border rounded-lg hover:border-gemini-accent transition-colors text-sm text-gemini-text"
                            >
                              {getLinkIcon(key)}
                              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </motion.a>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

