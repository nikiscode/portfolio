'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code, 
  Globe, 
  Zap, 
  BookOpen, 
  Briefcase,
  Database,
  Cloud,
  Cpu,
  Layers,
  Terminal,
  GitBranch,
  Settings,
  Star,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';

interface InteractiveSkillRadarProps {
  skills?: any;
}

export const InteractiveSkillRadar: React.FC<InteractiveSkillRadarProps> = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  if (!skills) {
    return (
      <div className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Loading skills radar...</p>
        </div>
      </div>
    );
  }

  const skillCategories = [
    {
      name: 'Programming Languages',
      skills: skills.programmingLanguages || [],
      icon: Code,
      color: '#3B82F6',
      level: 45
    },
    {
      name: 'Web Technologies',
      skills: skills.webTechnologies || [],
      icon: Globe,
      color: '#10B981',
      level: 40
    },
    {
      name: 'AI/ML Tools',
      skills: skills.aiMl || [],
      icon: Zap,
      color: '#8B5CF6',
      level: 35
    },
    {
      name: 'Databases',
      skills: skills.databases || [],
      icon: Database,
      color: '#F59E0B',
      level: 30
    },
    {
      name: 'Cloud Platforms',
      skills: skills.cloudPlatforms || [],
      icon: Cloud,
      color: '#06B6D4',
      level: 25
    },
    {
      name: 'Development Tools',
      skills: skills.tools || [],
      icon: Settings,
      color: '#EF4444',
      level: 40
    }
  ];

  const topSkills = [
    { name: 'Python', level: 45, category: 'Programming Languages', icon: Code },
    { name: 'Machine Learning', level: 40, category: 'AI/ML Tools', icon: Zap },
    { name: 'React', level: 35, category: 'Web Technologies', icon: Globe },
    { name: 'FastAPI', level: 38, category: 'Web Technologies', icon: Terminal },
    { name: 'PyTorch', level: 42, category: 'AI/ML Tools', icon: Cpu },
    { name: 'MySQL', level: 30, category: 'Databases', icon: Database }
  ];

  useEffect(() => {
    if (!isInView || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 50;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw radar chart
    const angleStep = (2 * Math.PI) / skillCategories.length;

    // Draw concentric circles
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + i * 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw axes
    skillCategories.forEach((category, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw category labels
      const labelX = centerX + Math.cos(angle) * (radius + 30);
      const labelY = centerY + Math.sin(angle) * (radius + 30);
      
      ctx.fillStyle = 'white';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(category.name, labelX, labelY);
    });

    // Draw skill levels
    ctx.beginPath();
    skillCategories.forEach((category, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const levelRadius = (radius * category.level) / 100;
      const x = centerX + Math.cos(angle) * levelRadius;
      const y = centerY + Math.sin(angle) * levelRadius;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw skill points
    skillCategories.forEach((category, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const levelRadius = (radius * category.level) / 100;
      const x = centerX + Math.cos(angle) * levelRadius;
      const y = centerY + Math.sin(angle) * levelRadius;

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = category.color;
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

  }, [isInView, skillCategories]);

  return (
    <div className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Interactive Skills Radar
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Explore my technical expertise across different domains with interactive visualizations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="w-full h-auto max-w-lg mx-auto"
              />
              
              {/* Skill Level Indicator */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h4 className="text-white font-semibold mb-2">Skill Levels</h4>
                <div className="space-y-1">
                  {[100, 80, 60, 40, 20].map((level, index) => (
                    <div key={level} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `rgba(59, 130, 246, ${0.2 + index * 0.15})` }}
                      />
                      <span className="text-white text-sm">{level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Category Skills */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">Skills by Category</h3>
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onMouseEnter={() => setHoveredSkill(category.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 cursor-pointer ${
                      hoveredSkill === category.name 
                        ? 'border-blue-400 bg-blue-500/20' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <category.icon className="w-5 h-5" style={{ color: category.color }} />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{category.name}</h4>
                          <p className="text-gray-300 text-sm">{category.skills.length} technologies</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{category.level}%</div>
                        <div className="text-gray-400 text-sm">Proficiency</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.level}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>

                    {/* Skills List */}
                    <div className="flex flex-wrap gap-2">
                      {(category.skills || []).slice(0, 4).map((skill: string, skillIndex: number) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: `${category.color}30` }}
                        >
                          {skill}
                        </span>
                      ))}
                      {category.skills.length > 4 && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-600 text-white">
                          +{category.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Top Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span>Top Skills</span>
                </h3>
                <div className="space-y-3">
                  {topSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <skill.icon className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-sm">({skill.category})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: 1 + index * 0.1, duration: 1 }}
                            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          />
                        </div>
                        <span className="text-white text-sm font-medium w-8">{skill.level}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)}
              </div>
              <div className="text-indigo-200">Total Technologies</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round(skillCategories.reduce((sum, cat) => sum + cat.level, 0) / skillCategories.length)}%
              </div>
              <div className="text-indigo-200">Average Proficiency</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {skillCategories.length}
              </div>
              <div className="text-indigo-200">Skill Categories</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
