'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  Award, 
  Users, 
  Lightbulb, 
  Target, 
  CheckCircle, 
  Star,
  Rocket,
  Heart,
  Globe,
  BookOpen,
  Code,
  Zap,
  TrendingUp,
  Calendar,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink
} from 'lucide-react';

interface AnimatedHeroProps {
  student?: any;
  ambassadorHighlights?: any;
}

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({ student, ambassadorHighlights }) => {
  const [currentStat, setCurrentStat] = useState(0);
  const controls = useAnimation();

  if (!student || !ambassadorHighlights) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Loading hero section...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "AI Projects", value: "7+", icon: Code },
    { label: "GitHub Repos", value: "12+", icon: Github },
    { label: "Technologies", value: "25+", icon: Zap },
    { label: "Certifications", value: "4+", icon: Award }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [stats.length]);

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity }
    });
  }, [controls]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-red-500/20 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Google Ambassador Badge */}
            <motion.div
              animate={controls}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-red-600 px-6 py-3 rounded-full"
            >
              <Award className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">Google Ambassador Candidate</span>
            </motion.div>

            {/* Name and Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl lg:text-6xl font-bold text-white"
              >
                {student.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl lg:text-2xl text-blue-200"
              >
                {student.title}
              </motion.p>
            </div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
            >
              <div className="flex items-start space-x-4">
                <Heart className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">My Mission</h3>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    {ambassadorHighlights.ambassador_vision.mission}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={student.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5 text-white" />
                <span className="text-white">GitHub</span>
              </a>
              <a
                href={student.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
                <span className="text-white">LinkedIn</span>
              </a>
              <a
                href={`mailto:${student.email}`}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5 text-white" />
                <span className="text-white">Email</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Stats Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 transition-all duration-300 ${
                    currentStat === index ? 'border-blue-400 bg-blue-500/20' : ''
                  }`}
                >
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-1">
                      <motion.div
                        key={currentStat}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-white"
                      >
                        {stat.value}
                      </motion.div>
                      <p className="text-blue-200 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-400" />
                <span>Key Achievements</span>
              </h3>
              <div className="space-y-3">
                {ambassadorHighlights.certifications.map((cert: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-blue-100">{cert.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Rocket className="w-6 h-6 inline mr-2" />
                Explore My Journey
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
