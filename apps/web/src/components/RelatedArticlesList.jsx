
import React from 'react';
import pb from '@/lib/pocketbaseClient.js';

const RelatedArticlesList = ({ articles, onArticleClick }) => {
  if (!articles || articles.length === 0) return null;

  const getImageUrl = (article) => {
    if (article.image) return pb.files.getUrl(article, article.image);
    if (article.heroImage) return pb.files.getUrl(article, article.heroImage);
    return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-[800px] mx-auto px-6 md:px-8 lg:px-0 py-8 md:py-10 lg:py-12 border-t border-b border-gray-200">
      <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 mb-6 md:mb-8">
        Related Articles
      </h3>
      <div className="flex flex-col">
        {articles.slice(0, 4).map((article, index) => (
          <div 
            key={article.id} 
            onClick={() => onArticleClick(article.id)}
            className={`flex gap-4 md:gap-6 py-4 md:py-5 hover:bg-gray-50 transition-colors duration-300 cursor-pointer ${
              index !== Math.min(articles.length, 4) - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <img 
              src={getImageUrl(article)} 
              alt={article.title} 
              className="w-[100px] md:w-[120px] h-[80px] md:h-[90px] object-cover rounded-lg flex-shrink-0 shadow-sm" 
            />
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="text-[14px] md:text-[16px] font-semibold text-gray-900 hover:text-blue-600 leading-snug mb-2 transition-colors line-clamp-2">
                {article.title}
              </h4>
              <span className="text-[12px] md:text-[13px] text-gray-600">
                {formatDate(article.publishDate || article.created)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticlesList;
