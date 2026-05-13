
import React, { useState, useEffect } from 'react';

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const calculatedProgress = (currentScroll / scrollHeight) * 100;
        setProgress(Math.min(100, Math.max(0, calculatedProgress)));
      } else {
        setProgress(0);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-[3px] bg-blue-600 z-50 transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
};

export default ReadingProgressBar;
