'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { PortfolioData } from '@/types';
import { 
  Code, 
  Globe, 
  Database, 
  Cloud, 
  Brain, 
  Wrench,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

interface SkillVisualizerProps {
  skills: PortfolioData['skills'];
  title?: string;
}

export const SkillVisualizer: React.FC<SkillVisualizerProps> = ({ 
  skills, 
  title = "Technical Skills Visualization" 
}) => {
  const [viewMode, setViewMode] = useState<'pie' | 'bar' | 'radar'>('pie');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Prepare data for different chart types
  const skillCategories = [
    {
      name: 'Programming Languages',
      skills: skills.programmingLanguages,
      icon: <Code className="w-5 h-5" />,
      color: '#3B82F6',
      count: skills.programmingLanguages.length
    },
    {
      name: 'Web Technologies',
      skills: skills.webTechnologies,
      icon: <Globe className="w-5 h-5" />,
      color: '#10B981',
      count: skills.webTechnologies.length
    },
    {
      name: 'Databases',
      skills: skills.databases,
      icon: <Database className="w-5 h-5" />,
      color: '#8B5CF6',
      count: skills.databases.length
    },
    {
      name: 'Cloud Platforms',
      skills: skills.cloudPlatforms,
      icon: <Cloud className="w-5 h-5" />,
      color: '#F59E0B',
      count: skills.cloudPlatforms.length
    },
    {
      name: 'AI/ML',
      skills: skills.aiMl,
      icon: <Brain className="w-5 h-5" />,
      color: '#EC4899',
      count: skills.aiMl.length
    },
    {
      name: 'Tools',
      skills: skills.tools,
      icon: <Wrench className="w-5 h-5" />,
      color: '#6B7280',
      count: skills.tools.length
    }
  ];

  const pieData = skillCategories.map(category => ({
    name: category.name,
    value: category.count,
    color: category.color,
    skills: category.skills
  }));

  const barData = skillCategories.map(category => ({
    category: category.name.split(' ')[0], // Shorten for bar chart
    count: category.count,
    color: category.color
  }));

  const radarData = skillCategories.map(category => ({
    subject: category.name.split(' ')[0],
    A: category.count,
    fullMark: Math.max(...skillCategories.map(c => c.count))
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gemini-darker border border-gemini-border rounded-lg p-3 shadow-lg">
          <p className="text-gemini-text font-medium">{data.name}</p>
          <p className="text-gemini-text-secondary text-sm">
            {data.value} technologies
          </p>
          <div className="mt-2 space-y-1">
            {data.skills?.slice(0, 3).map((skill: string, index: number) => (
              <p key={index} className="text-xs text-gemini-text-secondary">
                • {skill}
              </p>
            ))}
            {data.skills?.length > 3 && (
              <p className="text-xs text-gemini-text-secondary">
                +{data.skills.length - 3} more...
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
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
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gemini-text-secondary mb-6"
        >
          Interactive visualization of my technical expertise
        </motion.p>

        {/* View Mode Selector */}
        <div className="flex justify-center space-x-2">
          {[
            { mode: 'pie', icon: PieChartIcon, label: 'Pie Chart' },
            { mode: 'bar', icon: BarChart3, label: 'Bar Chart' },
            { mode: 'radar', icon: Activity, label: 'Radar Chart' }
          ].map(({ mode, icon: Icon, label }) => (
            <motion.button
              key={mode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(mode as any)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
                ${viewMode === mode
                  ? 'bg-gemini-accent text-white'
                  : 'bg-gemini-hover text-gemini-text-secondary hover:text-gemini-text'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-gemini-darker border border-gemini-border rounded-xl p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="h-96"
          >
            {viewMode === 'pie' && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke={hoveredCategory === entry.name ? '#fff' : 'none'}
                        strokeWidth={hoveredCategory === entry.name ? 2 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}

            {viewMode === 'bar' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fill: '#9CA3AF' }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <YAxis 
                    tick={{ fill: '#9CA3AF' }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#0a0a1a',
                      border: '1px solid #3c4043',
                      borderRadius: '8px',
                      color: '#e8eaed'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    radius={[4, 4, 0, 0]}
                    onMouseEnter={(data) => setHoveredCategory(data.category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}

            {viewMode === 'radar' && (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <PolarRadiusAxis 
                    tick={{ fill: '#9CA3AF' }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#4285f4"
                    fill="#4285f4"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#0a0a1a',
                      border: '1px solid #3c4043',
                      borderRadius: '8px',
                      color: '#e8eaed'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              p-4 rounded-lg border transition-all cursor-pointer
              ${hoveredCategory === category.name.split(' ')[0]
                ? 'border-gemini-accent bg-gemini-accent/10'
                : 'border-gemini-border bg-gemini-darker hover:border-gemini-accent/50'
              }
            `}
            onMouseEnter={() => setHoveredCategory(category.name.split(' ')[0])}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {category.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gemini-text">
                  {category.name}
                </h3>
                <p className="text-xs text-gemini-text-secondary">
                  {category.count} technologies
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {category.skills.slice(0, 4).map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: skillIndex * 0.05 }}
                  className="px-2 py-1 text-xs bg-gemini-hover text-gemini-text-secondary rounded border border-gemini-border"
                >
                  {skill}
                </motion.span>
              ))}
              {category.skills.length > 4 && (
                <span className="px-2 py-1 text-xs text-gemini-text-secondary">
                  +{category.skills.length - 4}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

