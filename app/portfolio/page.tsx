'use client';

import React, { useState, useEffect } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { PortfolioData } from '@/types';

export default function PortfolioPage() {
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

  return <LandingPage portfolioData={portfolioData} />;
}
