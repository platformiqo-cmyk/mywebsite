
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';

const RelatedArticlesSection = ({ currentId }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const result = await pb.collection('news').getList(1, 4, {
          filter: currentId ? `id != "${currentId}"` : '',
          sort: '-created',
          $autoCancel: false
        });
        setArticles(result.items || []);
      } catch (err) {
        console.error('Error fetching related articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentId]);

  if (loading || articles.length === 0) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  };

  return (
    <div className="mt-16 pt-12 border-t border-gray-800">
      <h3 className="text-2xl font-bold text-white mb-8">Bài viết liên quan</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((article) => {
          let imgUrl = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop';
          
          // Prioritize heroImage over image, fallback to default
          try {
            if (article.heroImage) {
              imgUrl = pb.files.getUrl(article, article.heroImage, { thumb: '800x600' });
            } else if (article.image) {
              imgUrl = pb.files.getUrl(article, article.image, { thumb: '800x600' });
            }
          } catch (e) {
            console.warn('Failed to generate image URL', e);
          }

          return (
            <Link 
              key={article.id} 
              to={`/market-analysis/${article.id}`}
              className="group bg-[#111827] rounded-xl overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/20 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={imgUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent opacity-60"></div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-gray-400 mb-3">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                  {formatDate(article.publishDate || article.created)}
                </div>
                <h4 className="text-lg font-bold text-gray-100 group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedArticlesSection;
