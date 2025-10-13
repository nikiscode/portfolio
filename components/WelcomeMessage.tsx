'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Student, About } from '@/types';
import { MessageCircle, Code, Trophy, Users, Mail, Github, Linkedin, Twitter } from 'lucide-react';

interface WelcomeMessageProps {
  student: Student;
  about: About;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ student, about }) => {
  const quickActions = [
    { label: 'Show me your projects', icon: <Code className="w-4 h-4" /> },
    { label: 'Tell me about your achievements', icon: <Trophy className="w-4 h-4" /> },
    { label: 'What are your skills?', icon: <Users className="w-4 h-4" /> },
    { label: 'Tell me about yourself', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 bg-gemini-accent rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span className="text-2xl font-bold text-white">
            {student.name.split(' ').map(n => n[0]).join('')}
          </span>
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gemini-text mb-2">{student.name}</h1>
        <p className="text-lg text-gemini-text-secondary mb-4">{student.title}</p>
        <p className="text-gemini-text-secondary">{student.university} • {student.location}</p>
      </div>

      {/* About Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gemini-darker border border-gemini-border rounded-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-gemini-text mb-4">About Me</h2>
        <p className="text-gemini-text-secondary leading-relaxed mb-4">{about.summary}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gemini-text mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {about.interests.slice(0, 3).map((interest, index) => (
                <span key={index} className="skill-tag text-xs">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gemini-text mb-2">Goals</h3>
            <div className="flex flex-wrap gap-2">
              {about.goals.slice(0, 3).map((goal, index) => (
                <span key={index} className="skill-tag text-xs">
                  {goal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold text-gemini-text mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              className="flex items-center space-x-3 p-4 bg-gemini-darker border border-gemini-border rounded-lg hover:border-gemini-accent transition-colors text-left"
            >
              {action.icon}
              <span className="text-gemini-text">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Contact Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="flex justify-center space-x-4"
      >
        <a
          href={`mailto:${student.email}`}
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-hover border border-gemini-border rounded-lg hover:border-gemini-accent transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span className="text-gemini-text">Email</span>
        </a>
        <a
          href={student.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-hover border border-gemini-border rounded-lg hover:border-gemini-accent transition-colors"
        >
          <Github className="w-4 h-4" />
          <span className="text-gemini-text">GitHub</span>
        </a>
        <a
          href={student.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-hover border border-gemini-border rounded-lg hover:border-gemini-accent transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          <span className="text-gemini-text">LinkedIn</span>
        </a>
        <a
          href={student.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-hover border border-gemini-border rounded-lg hover:border-gemini-accent transition-colors"
        >
          <Twitter className="w-4 h-4" />
          <span className="text-gemini-text">Twitter</span>
        </a>
      </motion.div>
    </motion.div>
  );
};
