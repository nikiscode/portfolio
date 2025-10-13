'use client';

import React, { useState, useEffect } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { PortfolioData } from '@/types';
import Link from 'next/link';
import { Sparkles, Play, Award } from 'lucide-react';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data);
      } else {
        setError('Failed to load portfolio data');
      }
    } catch (err) {
      setError('Error loading portfolio data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gemini-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gemini-accent mx-auto mb-4"></div>
          <p className="text-gemini-text-secondary">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-gemini-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Failed to load portfolio data'}</p>
          <button
            onClick={fetchPortfolioData}
            className="px-4 py-2 bg-gemini-accent text-white rounded-lg hover:bg-gemini-accent/80"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Creative Showcase Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6" />
            <div>
              <h3 className="text-lg font-bold">🌟 Creative Google Ambassador Showcase</h3>
              <p className="text-sm opacity-90">Immersive presentation designed to impress the core team</p>
            </div>
          </div>
          <div className="flex ">
            <Link
              href="/showcase"
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              <span className="font-medium">Launch Showcase</span>
            </Link>
           
          </div>
        </div>
      </div>
      
      <LandingPage portfolioData={portfolioData} />
    </div>
  );
}
