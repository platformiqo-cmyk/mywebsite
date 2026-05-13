
import React from 'react';
import pb from '@/lib/pocketbaseClient.js';

const HeroArticle = ({ article }) => {
  const getImageUrl = () => {
    if (article?.heroImage) return pb.files.getUrl(article, article.heroImage);
    if (article?.image) return pb.files.getUrl(article, article.image);
    return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1920';
  };

  return (
    <div className="relative w-full h-[350px] flex items-center justify-center overflow-hidden mt-16 md:mt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${getImageUrl()})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content - Centered Title */}
      <div className="relative z-20 w-full max-w-[1000px] mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
          {article?.title || 'Đang tải tiêu đề bài viết...'}
        </h1>
      </div>
    </div>
  );
};

export default HeroArticle;
