
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';

const TableOfContents = ({ headings }) => {
  const [activeId, setActiveId] = useState('');
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!headings || headings.length === 0) return;
      
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      let currentActiveId = headings[0]?.id || '';
      
      for (const el of headingElements) {
        const rect = el.getBoundingClientRect();
        // 120px offset accounts for fixed header
        if (rect.top <= 120) {
          currentActiveId = el.id;
        }
      }
      
      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for header
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileExpanded(false);
    }
  };

  if (!headings || headings.length === 0) return null;

  const tocContent = (
    <ul className="space-y-2.5 mt-4 lg:mt-0">
      {headings.map((heading) => (
        <li 
          key={heading.id} 
          className={`${heading.level === 'h3' ? 'ml-4' : ''}`}
        >
          <a
            href={`#${heading.id}`}
            onClick={(e) => scrollToHeading(e, heading.id)}
            className={`block text-[13px] md:text-[14px] transition-colors duration-200 ${
              activeId === heading.id 
                ? 'font-semibold text-blue-600' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-gray-50 lg:bg-transparent rounded-lg lg:rounded-none p-4 lg:p-0 border border-gray-200 lg:border-none mb-8 lg:mb-0">
      {/* Mobile Toggle */}
      <button 
        className="w-full flex items-center justify-between lg:hidden text-gray-900 font-semibold"
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
      >
        <div className="flex items-center">
          <List className="w-4 h-4 mr-2 text-blue-600" />
          <span>Table of Contents</span>
        </div>
        {isMobileExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Desktop Title */}
      <div className="hidden lg:flex items-center text-gray-900 font-bold text-[16px] mb-4 uppercase tracking-wider">
        <List className="w-4 h-4 mr-2 text-blue-600" />
        Table of Contents
      </div>

      {/* Content */}
      <div className={`${isMobileExpanded ? 'block' : 'hidden'} lg:block overflow-y-auto max-h-[60vh] lg:max-h-[calc(100vh-150px)] pr-2 custom-scrollbar`}>
        {tocContent}
      </div>
    </div>
  );
};

export default TableOfContents;
