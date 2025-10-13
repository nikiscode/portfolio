'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/types';
import { 
  Trophy, 
  Calendar, 
  Target, 
  Users, 
  Award,
  ChevronRight,
  ChevronDown,
  Star,
  Zap,
  TrendingUp
} from 'lucide-react';

interface AchievementTimelineProps {
  achievements: Achievement[];
  title?: string;
}

export const AchievementTimeline: React.FC<AchievementTimelineProps> = ({ 
  achievements, 
  title = "Achievement Timeline" 
}) => {
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hackathon': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'academic': return <Target className="w-5 h-5 text-blue-500" />;
      case 'leadership': return <Users className="w-5 h-5 text-green-500" />;
      case 'community': return <Users className="w-5 h-5 text-purple-500" />;
      case 'internship': return <Calendar className="w-5 h-5 text-orange-500" />;
      default: return <Award className="w-5 h-5 text-gemini-accent" />;
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

  const getTypeGradient = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hackathon': return 'from-yellow-500/20 to-yellow-600/10';
      case 'academic': return 'from-blue-500/20 to-blue-600/10';
      case 'leadership': return 'from-green-500/20 to-green-600/10';
      case 'community': return 'from-purple-500/20 to-purple-600/10';
      case 'internship': return 'from-orange-500/20 to-orange-600/10';
      default: return 'from-gemini-accent/20 to-gemini-accent/10';
    }
  };

  const filteredAchievements = filterType === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.type.toLowerCase() === filterType);

  const uniqueTypes = ['all', ...Array.from(new Set(achievements.map(a => a.type.toLowerCase())))];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const parseDate = (dateString: string) => {
    // Handle different date formats
    if (dateString.includes(' - ')) {
      return new Date(dateString.split(' - ')[0]);
    }
    return new Date(dateString);
  };

  // Sort achievements by date (most recent first)
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
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
          className="text-gemini-text-secondary mb-6"
        >
          Journey through my accomplishments and milestones
        </motion.p>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-2">
          {uniqueTypes.map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterType(type)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${filterType === type
                  ? 'bg-gemini-accent text-white'
                  : 'bg-gemini-hover text-gemini-text-secondary hover:text-gemini-text'
                }
              `}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gemini-accent via-gemini-accent/50 to-transparent" />

        <div className="space-y-8">
          {sortedAchievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start space-x-6"
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`
                    w-16 h-16 rounded-full border-2 flex items-center justify-center
                    ${getTypeColor(achievement.type)}
                  `}
                >
                  {getTypeIcon(achievement.type)}
                </motion.div>
                
                {/* Achievement Date */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                >
                  <span className="text-xs text-gemini-text-secondary bg-gemini-darker px-2 py-1 rounded border border-gemini-border">
                    {formatDate(achievement.date)}
                  </span>
                </motion.div>
              </div>

              {/* Achievement Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={`
                  flex-1 bg-gradient-to-r ${getTypeGradient(achievement.type)}
                  border border-gemini-border rounded-xl p-6 cursor-pointer
                  hover:border-gemini-accent transition-all duration-300
                  ${expandedAchievement === index ? 'border-gemini-accent' : ''}
                `}
                onClick={() => setExpandedAchievement(expandedAchievement === index ? null : index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-gemini-text">
                        {achievement.title}
                      </h3>
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium border
                        ${getTypeColor(achievement.type)}
                      `}>
                        {achievement.type}
                      </span>
                    </div>
                    
                    <p className="text-gemini-text-secondary leading-relaxed mb-4">
                      {achievement.description}
                    </p>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2 text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        <span>Impact: {achievement.impact}</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedAchievement === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4"
                  >
                    {expandedAchievement === index ? (
                      <ChevronDown className="w-5 h-5 text-gemini-text-secondary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gemini-text-secondary" />
                    )}
                  </motion.div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedAchievement === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-gemini-border"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gemini-text mb-3 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gemini-accent" />
                            Timeline Details
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gemini-text-secondary">Duration:</span>
                              <span className="text-sm text-gemini-text">{achievement.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gemini-text-secondary">Type:</span>
                              <span className="text-sm text-gemini-text">{achievement.type}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gemini-text mb-3 flex items-center">
                            <Star className="w-4 h-4 mr-2 text-yellow-400" />
                            Key Highlights
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-gemini-accent rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-gemini-text-secondary">
                                {achievement.impact}
                              </span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-gemini-accent rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-gemini-text-secondary">
                                Demonstrated leadership and technical excellence
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
      >
        {uniqueTypes.slice(1).map((type) => {
          const count = achievements.filter(a => a.type.toLowerCase() === type).length;
          const typeData = uniqueTypes.find(t => t === type);
          if (!typeData || count === 0) return null;

          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + uniqueTypes.indexOf(type) * 0.1 }}
              className="text-center p-4 bg-gemini-darker border border-gemini-border rounded-lg"
            >
              <div className="text-2xl font-bold text-gemini-text mb-1">{count}</div>
              <div className="text-sm text-gemini-text-secondary capitalize">{type}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

