'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, 
  ArrowLeft,
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Sparkles,
  Star,
  Zap,
  Heart,
  Award,
  Users,
  Code,
  Globe,
  BookOpen,
  Briefcase,
  GraduationCap,
  Target,
  TrendingUp,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Calendar,
  MapPin
} from 'lucide-react';

// Import all the creative components
import { AnimatedHero } from './AnimatedHero';
import { InteractiveTimeline } from './InteractiveTimeline';
import { Project3DShowcase } from './Project3DShowcase';
import { LiveStatsDashboard } from './LiveStatsDashboard';
import { InteractiveSkillRadar } from './InteractiveSkillRadar';
import { GoogleAmbassadorHighlights } from './GoogleAmbassadorHighlights';

interface CreativeShowcaseProps {
  portfolioData: any;
}

export const CreativeShowcase: React.FC<CreativeShowcaseProps> = ({ portfolioData }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const sections = [
    { id: 'hero', label: 'Hero', component: AnimatedHero, icon: Star },
    { id: 'timeline', label: 'Timeline', component: InteractiveTimeline, icon: Calendar },
    { id: 'projects', label: 'Projects', component: Project3DShowcase, icon: Code },
    { id: 'stats', label: 'Stats', component: LiveStatsDashboard, icon: TrendingUp },
    { id: 'skills', label: 'Skills', component: InteractiveSkillRadar, icon: Zap },
    { id: 'ambassador', label: 'Ambassador', component: GoogleAmbassadorHighlights, icon: Award }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length);
    }, 8000); // 8 seconds per section

    return () => clearInterval(interval);
  }, [isPlaying, sections.length]);

  // Hide controls after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSection]);

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
    setShowControls(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setShowControls(true);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setShowControls(true);
  };

  const resetShowcase = () => {
    setCurrentSection(0);
    setIsPlaying(true);
    setShowControls(true);
  };

  const CurrentComponent = sections[currentSection].component;

  return (
    <div className={`relative min-h-screen bg-black overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Background Video/Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
              'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
              'linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)],
              y: [0, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <CurrentComponent 
              {...(currentSection === 0 ? { 
                student: portfolioData.student, 
                ambassadorHighlights: portfolioData.google_ambassador_highlights 
              } : {})}
              {...(currentSection === 1 ? { 
                achievements: portfolioData.achievements, 
                projects: portfolioData.projects 
              } : {})}
              {...(currentSection === 2 ? { 
                projects: portfolioData.projects 
              } : {})}
              {...(currentSection === 3 ? { 
                portfolioData: portfolioData 
              } : {})}
              {...(currentSection === 4 ? { 
                skills: portfolioData.skills 
              } : {})}
              {...(currentSection === 5 ? { 
                highlights: portfolioData.google_ambassador_highlights || {} 
              } : {})}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-4">
                {/* Section Navigation */}
                <div className="flex space-x-2">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSection === index 
                          ? 'bg-blue-500 scale-125' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Playback Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={togglePlayPause}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-4 h-4 text-white" />
                    ) : (
                      <Maximize className="w-4 h-4 text-white" />
                    )}
                  </button>

                  <button
                    onClick={resetShowcase}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Section Label */}
                <div className="text-white text-sm font-medium">
                  {sections[currentSection].label}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Labels */}
      <div className="fixed top-8 right-8 z-50">
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="space-y-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(index)}
                className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-all duration-300 ${
                  currentSection === index 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-gray-800">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowControls(!showControls)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.button>

      {/* Quick Actions */}
      <div className="fixed top-8 left-8 z-50">
        <div className="flex space-x-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/chat"
            className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Chat with AI</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={portfolioData.student.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium">GitHub</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={portfolioData.student.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm font-medium">LinkedIn</span>
          </motion.a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-white/60"
        >
          <span className="text-xs">Scroll to explore</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </div>
  );
};
