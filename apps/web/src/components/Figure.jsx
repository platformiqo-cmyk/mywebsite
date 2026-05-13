
import React from 'react';

const Figure = ({ src, alt, caption, className = '' }) => {
  return (
    <figure className={`my-8 flex flex-col items-center ${className}`}>
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg group">
        <img 
          src={src} 
          alt={alt || caption || 'Article image'} 
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    </figure>
  );
};

export default Figure;
