'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code, 
  Github, 
  Users, 
  Award,
  TrendingUp,
  Calendar,
  Zap,
  Star,
  Target,
  Heart,
  Globe,
  BookOpen,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface LiveStatsDashboardProps {
  portfolioData?: any;
}

export const LiveStatsDashboard: React.FC<LiveStatsDashboardProps> = ({ portfolioData }) => {
  const [counters, setCounters] = useState({
    projects: 0,
    achievements: 0,
    technologies: 0,
    githubRepos: 0,
    certifications: 0
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  if (!portfolioData) {
    return (
      <div className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Loading stats dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const stats = {
    projects: portfolioData.projects?.length || 0,
    achievements: portfolioData.achievements?.length || 0,
    technologies: [
      ...(portfolioData.skills?.programmingLanguages || []),
      ...(portfolioData.skills?.webTechnologies || []),
      ...(portfolioData.skills?.databases || []),
      ...(portfolioData.skills?.cloudPlatforms || []),
      ...(portfolioData.skills?.aiMl || []),
      ...(portfolioData.skills?.tools || [])
    ].length,
    githubRepos: 12, // Based on GitHub profile
    certifications: 4 // Updated to 4+ certifications
  };

  // Animate counters
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      Object.keys(stats).forEach((key) => {
        const targetValue = stats[key as keyof typeof stats];
        const stepValue = targetValue / steps;
        let currentValue = 0;

        const interval = setInterval(() => {
          currentValue += stepValue;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(interval);
          }
          setCounters(prev => ({
            ...prev,
            [key]: Math.round(currentValue)
          }));
        }, stepDuration);
      });
    }
  }, [isInView]);

  const mainStats = [
    {
      label: 'AI/ML Projects',
      value: counters.projects,
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      description: 'Innovative AI solutions built',
      trend: '+3 this year'
    },
    {
      label: 'GitHub Repositories',
      value: counters.githubRepos,
      icon: Github,
      color: 'from-gray-600 to-gray-800',
      description: 'Open source contributions',
      trend: '+5 this year'
    },
    {
      label: 'Technologies Mastered',
      value: counters.technologies,
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      description: 'Cutting-edge tech stack',
      trend: '+8 this year'
    },
    {
      label: 'Achievements',
      value: counters.achievements,
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      description: 'Recognition & certifications',
      trend: '+2 this year'
    }
  ];

  const impactStats = [
    {
      label: 'Certifications',
      value: counters.certifications,
      icon: Award,
      color: 'from-green-500 to-teal-500',
      description: 'Professional certifications',
      suffix: '+'
    }
  ];

  const skillCategories = [
    {
      label: 'Programming Languages',
      count: portfolioData.skills.programmingLanguages.length,
      icon: Code,
      color: 'from-blue-500 to-blue-700'
    },
    {
      label: 'Web Technologies',
      count: portfolioData.skills.webTechnologies.length,
      icon: Globe,
      color: 'from-green-500 to-green-700'
    },
    {
      label: 'AI/ML Tools',
      count: portfolioData.skills.aiMl.length,
      icon: Zap,
      color: 'from-purple-500 to-purple-700'
    },
    {
      label: 'Databases',
      count: portfolioData.skills.databases.length,
      icon: BookOpen,
      color: 'from-orange-500 to-orange-700'
    },
    {
      label: 'Cloud Platforms',
      count: portfolioData.skills.cloudPlatforms.length,
      icon: Globe,
      color: 'from-cyan-500 to-cyan-700'
    },
    {
      label: 'Development Tools',
      count: portfolioData.skills.tools.length,
      icon: Briefcase,
      color: 'from-gray-500 to-gray-700'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Live Statistics Dashboard
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Real-time metrics showcasing my growth and impact as an AI/ML innovator
          </p>
        </motion.div>

        <div ref={ref}>
          {/* Main Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {mainStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Value */}
                  <div className="space-y-2">
                    <motion.div
                      key={stat.value}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-bold text-white min-h-[3rem] flex items-center justify-center"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-purple-200 font-medium text-center">{stat.label}</div>
                    <div className="text-sm text-gray-300 text-center">{stat.description}</div>
                  </div>

                  {/* Trend */}
                  <div className="flex items-center justify-center space-x-1 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          >
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                <div className="flex items-center space-x-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <motion.div
                      key={stat.value}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-5xl font-bold text-white mb-2"
                    >
                      {stat.value}{stat.suffix}
                    </motion.div>
                    <div className="text-xl text-purple-200 font-medium">{stat.label}</div>
                    <div className="text-gray-300">{stat.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              Technology Expertise Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-white">{category.count}</div>
                      <div className="text-purple-200 text-sm">{category.label}</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(category.count / Math.max(...skillCategories.map(c => c.count))) * 100}%` }}
                        transition={{ delay: 1 + index * 0.1, duration: 1 }}
                        className={`h-2 bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievement Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              Recent Achievements Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(portfolioData.achievements || []).slice(0, 3).map((achievement: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="text-center space-y-3"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{achievement.title}</h4>
                  <p className="text-purple-200 text-sm">{achievement.date}</p>
                  <p className="text-gray-300 text-xs">{achievement.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
