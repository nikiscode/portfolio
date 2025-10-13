'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  Zap
} from 'lucide-react';

interface GoogleAmbassadorHighlightsProps {
  highlights?: any;
}

export const GoogleAmbassadorHighlights: React.FC<GoogleAmbassadorHighlightsProps> = ({ highlights }) => {
  if (!highlights) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Loading Google Ambassador highlights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-4"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-red-500 rounded-full flex items-center justify-center">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gemini-text">
            Google Ambassador Application
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gemini-text-secondary max-w-4xl mx-auto leading-relaxed"
        >
          🌟 Empowering students through AI/ML innovation and community building
        </motion.p>
      </div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-600/20 to-red-600/20 p-8 rounded-2xl border border-blue-500/30"
      >
        <div className="flex items-start space-x-6">
          <Heart className="w-8 h-8 text-red-500 mt-2 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gemini-text mb-4">My Mission</h3>
            <p className="text-gemini-text-secondary text-xl leading-relaxed">
              {highlights.ambassador_vision.mission}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-3xl font-semibold text-gemini-text flex items-center justify-center space-x-3">
          <Award className="w-8 h-8 text-yellow-500" />
          <span>Google Certifications</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.certifications.map((cert: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-gemini-darker p-4 rounded-lg border border-gemini-border"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gemini-text">{cert.name}</h4>
                  <p className="text-sm text-gemini-text-secondary mt-1">{cert.description}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      {cert.date}
                    </span>
                    <span className="text-xs text-gemini-text-secondary">
                      {cert.project}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Innovation Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-semibold text-gemini-text flex items-center space-x-2">
          <Lightbulb className="w-6 h-6 text-purple-500" />
          <span>Innovation Showcase</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.innovation_showcase.map((project: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-gemini-darker p-4 rounded-lg border border-gemini-border hover:border-purple-500/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-purple-500" />
                  <h4 className="font-semibold text-gemini-text">{project.project}</h4>
                </div>
                <p className="text-sm text-gemini-text-secondary">{project.innovation}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-green-400">{project.impact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leadership Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-semibold text-gemini-text flex items-center space-x-2">
          <Users className="w-6 h-6 text-green-500" />
          <span>Leadership Experience</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.leadership_experience.map((exp: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="bg-gemini-darker p-4 rounded-lg border border-gemini-border"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-green-500" />
                  <h4 className="font-semibold text-gemini-text">{exp.role}</h4>
                </div>
                <p className="text-sm text-gemini-text-secondary">{exp.description}</p>
                <p className="text-xs text-green-400">{exp.impact}</p>
                <div className="flex flex-wrap gap-1">
                  {exp.skills.map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Ambassador Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-lg border border-green-500/30"
      >
        <h3 className="text-2xl font-semibold text-gemini-text mb-4 flex items-center space-x-2">
          <Target className="w-6 h-6 text-green-500" />
          <span>Ambassador Goals</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.ambassador_vision.goals.map((goal: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gemini-text">{goal}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Google */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center space-y-4"
      >
        <h3 className="text-2xl font-semibold text-gemini-text flex items-center justify-center space-x-2">
          <Rocket className="w-6 h-6 text-blue-500" />
          <span>Why Google?</span>
        </h3>
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-lg text-gemini-text-secondary">
            {highlights.ambassador_vision.why_google}
          </p>
          <div className="bg-gemini-darker p-4 rounded-lg border border-gemini-border">
            <p className="text-gemini-text font-semibold">
              {highlights.ambassador_vision.unique_value}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
