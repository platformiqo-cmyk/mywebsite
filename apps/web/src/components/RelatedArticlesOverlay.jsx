
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, RefreshCw, ArrowRight } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';

const RelatedArticlesOverlay = ({ 
  currentArticleId,
  category,
  articles: externalArticles,
  loading: externalLoading,
  error: externalError,
  onRetry
}) => {
  // Support both external props (from NewsDetailPage) and internal fetching
  const [internalArticles, setInternalArticles] = useState([]);
  const [internalLoading, setInternalLoading] = useState(true);
  const [internalError, setInternalError] = useState(null);

  // Determine if we are using external props or internal state
  const isExternal = externalArticles !== undefined;

  const fetchArticles = async () => {
    if (isExternal) return;
    try {
      setInternalLoading(true);
      setInternalError(null);
      
      // Build filter string dynamically based on category and currentArticleId
      let filterStr = category ? `category="${category}"` : `category!=""`;
      
      if (currentArticleId) {
        filterStr += ` && id!="${currentArticleId}"`;
      }
      
      // DIAGNOSTIC LOGS: Verify data fetching parameters
      console.log('--- RelatedArticlesOverlay Diagnostics ---');
      console.log('1. Category:', category);
      console.log('2. Current Article ID:', currentArticleId);
      console.log('3. Filter Query:', filterStr);
      
      const records = await pb.collection('news').getList(1, 3, {
        filter: filterStr,
        sort: '-created',
        $autoCancel: false
      });
      
      // DIAGNOSTIC LOGS: Verify fetched results
      console.log('4. Fetched Articles Array:', records.items);
      console.log('----------------------------------------');
      
      setInternalArticles(records.items || []);
    } catch (err) {
      console.error('Error fetching related articles:', err);
      setInternalError('Không thể tải bài viết liên quan. Vui lòng thử lại sau.');
    } finally {
      setInternalLoading(false);
    }
  };

  useEffect(() => {
    if (!isExternal) {
      fetchArticles();
    }
  }, [currentArticleId, category, isExternal]);

  // Use external props if provided, otherwise use internal state
  const articles = isExternal ? externalArticles : internalArticles;
  const loading = isExternal ? externalLoading : internalLoading;
  const error = isExternal ? externalError : internalError;
  const handleRetry = isExternal && onRetry ? onRetry : fetchArticles;

  // Ensure articles is always an array to prevent mapping errors
  const displayArticles = Array.isArray(articles) ? articles : [];

  const getImageUrl = (item) => {
    if (item.heroImage) return pb.files.getUrl(item, item.heroImage);
    if (item.thumbnail) return pb.files.getUrl(item, item.thumbnail);
    if (item.image) return pb.files.getUrl(item, item.image);
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Đang cập nhật';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (e) {
      return 'Đang cập nhật';
    }
  };

  const getExcerpt = (item) => {
    if (item.excerpt) return item.excerpt;
    if (item.description) return item.description;
    if (item.content) {
      return item.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...';
    }
    return 'Đang cập nhật nội dung...';
  };

  return (
    <section className="w-full bg-white border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Bài viết liên quan
          </h3>
          <Link 
            to={`/news${category ? `?category=${encodeURIComponent(category)}` : ''}`} 
            className="inline-flex items-center text-[#00b386] text-sm md:text-base font-semibold hover:text-[#009973] transition-colors"
          >
            Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Conditional Rendering based on state */}
        {loading ? (
          /* Loading State */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((n) => (
              <div 
                key={n} 
                className="w-full min-h-[300px] md:min-h-[350px] bg-gray-100 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="w-full flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 mb-4 text-center">{error}</p>
            <button 
              onClick={handleRetry}
              className="inline-flex items-center px-6 py-2.5 bg-[#00b386] text-white font-medium rounded-lg hover:bg-[#009973] transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Thử lại
            </button>
          </div>
        ) : displayArticles.length === 0 ? (
          /* Empty State - Only shows when array is actually empty */
          <div className="w-full flex justify-center items-center py-12 px-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-500 text-center">
            Không có bài viết liên quan nào trong chuyên mục này.
          </div>
        ) : (
          /* Card Grid - Responsive Layout (1 col mobile, 2 cols tablet, 3 cols desktop) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayArticles.map((item) => {
              const imageUrl = getImageUrl(item);
              const title = item.title || 'Bài viết không có tiêu đề';
              const itemCategory = item.category ? item.category.replace('-', ' ') : 'TIN TỨC';
              const dateStr = formatDate(item.publishDate || item.created);
              const excerpt = getExcerpt(item);
              
              return (
                <Link 
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="w-full group relative overflow-hidden rounded-2xl shadow-lg min-h-[300px] md:min-h-[350px] hover:-translate-y-1 transition-all duration-300 flex flex-col bg-gray-900"
                >
                  {/* Background Image */}
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={title} 
                      className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-teal-700 to-blue-900 group-hover:scale-105 transition-transform duration-500" />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-colors duration-300 z-10" />

                  {/* Content Container */}
                  <div className="relative z-20 p-5 md:p-6 flex flex-col h-full justify-between">
                    
                    {/* Top Section: Category Badge */}
                    <div>
                      <span className="inline-block bg-[#00b386] text-white px-3 py-1 rounded-full text-xs font-semibold w-fit uppercase tracking-wider shadow-sm">
                        {itemCategory}
                      </span>
                    </div>

                    {/* Bottom Section: Content */}
                    <div className="flex flex-col mt-auto">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{dateStr}</span>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg md:text-xl font-bold text-white line-clamp-2 mb-2 group-hover:text-[#00b386] transition-colors">
                        {title}
                      </h4>

                      {/* Description */}
                      <p className="text-sm md:text-base text-gray-300 line-clamp-3 mb-4">
                        {excerpt}
                      </p>

                      {/* Read More Link */}
                      <span className="text-[#00b386] text-sm font-semibold inline-flex items-center group-hover:text-[#009973] transition-colors duration-300">
                        Đọc tiếp <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedArticlesOverlay;
