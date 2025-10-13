'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Code, 
  Users, 
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Zap,
  Star,
  TrendingUp,
  Target,
  Heart
} from 'lucide-react';

interface InteractiveTimelineProps {
  achievements?: any[];
  projects?: any[];
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ achievements, projects }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [filter, setFilter] = useState<'all' | 'achievements' | 'projects'>('all');

  if (!achievements || !projects) {
    return (
      <div className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Loading timeline...</p>
        </div>
      </div>
    );
  }

  // Combine and sort timeline items
  const timelineItems = [
    ...achievements.map(achievement => ({
      ...achievement,
      type: 'achievement',
      date: new Date(achievement.date),
      category: achievement.type
    })),
    ...projects.map(project => ({
      ...project,
      type: 'project',
      date: new Date(project.startDate || '2024-01-01'),
      category: 'Project'
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const filteredItems = filter === 'all' 
    ? timelineItems 
    : timelineItems.filter(item => item.type === filter.slice(0, -1));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % filteredItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [filteredItems.length]);

  const getIcon = (item: any) => {
    if (item.type === 'achievement') {
      switch (item.category) {
        case 'Certification': return Award;
        case 'Hackathon': return Zap;
        case 'Academic': return Star;
        default: return Award;
      }
    }
    return Code;
  };

  const getColor = (item: any) => {
    if (item.type === 'achievement') {
      switch (item.category) {
        case 'Certification': return 'from-yellow-500 to-orange-500';
        case 'Hackathon': return 'from-purple-500 to-pink-500';
        case 'Academic': return 'from-green-500 to-blue-500';
        default: return 'from-blue-500 to-purple-500';
      }
    }
    return 'from-indigo-500 to-purple-500';
  };

  return (
    <div className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            My Journey Timeline
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            A visual journey through my achievements, projects, and growth as an AI/ML innovator
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
            {[
              { key: 'all', label: 'All', icon: TrendingUp },
              { key: 'achievements', label: 'Achievements', icon: Award },
              { key: 'projects', label: 'Projects', icon: Code }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  filter === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {filteredItems.map((item, index) => {
              const Icon = getIcon(item);
              const isLeft = index % 2 === 0;
              const isActive = activeItem === index;

              return (
                <motion.div
                  key={`${item.type}-${item.id || index}`}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
                        isActive 
                          ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25' 
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      {/* Header */}
                      <div className={`flex items-center space-x-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                        <div className={`w-12 h-12 bg-gradient-to-r ${getColor(item)} rounded-full flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                          <div className="flex items-center space-x-2 text-blue-200">
                            <Calendar className="w-4 h-4" />
                            <span>{item.date.toLocaleDateString()}</span>
                            <span className="px-2 py-1 bg-blue-500/20 rounded-full text-xs">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-blue-100 mt-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Links */}
                      {item.links && (
                        <div className={`flex space-x-3 mt-4 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                          {item.links.github && (
                            <a
                              href={item.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              <span className="text-sm">GitHub</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {item.links.linkedin && (
                            <a
                              href={item.links.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-300 hover:text-blue-200 transition-colors"
                            >
                              <Linkedin className="w-4 h-4" />
                              <span className="text-sm">LinkedIn</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}

                      {/* Impact */}
                      {item.impact && (
                        <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <p className="text-green-200 text-sm">
                            <strong>Impact:</strong> {item.impact}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <motion.div
                      animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-6 h-6 bg-gradient-to-r ${getColor(item)} rounded-full border-4 border-gray-900 shadow-lg`}
                    />
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 w-6 h-6 bg-white/30 rounded-full"
                      />
                    )}
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Achievements', value: achievements.length, icon: Award },
            { label: 'Projects Built', value: projects.length, icon: Code },
            { label: 'Technologies Used', value: '25+', icon: Zap },
            { label: 'Community Impact', value: '500+', icon: Users }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-200">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
