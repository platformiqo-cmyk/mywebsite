
import React from 'react';
import pb from '@/lib/pocketbaseClient.js';

const RelatedArticlesCards = ({ articles, onArticleClick }) => {
  if (!articles || articles.length === 0) return null;

  const getImageUrl = (article) => {
    if (article.heroImage) return pb.files.getUrl(article, article.heroImage);
    if (article.image) return pb.files.getUrl(article, article.image);
    return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800';
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-0 py-12 md:py-16 lg:py-20">
      <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 mb-8 md:mb-10 text-center">
        More to Explore
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {articles.slice(0, 3).map((article) => (
          <div 
            key={article.id}
            onClick={() => onArticleClick(article.id)}
            className="relative overflow-hidden rounded-lg h-[300px] md:h-[350px] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <img 
              src={getImageUrl(article)} 
              alt={article.title} 
              className="object-cover w-full h-full absolute inset-0 group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 lg:p-6 z-20 flex flex-col justify-end">
              <span className="text-[11px] uppercase text-blue-300 font-semibold mb-2 tracking-wider">
                {article.category ? article.category.replace('-', ' ') : 'ARTICLE'}
              </span>
              <h4 className="text-[16px] md:text-[18px] font-bold text-white leading-snug group-hover:text-blue-300 transition-colors line-clamp-3">
                {article.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticlesCards;
