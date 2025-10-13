'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

interface VoicePlaybackProps {
  text: string;
  className?: string;
}

export const VoicePlayback: React.FC<VoicePlaybackProps> = ({ 
  text, 
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      if (typeof window !== 'undefined') {
        setSpeechSynthesis(window.speechSynthesis);
      }
    }
  }, []);

  useEffect(() => {
    if (speechSynthesis && text) {
      const newUtterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice settings
      newUtterance.rate = 0.9;
      newUtterance.pitch = 1;
      newUtterance.volume = 0.8;
      
      // Try to use a more natural voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') ||
        voice.lang.startsWith('en')
      );
      
      if (preferredVoice) {
        newUtterance.voice = preferredVoice;
      }

      // Event handlers
      newUtterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };

      newUtterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      newUtterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      setUtterance(newUtterance);
    }
  }, [speechSynthesis, text]);

  const handlePlay = () => {
    if (!speechSynthesis || !utterance) return;

    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
    } else {
      speechSynthesis.speak(utterance);
    }
  };

  const handlePause = () => {
    if (!speechSynthesis) return;
    
    speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    if (!speechSynthesis) return;
    
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center space-x-2 ${className}`}
    >
      {!isPlaying && !isPaused ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlay}
          className="p-2 bg-gemini-accent hover:bg-blue-600 text-white rounded-lg transition-colors"
          title="Play audio"
        >
          <Play className="w-4 h-4" />
        </motion.button>
      ) : (
        <div className="flex items-center space-x-1">
          {isPaused ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlay}
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              title="Resume audio"
            >
              <Play className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePause}
              className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
              title="Pause audio"
            >
              <Pause className="w-4 h-4" />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleStop}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title="Stop audio"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
      )}

      {/* Audio indicator */}
      {isPlaying && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="flex items-center space-x-1"
        >
          <Volume2 className="w-4 h-4 text-gemini-accent" />
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 12, 4] }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  delay: i * 0.1 
                }}
                className="w-1 bg-gemini-accent rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

