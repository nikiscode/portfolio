'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '@/types';
import { Trophy, Calendar, Target, Users, ExternalLink, Linkedin } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index }) => {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hackathon': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'academic': return <Target className="w-5 h-5 text-blue-500" />;
      case 'leadership': return <Users className="w-5 h-5 text-green-500" />;
      case 'community': return <Users className="w-5 h-5 text-purple-500" />;
      case 'internship': return <Calendar className="w-5 h-5 text-orange-500" />;
      default: return <Trophy className="w-5 h-5 text-gemini-accent" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hackathon': return 'border-yellow-500 bg-yellow-900/20';
      case 'academic': return 'border-blue-500 bg-blue-900/20';
      case 'leadership': return 'border-green-500 bg-green-900/20';
      case 'community': return 'border-purple-500 bg-purple-900/20';
      case 'internship': return 'border-orange-500 bg-orange-900/20';
      default: return 'border-gemini-accent bg-gemini-accent/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`project-card border-l-4 ${getTypeColor(achievement.type)}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {getTypeIcon(achievement.type)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gemini-text">{achievement.title}</h3>
            <span className="text-sm text-gemini-text-secondary">{achievement.date}</span>
          </div>
          
          <p className="text-gemini-text-secondary mb-3 leading-relaxed">
            {achievement.description}
          </p>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gemini-accent uppercase tracking-wide">
              {achievement.type}
            </span>
            <span className="text-gemini-text-secondary">•</span>
            <span className="text-sm text-gemini-text-secondary">
              Impact: {achievement.impact}
            </span>
          </div>
          
          {achievement.links && (
            <div className="mt-3 flex items-center space-x-3">
              {achievement.links.linkedin && (
                <a
                  href={achievement.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Post</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {achievement.links.github && (
                <a
                  href={achievement.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gemini-text-secondary hover:text-gemini-text transition-colors text-sm"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {achievement.links.demo && (
                <a
                  href={achievement.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors text-sm"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
