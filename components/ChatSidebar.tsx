'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/store/chatStore';
import { 
  MessageSquare, 
  Plus, 
  Trash2, 
  MoreVertical, 
  X, 
  Menu,
  Clock,
  ChevronRight
} from 'lucide-react';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onToggle }) => {
  const {
    sessions,
    currentSessionId,
    createNewSession,
    setCurrentSession,
    deleteSession,
    clearAllSessions,
  } = useChatStore();

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleNewChat = () => {
    createNewSession();
    if (typeof window !== 'undefined' ? window.innerWidth : 1024 < 768) {
      onToggle(); // Close sidebar on mobile after creating new chat
    }
  };

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSession(sessionId);
    if (typeof window !== 'undefined' ? window.innerWidth : 1024 < 768) {
      onToggle(); // Close sidebar on mobile after selecting session
    }
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSession(sessionId);
  };

  const handleClearAll = () => {
    clearAllSessions();
    setShowClearConfirm(false);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: 'tween', duration: 0.3 }}
        className={`
          fixed left-0 top-0 h-full w-80 bg-gemini-darker border-r border-gemini-border z-50
          md:relative md:translate-x-0 md:z-auto md:w-full md:h-full
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gemini-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gemini-accent rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gemini-text">Chat History</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleNewChat}
              className="p-2 hover:bg-gemini-hover rounded-lg transition-colors"
              title="New Chat"
            >
              <Plus className="w-4 h-4 text-gemini-text" />
            </button>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gemini-hover rounded-lg transition-colors md:hidden"
            >
              <X className="w-4 h-4 text-gemini-text" />
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-2">
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gemini-text-secondary mx-auto mb-4" />
              <p className="text-gemini-text-secondary mb-4">No chat history yet</p>
              <button
                onClick={handleNewChat}
                className="btn-primary text-sm"
              >
                Start New Chat
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`
                    group relative p-3 rounded-lg cursor-pointer transition-all
                    ${session.id === currentSessionId
                      ? 'bg-gemini-accent/20 border border-gemini-accent'
                      : 'hover:bg-gemini-hover'
                    }
                  `}
                  onClick={() => handleSessionSelect(session.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gemini-text truncate">
                        {session.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-gemini-text-secondary" />
                        <span className="text-xs text-gemini-text-secondary">
                          {formatDate(session.updatedAt)}
                        </span>
                        <span className="text-xs text-gemini-text-secondary">
                          • {session.messages.length} messages
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleDeleteSession(session.id, e)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                        title="Delete chat"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                      {session.id === currentSessionId && (
                        <ChevronRight className="w-4 h-4 text-gemini-accent" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {sessions.length > 0 && (
          <div className="p-4 border-t border-gemini-border">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Chats</span>
            </button>
          </div>
        )}

        {/* Clear confirmation modal */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gemini-darker border border-gemini-border rounded-lg p-6 max-w-sm w-full"
              >
                <h3 className="text-lg font-semibold text-gemini-text mb-2">
                  Clear All Chats?
                </h3>
                <p className="text-gemini-text-secondary mb-6">
                  This will permanently delete all your chat history. This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </>
  );
};
