'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, PortfolioData } from '@/types';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { ChatSidebar } from './ChatSidebar';
import { WelcomeMessage } from './WelcomeMessage';
import { ProjectShowcase } from './ProjectShowcase';
import { AchievementTimeline } from './AchievementTimeline';
import { SkillVisualizer } from './SkillVisualizer';
import { SurpriseMe } from './SurpriseMe';
import { geminiService } from '@/lib/gemini';
import { useChatStore } from '@/store/chatStore';
import { Menu } from 'lucide-react';

interface ChatInterfaceProps {
  portfolioData: PortfolioData;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ portfolioData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-open sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    handleResize(); // Set initial state
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  const {
    currentSessionId,
    sessions,
    createNewSession,
    addMessage,
    getCurrentSession,
    getSessionMessages,
  } = useChatStore();

  const currentSession = getCurrentSession();
  const messages = currentSession ? getSessionMessages(currentSession.id) : [];
  const showWelcome = messages.length === 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Create new session if none exists
    if (!currentSessionId) {
      createNewSession();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await geminiService.generateResponse(content, portfolioData);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      addMessage(aiMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your request right now. Please try again later.",
        role: 'assistant',
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  return (
    <div className="chat-container">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-full">
        {/* Sidebar - Always visible on desktop */}
        <div className="w-80 flex-shrink-0">
          <ChatSidebar isOpen={true} onToggle={() => {}} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gemini-dark border-b border-gemini-border px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gemini-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {portfolioData.student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gemini-text">{portfolioData.student.name}</h1>
                <p className="text-sm text-gemini-text-secondary">AI Portfolio Assistant</p>
              </div>
            </div>
            <div className="text-sm text-gemini-text-secondary">
              Google Student Ambassador Candidate
            </div>
          </div>
        </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {showWelcome && (
              <WelcomeMessage
                student={portfolioData.student}
                about={portfolioData.about}
              />
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message: Message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <MessageBubble
                message={{
                  id: 'typing',
                  content: '',
                  role: 'assistant',
                  timestamp: new Date(),
                }}
                isTyping={true}
              />
            )}
          </div>

          {/* Special Content Rendering */}
          {messages.length > 0 && (
            <div className="mt-8">
              {/* Surprise Me Easter Egg */}
              {messages.some((m: Message) => m.content.toLowerCase().includes('surprise')) && (
                <SurpriseMe portfolioData={portfolioData} />
              )}

              {/* Project Showcase */}
              {messages.some((m: Message) => m.content.toLowerCase().includes('project')) && (
                <ProjectShowcase projects={portfolioData.projects} />
              )}

              {/* Achievement Timeline */}
              {messages.some((m: Message) => m.content.toLowerCase().includes('achievement')) && (
                <AchievementTimeline achievements={portfolioData.achievements} />
              )}

              {/* Skill Visualizer */}
              {messages.some((m: Message) => m.content.toLowerCase().includes('skill')) && (
                <SkillVisualizer skills={portfolioData.skills} />
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex h-full">
        {/* Sidebar Overlay */}
        <ChatSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gemini-dark border-b border-gemini-border px-4 py-3">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 bg-gemini-darker border border-gemini-border rounded-lg md:hidden"
                >
                  <Menu className="w-5 h-5 text-gemini-text" />
                </button>
                
                <div className="w-8 h-8 bg-gemini-accent rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {portfolioData.student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gemini-text">{portfolioData.student.name}</h1>
                  <p className="text-sm text-gemini-text-secondary">AI Portfolio Assistant</p>
                </div>
              </div>
              <div className="text-sm text-gemini-text-secondary">
                Google Student Ambassador Candidate
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
              <AnimatePresence>
                {showWelcome && (
                  <WelcomeMessage
                    student={portfolioData.student}
                    about={portfolioData.about}
                  />
                )}
              </AnimatePresence>

              {/* Messages */}
              <div className="space-y-4">
                {messages.map((message: Message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                
                {isLoading && (
                  <MessageBubble
                    message={{
                      id: 'typing',
                      content: '',
                      role: 'assistant',
                      timestamp: new Date(),
                    }}
                    isTyping={true}
                  />
                )}
              </div>

              {/* Special Content Rendering */}
              {messages.length > 0 && (
                <div className="mt-8">
                  {/* Surprise Me Easter Egg */}
                  {messages.some((m: Message) => m.content.toLowerCase().includes('surprise')) && (
                    <SurpriseMe portfolioData={portfolioData} />
                  )}

                  {/* Project Showcase */}
                  {messages.some((m: Message) => m.content.toLowerCase().includes('project')) && (
                    <ProjectShowcase projects={portfolioData.projects} />
                  )}

                  {/* Achievement Timeline */}
                  {messages.some((m: Message) => m.content.toLowerCase().includes('achievement')) && (
                    <AchievementTimeline achievements={portfolioData.achievements} />
                  )}

                  {/* Skill Visualizer */}
                  {messages.some((m: Message) => m.content.toLowerCase().includes('skill')) && (
                    <SkillVisualizer skills={portfolioData.skills} />
                  )}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
