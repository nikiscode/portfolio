'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '@/types';
import { User, Bot } from 'lucide-react';
import { VoicePlayback } from './VoicePlayback';

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isTyping = false }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start space-x-3 max-w-4xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-gemini-accent' : 'bg-gemini-hover border border-gemini-border'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-gemini-text" />
          )}
        </div>

        {/* Message Content */}
        <div className={`message-bubble ${isUser ? 'user-message' : 'ai-message'}`}>
          {isTyping ? (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
              <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
              
              {/* Voice playback for AI messages */}
              {!isUser && !isTyping && (
                <div className="mt-3 flex justify-end">
                  <VoicePlayback text={message.content} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Format message content with basic markdown support
function formatMessage(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gemini-hover px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\n/g, '<br>');
}
