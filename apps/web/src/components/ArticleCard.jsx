
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import DOMPurify from 'dompurify';

const ArticleCard = ({ article, basePath = '/market-analysis' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Determine image URL
  let imageUrl = null;
  try {
    if (article.heroImage) {
      imageUrl = pb.files.getUrl(article, article.heroImage, { thumb: '800x600' });
    } else if (article.image) {
      imageUrl = pb.files.getUrl(article, article.image, { thumb: '800x600' });
    }
  } catch (e) {
    console.warn('Failed to generate image URL', e);
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Sanitize HTML content for excerpt
  const rawExcerpt = article.excerpt || article.content || '';
  const safeExcerptHTML = DOMPurify.sanitize(rawExcerpt, { 
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'span'] 
  });

  const fallbackGradient = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';

  return (
    <Link 
      to={`${basePath}/${article.id}`}
      className="group relative flex flex-col h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-emerald-500/10 border border-slate-800 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-105 bg-slate-900"
        style={{ 
          backgroundImage: (!imageUrl || imageError) ? fallbackGradient : 'none',
        }}
      >
        {imageUrl && !imageError && (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-slate-600" />
              </div>
            )}
            <img 
              src={imageUrl} 
              alt={article.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        )}
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Top Badge */}
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 text-xs font-bold bg-emerald-500 text-white rounded uppercase tracking-wider shadow-sm">
            PHÂN TÍCH
          </span>
        </div>

        {/* Bottom Content */}
        <div className="mt-auto">
          {/* Date */}
          <div className="flex items-center text-sm text-emerald-400 mb-3 font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(article.publishDate || article.created)}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
            {article.title}
          </h3>
          
          {/* Excerpt */}
          <div 
            className="text-slate-300 text-sm mb-5 line-clamp-2 leading-relaxed prose-sm prose-invert max-w-none [&>p]:inline [&>p]:m-0"
            dangerouslySetInnerHTML={{ __html: safeExcerptHTML }}
          />

          {/* Read More Link */}
          <div className="inline-flex items-center text-emerald-500 font-semibold text-sm group-hover:text-emerald-400 transition-colors">
            Đọc tiếp
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
