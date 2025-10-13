'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, 
  Star, 
  Users, 
  Award,
  TrendingUp,
  Heart,
  Target,
  Zap,
  Globe,
  BookOpen,
  Code,
  GraduationCap,
  Briefcase,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface TestimonialSectionProps {
  portfolioData?: any;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ portfolioData }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Mock testimonials based on portfolio data
  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Professor of AI/ML",
      organization: "Amity University",
      avatar: "👩‍🏫",
      content: "Nikitha's AI-powered PDF chatbot project demonstrates exceptional understanding of modern AI technologies. Her ability to integrate Llama 3.1 with local deployment shows advanced technical skills and practical problem-solving abilities.",
      rating: 5,
      project: "AI-Powered PDF Chatbot"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      role: "Head of Computer Science",
      organization: "Amity University",
      avatar: "👨‍💼",
      content: "The eConsult-Sentiment platform Nikitha developed showcases remarkable innovation in government tech solutions. Her use of RoBERTa and BART models for sentiment analysis demonstrates deep understanding of NLP and real-world applications.",
      rating: 5,
      project: "eConsult-Sentiment AI Platform"
    },
    {
      id: 3,
      name: "Student Council President",
      role: "Student Representative",
      organization: "Amity University",
      avatar: "👨‍🎓",
      content: "Nikitha's Student Voting System revolutionized our election process. The modern, secure platform increased voter participation by 40% and made elections more transparent and accessible to all students.",
      rating: 5,
      project: "Student Voting System"
    },
    {
      id: 4,
      name: "Tech Community Leader",
      role: "GDG Organizer",
      organization: "Google Developer Groups",
      avatar: "👩‍💻",
      content: "Nikitha's GDG certification and subsequent projects show incredible dedication to learning and applying Google technologies. She's a perfect candidate for Google Ambassador with her passion for community building.",
      rating: 5,
      project: "Google Developer Groups Certification"
    }
  ];

  const impactMetrics = [
    {
      metric: "Student Engagement",
      value: "500+",
      description: "Students benefited from voting system",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      trend: "+40%"
    },
    {
      metric: "AI Models Deployed",
      value: "5+",
      description: "Different LLM models integrated",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      trend: "+3 this year"
    },
    {
      metric: "Open Source Impact",
      value: "12+",
      description: "Repositories with community contributions",
      icon: Code,
      color: "from-green-500 to-teal-500",
      trend: "+5 this year"
    },
    {
      metric: "Certifications Earned",
      value: "3+",
      description: "Professional credentials achieved",
      icon: Award,
      color: "from-yellow-500 to-orange-500",
      trend: "+2 this year"
    }
  ];

  const communityImpact = [
    {
      title: "University Elections Modernization",
      description: "Transformed traditional paper-based voting to digital platform",
      impact: "40% increase in voter participation",
      beneficiaries: "500+ students",
      icon: Users,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "AI Education Democratization",
      description: "Made advanced AI technologies accessible to fellow students",
      impact: "Multiple AI projects shared with community",
      beneficiaries: "100+ developers",
      icon: BookOpen,
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Government Tech Innovation",
      description: "Developed AI solutions for public consultation analysis",
      impact: "Advanced sentiment analysis for policy making",
      beneficiaries: "Government agencies",
      icon: Globe,
      color: "from-green-500 to-green-700"
    },
    {
      title: "Open Source Contributions",
      description: "Maintained active GitHub presence with educational projects",
      impact: "Knowledge sharing and collaboration",
      beneficiaries: "Global developer community",
      icon: Code,
      color: "from-orange-500 to-orange-700"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Community Impact & Testimonials
          </h2>
          <p className="text-xl text-teal-200 max-w-3xl mx-auto">
            Hear from the community about the impact of my work and contributions
          </p>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Testimonial Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Quote className="w-8 h-8 text-teal-400" />
                      <div className="flex space-x-1">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <blockquote className="text-xl text-white leading-relaxed">
                      "{testimonials[currentTestimonial].content}"
                    </blockquote>

                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{testimonials[currentTestimonial].avatar}</div>
                      <div>
                        <div className="text-lg font-semibold text-white">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-teal-200">
                          {testimonials[currentTestimonial].role}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {testimonials[currentTestimonial].organization}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Highlight */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-2xl p-6 border border-teal-500/30">
                      <h4 className="text-lg font-semibold text-white mb-3">Featured Project</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Code className="w-5 h-5 text-teal-400" />
                          <span className="text-teal-200 font-medium">
                            {testimonials[currentTestimonial].project}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300">
                          Recognized for innovation and impact
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index 
                      ? 'bg-teal-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Impact Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <metric.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-teal-200 font-medium mb-2">{metric.metric}</div>
                <div className="text-gray-300 text-sm mb-3">{metric.description}</div>
                <div className="flex items-center justify-center space-x-1 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{metric.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Impact Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Community Impact Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityImpact.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${impact.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <impact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">{impact.title}</h4>
                    <p className="text-gray-300 mb-4">{impact.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium">{impact.impact}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm">{impact.beneficiaries}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-teal-600/20 to-blue-600/20 rounded-3xl p-8 border border-teal-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Make an Impact?
            </h3>
            <p className="text-teal-200 mb-6 max-w-2xl mx-auto">
              Join me in building innovative AI solutions and empowering the next generation of developers
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                <Heart className="w-5 h-5 inline mr-2" />
                Connect with Me
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 border border-white/30"
              >
                <ExternalLink className="w-5 h-5 inline mr-2" />
                View Projects
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
