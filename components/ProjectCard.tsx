'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ExternalLink, Github, Play, FileText, Globe, Smartphone, BookOpen, Package } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="project-card"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gemini-text">{project.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          project.status === 'Published' ? 'bg-green-900 text-green-300' :
          project.status === 'Active Development' ? 'bg-blue-900 text-blue-300' :
          project.status === 'Beta Testing' ? 'bg-yellow-900 text-yellow-300' :
          'bg-gray-900 text-gray-300'
        }`}>
          {project.status}
        </span>
      </div>

      <p className="text-gemini-text-secondary mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gemini-text mb-2">Tech Stack:</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="skill-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gemini-text mb-2">Key Features:</h4>
        <ul className="text-sm text-gemini-text-secondary space-y-1">
          {project.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-gemini-accent mr-2">•</span>
              {feature}
            </li>
          ))}
          {project.features.length > 3 && (
            <li className="text-gemini-text-secondary italic">
              +{project.features.length - 3} more features
            </li>
          )}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gemini-text mb-2">Impact:</h4>
        <p className="text-sm text-gemini-text-secondary">{project.impact}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(project.links).map(([key, value]) => {
          if (!value) return null;
          return (
            <a
              key={key}
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 bg-gemini-hover border border-gemini-border rounded-lg hover:border-gemini-accent transition-colors text-sm text-gemini-text"
            >
              {getLinkIcon(key)}
              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
};
