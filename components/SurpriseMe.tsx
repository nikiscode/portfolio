'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioData } from '@/types';
import { 
  Sparkles, 
  Gift, 
  Star, 
  Zap, 
  Trophy, 
  Code, 
  Brain,
  Heart,
  Rocket,
  Crown,
  Target,
  Users
} from 'lucide-react';

interface SurpriseMeProps {
  portfolioData: PortfolioData;
}

interface SurpriseItem {
  type: 'project' | 'achievement' | 'skill' | 'fun-fact';
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  data: any;
}

export const SurpriseMe: React.FC<SurpriseMeProps> = ({ portfolioData }) => {
  const [currentSurprise, setCurrentSurprise] = useState<SurpriseItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const generateSurprise = (): SurpriseItem => {
    const surprises: SurpriseItem[] = [
      // Project surprises
      ...(portfolioData.projects || []).map(project => ({
        type: 'project' as const,
        title: `🚀 Amazing Project: ${project.title}`,
        description: project.description,
        icon: <Code className="w-8 h-8" />,
        color: 'from-blue-500 to-purple-600',
        data: project
      })),
      
      // Achievement surprises
      ...(portfolioData.achievements || []).map(achievement => ({
        type: 'achievement' as const,
        title: `🏆 Impressive Achievement: ${achievement.title}`,
        description: achievement.description,
        icon: <Trophy className="w-8 h-8" />,
        color: 'from-yellow-500 to-orange-600',
        data: achievement
      })),
      
      // Skill surprises
      {
        type: 'skill' as const,
        title: '💻 Technical Expertise',
        description: `Proficient in ${(portfolioData.skills?.programmingLanguages || []).length} programming languages and ${(portfolioData.skills?.aiMl || []).length} AI/ML technologies!`,
        icon: <Brain className="w-8 h-8" />,
        color: 'from-green-500 to-teal-600',
        data: portfolioData.skills
      },
      
      // Fun facts
      {
        type: 'fun-fact' as const,
        title: '⭐ Fun Fact About Me',
        description: `I'm passionate about ${portfolioData.about.interests[0]} and my goal is to ${portfolioData.about.goals[0].toLowerCase()}. Currently studying ${portfolioData.student.major} at ${portfolioData.student.university}!`,
        icon: <Heart className="w-8 h-8" />,
        color: 'from-pink-500 to-rose-600',
        data: portfolioData.about
      },
      
      // Special surprises
      {
        type: 'fun-fact' as const,
        title: '🎯 Google Student Ambassador Material',
        description: `With ${(portfolioData.projects || []).length} innovative projects, ${(portfolioData.achievements || []).length} achievements, and expertise in AI/ML, I'm ready to represent Google and inspire fellow students!`,
        icon: <Crown className="w-8 h-8" />,
        color: 'from-purple-500 to-indigo-600',
        data: { special: true }
      }
    ];

    return surprises[Math.floor(Math.random() * surprises.length)];
  };

  const handleSurpriseMe = () => {
    setIsAnimating(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      const surprise = generateSurprise();
      setCurrentSurprise(surprise);
      setIsAnimating(false);
      
      setTimeout(() => setShowConfetti(false), 2000);
    }, 1500);
  };

  const getRandomEmoji = () => {
    const emojis = ['🎉', '✨', '🌟', '💫', '🎊', '🎈', '🎁', '🎀'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

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
          🎁 Surprise Me!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gemini-text-secondary mb-6"
        >
          Let me show you something amazing about myself!
        </motion.p>

        {/* Surprise Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSurpriseMe}
          disabled={isAnimating}
          className={`
            relative px-8 py-4 rounded-xl font-semibold text-lg transition-all
            ${isAnimating 
              ? 'bg-gemini-accent/50 cursor-not-allowed' 
              : 'bg-gradient-to-r from-gemini-accent to-blue-600 hover:from-blue-600 hover:to-purple-600'
            }
            text-white shadow-lg hover:shadow-xl
          `}
        >
          {isAnimating ? (
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <span>Generating surprise...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5" />
              <span>Surprise Me!</span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                  y: -50,
                  rotate: 0,
                  scale: 0
                }}
                animate={{ 
                  y: (typeof window !== 'undefined' ? window.innerHeight : 1080) + 50,
                  rotate: 360,
                  scale: 1
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute text-2xl"
              >
                {getRandomEmoji()}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Surprise Content */}
      <AnimatePresence>
        {currentSurprise && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className={`
              bg-gradient-to-br ${currentSurprise.color}
              border border-gemini-border rounded-2xl p-8
              shadow-2xl
            `}>
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
                >
                  {currentSurprise.icon}
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  {currentSurprise.title}
                </motion.h3>
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <p className="text-white/90 text-lg leading-relaxed text-center">
                  {currentSurprise.description}
                </p>

                {/* Special content based on type */}
                {currentSurprise.type === 'project' && (
                  <div className="mt-6 p-4 bg-white/10 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentSurprise.data.techStack.map((tech: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-white/20 text-white rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {currentSurprise.type === 'achievement' && (
                  <div className="mt-6 p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center justify-between text-white">
                      <span className="font-semibold">Impact:</span>
                      <span>{currentSurprise.data.impact}</span>
                    </div>
                  </div>
                )}

                {currentSurprise.type === 'skill' && (
                  <div className="mt-6 p-4 bg-white/10 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Skill Categories:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-white/90">
                      <div>Programming: {currentSurprise.data.programmingLanguages.length} languages</div>
                      <div>AI/ML: {currentSurprise.data.aiMl.length} technologies</div>
                      <div>Web Tech: {currentSurprise.data.webTechnologies.length} frameworks</div>
                      <div>Cloud: {currentSurprise.data.cloudPlatforms.length} platforms</div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSurpriseMe}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                >
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Surprise Me Again!
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fun Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
      >
        {[
          { label: 'Projects', value: portfolioData.projects.length, icon: <Rocket className="w-5 h-5" /> },
          { label: 'Achievements', value: portfolioData.achievements.length, icon: <Trophy className="w-5 h-5" /> },
          { label: 'Skills', value: Object.values(portfolioData.skills).flat().length, icon: <Brain className="w-5 h-5" /> },
          { label: 'Languages', value: portfolioData.skills.programmingLanguages.length, icon: <Code className="w-5 h-5" /> }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="text-center p-4 bg-gemini-darker border border-gemini-border rounded-lg"
          >
            <div className="flex items-center justify-center mb-2 text-gemini-accent">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gemini-text mb-1">{stat.value}</div>
            <div className="text-sm text-gemini-text-secondary">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

