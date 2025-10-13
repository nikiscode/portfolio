'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '@/types';
import { Code, Globe, Database, Cloud, Brain, Wrench } from 'lucide-react';

interface SkillsSectionProps {
  skills: PortfolioData['skills'];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: skills.programmingLanguages,
      icon: <Code className="w-5 h-5 text-blue-500" />,
      color: 'border-blue-500 bg-blue-900/20'
    },
    {
      title: 'Web Technologies',
      skills: skills.webTechnologies,
      icon: <Globe className="w-5 h-5 text-green-500" />,
      color: 'border-green-500 bg-green-900/20'
    },
    {
      title: 'Databases',
      skills: skills.databases,
      icon: <Database className="w-5 h-5 text-purple-500" />,
      color: 'border-purple-500 bg-purple-900/20'
    },
    {
      title: 'Cloud Platforms',
      skills: skills.cloudPlatforms,
      icon: <Cloud className="w-5 h-5 text-orange-500" />,
      color: 'border-orange-500 bg-orange-900/20'
    },
    {
      title: 'AI/ML',
      skills: skills.aiMl,
      icon: <Brain className="w-5 h-5 text-pink-500" />,
      color: 'border-pink-500 bg-pink-900/20'
    },
    {
      title: 'Tools',
      skills: skills.tools,
      icon: <Wrench className="w-5 h-5 text-gray-500" />,
      color: 'border-gray-500 bg-gray-900/20'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gemini-text mb-6">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`project-card border-l-4 ${category.color}`}
          >
            <div className="flex items-center space-x-3 mb-4">
              {category.icon}
              <h3 className="text-lg font-semibold text-gemini-text">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: (index * 0.1) + (skillIndex * 0.05) }}
                  className="skill-tag hover:scale-105 transition-transform"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
