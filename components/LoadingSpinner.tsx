'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gemini-dark">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-gemini-border border-t-gemini-accent rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-gemini-text mb-2">
          Loading AI Portfolio
        </h2>
        <p className="text-gemini-text-secondary">
          Preparing your interactive experience...
        </p>
      </motion.div>
    </div>
  );
};
