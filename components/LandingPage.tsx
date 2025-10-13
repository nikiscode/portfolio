'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  Code, 
  BookOpen, 
  Briefcase,
  GraduationCap,
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Settings,
  User
} from 'lucide-react';
import { PortfolioData, Project, Achievement } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { AchievementCard } from '@/components/AchievementCard';
import { SkillVisualizer } from '@/components/SkillVisualizer';
import Link from 'next/link';

interface LandingPageProps {
  portfolioData: PortfolioData;
}

export const LandingPage: React.FC<LandingPageProps> = ({ portfolioData }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [expandedAchievements, setExpandedAchievements] = useState<Set<number>>(new Set());
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const sections = [
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'skills', label: 'Skills', icon: BookOpen },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap }
  ];

  const toggleProjectExpansion = (projectId: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const toggleAchievementExpansion = (achievementIndex: number) => {
    const newExpanded = new Set(expandedAchievements);
    if (newExpanded.has(achievementIndex)) {
      newExpanded.delete(achievementIndex);
    } else {
      newExpanded.add(achievementIndex);
    }
    setExpandedAchievements(newExpanded);
  };

  const displayedProjects = showAllProjects ? portfolioData.projects : (portfolioData.projects || []).slice(0, 3);
  const displayedAchievements = showAllAchievements ? portfolioData.achievements : (portfolioData.achievements || []).slice(0, 4);

  const renderAbout = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="w-32 h-32 bg-gradient-to-br from-gemini-accent to-blue-600 rounded-full mx-auto flex items-center justify-center">
          <span className="text-4xl font-bold text-white">
            {portfolioData.student.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-gemini-text mb-2">
            {portfolioData.student.name}
          </h1>
          <p className="text-xl text-gemini-accent font-semibold mb-4">
            {portfolioData.student.title}
          </p>
          <div className="flex items-center justify-center space-x-6 text-gemini-text-secondary">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4" />
              <span>{portfolioData.student.university}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{portfolioData.student.location}</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          <a
            href={portfolioData.student.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gemini-darker border border-gemini-border rounded-lg hover:bg-gemini-accent/10 transition-colors"
          >
            <Github className="w-5 h-5 text-gemini-text" />
          </a>
          <a
            href={portfolioData.student.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gemini-darker border border-gemini-border rounded-lg hover:bg-gemini-accent/10 transition-colors"
          >
            <Linkedin className="w-5 h-5 text-gemini-text" />
          </a>
          <a
            href={`mailto:${portfolioData.student.email}`}
            className="p-3 bg-gemini-darker border border-gemini-border rounded-lg hover:bg-gemini-accent/10 transition-colors"
          >
            <Mail className="w-5 h-5 text-gemini-text" />
          </a>
        </div>
      </div>

      {/* About Summary */}
      <div className="bg-gemini-darker p-6 rounded-lg border border-gemini-border">
        <h2 className="text-2xl font-semibold text-gemini-text mb-4">About Me</h2>
        <p className="text-gemini-text-secondary leading-relaxed mb-6">
          {portfolioData.about.summary}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gemini-text mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.about.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gemini-accent/20 text-gemini-accent rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gemini-text mb-3">Goals</h3>
            <ul className="space-y-2">
              {portfolioData.about.goals.map((goal, index) => (
                <li key={index} className="flex items-start space-x-2 text-gemini-text-secondary">
                  <Star className="w-4 h-4 text-gemini-accent mt-0.5 flex-shrink-0" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gemini-darker p-4 rounded-lg border border-gemini-border text-center">
          <div className="text-2xl font-bold text-gemini-accent">{portfolioData.projects.length}</div>
          <div className="text-sm text-gemini-text-secondary">Projects</div>
        </div>
        <div className="bg-gemini-darker p-4 rounded-lg border border-gemini-border text-center">
          <div className="text-2xl font-bold text-gemini-accent">{portfolioData.achievements.length}</div>
          <div className="text-sm text-gemini-text-secondary">Achievements</div>
        </div>
        <div className="bg-gemini-darker p-4 rounded-lg border border-gemini-border text-center">
          <div className="text-2xl font-bold text-gemini-accent">{portfolioData.experience.length}</div>
          <div className="text-sm text-gemini-text-secondary">Experiences</div>
        </div>
        <div className="bg-gemini-darker p-4 rounded-lg border border-gemini-border text-center">
          <div className="text-2xl font-bold text-gemini-accent">
            {Object.values(portfolioData.skills).flat().length}
          </div>
          <div className="text-sm text-gemini-text-secondary">Skills</div>
        </div>
      </div>
    </motion.div>
  );

  const renderProjects = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gemini-text">Featured Projects</h2>
        <Link
          href="/chat"
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-accent text-white rounded-lg hover:bg-gemini-accent/80 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat with AI</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {portfolioData.projects.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="flex items-center space-x-2 mx-auto px-4 py-2 bg-gemini-darker border border-gemini-border rounded-lg hover:bg-gemini-accent/10 transition-colors"
          >
            <span className="text-gemini-text">
              {showAllProjects ? 'Show Less' : `Show All ${portfolioData.projects.length} Projects`}
            </span>
            {showAllProjects ? (
              <ChevronUp className="w-4 h-4 text-gemini-text" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gemini-text" />
            )}
          </button>
        </div>
      )}
    </motion.div>
  );

  const renderAchievements = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gemini-text">Achievements & Certificates</h2>
        <Link
          href="/chat"
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-accent text-white rounded-lg hover:bg-gemini-accent/80 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat with AI</span>
        </Link>
      </div>

      <div className="space-y-4">
        {displayedAchievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} index={index} />
        ))}
      </div>

      {portfolioData.achievements.length > 4 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllAchievements(!showAllAchievements)}
            className="flex items-center space-x-2 mx-auto px-4 py-2 bg-gemini-darker border border-gemini-border rounded-lg hover:bg-gemini-accent/10 transition-colors"
          >
            <span className="text-gemini-text">
              {showAllAchievements ? 'Show Less' : `Show All ${portfolioData.achievements.length} Achievements`}
            </span>
            {showAllAchievements ? (
              <ChevronUp className="w-4 h-4 text-gemini-text" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gemini-text" />
            )}
          </button>
        </div>
      )}
    </motion.div>
  );

  const renderSkills = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gemini-text">Technical Skills</h2>
        <Link
          href="/chat"
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-accent text-white rounded-lg hover:bg-gemini-accent/80 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat with AI</span>
        </Link>
      </div>
      
      <SkillVisualizer skills={portfolioData.skills} />
    </motion.div>
  );

  const renderExperience = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gemini-text">Professional Experience</h2>
        <Link
          href="/chat"
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-accent text-white rounded-lg hover:bg-gemini-accent/80 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat with AI</span>
        </Link>
      </div>

      <div className="space-y-6">
        {portfolioData.experience.map((exp, index) => (
          <div key={index} className="bg-gemini-darker p-6 rounded-lg border border-gemini-border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gemini-text">{exp.title}</h3>
                <p className="text-gemini-accent font-medium">{exp.company}</p>
                <p className="text-gemini-text-secondary text-sm">{exp.duration}</p>
              </div>
            </div>
            
            <p className="text-gemini-text-secondary mb-4">{exp.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-gemini-accent/20 text-gemini-accent rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderEducation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gemini-text">Education</h2>
        <Link
          href="/chat"
          className="flex items-center space-x-2 px-4 py-2 bg-gemini-accent text-white rounded-lg hover:bg-gemini-accent/80 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat with AI</span>
        </Link>
      </div>

      <div className="bg-gemini-darker p-6 rounded-lg border border-gemini-border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gemini-text">
              {portfolioData.education.degree}
            </h3>
            <p className="text-gemini-accent font-medium">{portfolioData.education.university}</p>
            <div className="flex items-center space-x-4 text-gemini-text-secondary text-sm mt-2">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Expected: {portfolioData.education.expectedGraduation}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>GPA: {portfolioData.education.gpa}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gemini-text mb-3">Relevant Coursework</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {portfolioData.education.relevantCoursework.map((course, index) => (
              <div key={index} className="flex items-center space-x-2 text-gemini-text-secondary">
                <BookOpen className="w-4 h-4 text-gemini-accent" />
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gemini-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gemini-dark/95 backdrop-blur-sm border-b border-gemini-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gemini-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {portfolioData.student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gemini-text">{portfolioData.student.name}</h1>
                <p className="text-sm text-gemini-text-secondary">Portfolio</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/chat"
                className="flex items-center space-x-2 px-4 py-2 bg-gemini-accent text-white rounded-lg hover:bg-gemini-accent/80 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with AI</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-16 z-40 bg-gemini-darker border-b border-gemini-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-1 py-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-gemini-accent text-white'
                      : 'text-gemini-text-secondary hover:text-gemini-text hover:bg-gemini-dark'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeSection === 'about' && renderAbout()}
          {activeSection === 'projects' && renderProjects()}
          {activeSection === 'achievements' && renderAchievements()}
          {activeSection === 'skills' && renderSkills()}
          {activeSection === 'experience' && renderExperience()}
          {activeSection === 'education' && renderEducation()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gemini-darker border-t border-gemini-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gemini-text-secondary">
                © 2024 {portfolioData.student.name}. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href={portfolioData.student.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gemini-text-secondary hover:text-gemini-text transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={portfolioData.student.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gemini-text-secondary hover:text-gemini-text transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${portfolioData.student.email}`}
                className="text-gemini-text-secondary hover:text-gemini-text transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
