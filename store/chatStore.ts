import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '@/types';

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatState {
  // Current session
  currentSessionId: string | null;
  sessions: ChatSession[];
  
  // Actions
  createNewSession: () => string;
  setCurrentSession: (sessionId: string) => void;
  addMessage: (message: Message) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;
  deleteSession: (sessionId: string) => void;
  clearAllSessions: () => void;
  getCurrentSession: () => ChatSession | null;
  getSessionMessages: (sessionId: string) => Message[];
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      currentSessionId: null,
      sessions: [],

      createNewSession: () => {
        const newSession: ChatSession = {
          id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: 'New Chat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: newSession.id,
        }));

        return newSession.id;
      },

      setCurrentSession: (sessionId: string) => {
        set({ currentSessionId: sessionId });
      },

      addMessage: (message: Message) => {
        const { currentSessionId, sessions } = get();
        
        if (!currentSessionId) {
          // Create a new session if none exists
          const newSessionId = get().createNewSession();
          set({ currentSessionId: newSessionId });
        }

        const updatedSessions = sessions.map((session) => {
          if (session.id === currentSessionId) {
            const updatedMessages = [...session.messages, message];
            
            // Update title if this is the first user message
            let title = session.title;
            if (message.role === 'user' && session.messages.length === 0) {
              title = message.content.length > 50 
                ? message.content.substring(0, 50) + '...'
                : message.content;
            }

            return {
              ...session,
              messages: updatedMessages,
              title,
              updatedAt: new Date(),
            };
          }
          return session;
        });

        set({ sessions: updatedSessions });
      },

      updateSessionTitle: (sessionId: string, title: string) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? { ...session, title, updatedAt: new Date() }
              : session
          ),
        }));
      },

      deleteSession: (sessionId: string) => {
        set((state) => {
          const updatedSessions = state.sessions.filter(
            (session) => session.id !== sessionId
          );
          
          // If we're deleting the current session, switch to the first available session
          let newCurrentSessionId = state.currentSessionId;
          if (state.currentSessionId === sessionId) {
            newCurrentSessionId = updatedSessions.length > 0 ? updatedSessions[0].id : null;
          }

          return {
            sessions: updatedSessions,
            currentSessionId: newCurrentSessionId,
          };
        });
      },

      clearAllSessions: () => {
        set({ sessions: [], currentSessionId: null });
      },

      getCurrentSession: () => {
        const { currentSessionId, sessions } = get();
        return sessions.find((session) => session.id === currentSessionId) || null;
      },

      getSessionMessages: (sessionId: string) => {
        const { sessions } = get();
        const session = sessions.find((s) => s.id === sessionId);
        return session?.messages || [];
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert string dates back to Date objects after rehydration
          state.sessions = state.sessions.map((session) => ({
            ...session,
            createdAt: new Date(session.createdAt),
            updatedAt: new Date(session.updatedAt),
            messages: session.messages.map((message) => ({
              ...message,
              timestamp: new Date(message.timestamp),
            })),
          }));
        }
      },
    }
  )
);

