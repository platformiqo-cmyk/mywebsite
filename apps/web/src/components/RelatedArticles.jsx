
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import { Calendar, ArrowRight, RefreshCw } from 'lucide-react';

const SkeletonCard = () => (
  <div className="w-full min-h-[320px] bg-gray-200 animate-pulse rounded-2xl"></div>
);

const RelatedArticles = ({ currentArticleId, currentCategory }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRelatedArticles = async () => {
    if (!currentCategory) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Build filter string safely
      let filterStr = `category = "${currentCategory}"`;
      if (currentArticleId) {
        filterStr += ` && id != "${currentArticleId}"`;
      }

      const records = await pb.collection('news').getList(1, 3, {
        filter: filterStr,
        sort: '-created',
        $autoCancel: false
      });
      
      setArticles(records.items);
    } catch (err) {
      console.error('Error fetching related articles:', err);
      setError('Failed to load related articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedArticles();
  }, [currentArticleId, currentCategory]);

  const getImageUrl = (article) => {
    if (article.heroImage) return pb.files.getUrl(article, article.heroImage);
    if (article.thumbnail) return pb.files.getUrl(article, article.thumbnail);
    if (article.image) return pb.files.getUrl(article, article.image);
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Updating';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (e) {
      return 'Updating';
    }
  };

  const getExcerpt = (article) => {
    if (article.excerpt) return article.excerpt;
    if (article.description) return article.description;
    if (article.content) {
      return article.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...';
    }
    return 'No description available.';
  };

  return (
    <section className="w-full bg-white border-t border-gray-200 mt-12 md:mt-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-0 py-12 md:py-16">
        
        {/* Header Section */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-10 text-center">
          Related Educational Articles
        </h2>

        {/* Conditional Rendering */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 mb-4 text-center">{error}</p>
            <button 
              onClick={fetchRelatedArticles}
              className="inline-flex items-center px-6 py-2.5 bg-[#00b386] text-white font-medium rounded-lg hover:bg-[#009973] transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="w-full flex justify-center items-center py-12 px-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-500 text-center">
            No related articles found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article) => {
              const imageUrl = getImageUrl(article);
              const title = article.title || 'Untitled Article';
              const category = article.category ? article.category.replace('-', ' ') : 'ARTICLE';
              const dateStr = formatDate(article.publishDate || article.created);
              const excerpt = getExcerpt(article);

              return (
                <Link 
                  key={article.id} 
                  to={`/news/${article.id}`}
                  className="w-full group relative overflow-hidden rounded-2xl shadow-lg min-h-[320px] hover:-translate-y-1 transition-all duration-300 flex flex-col bg-gray-900"
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
                  <div className="relative z-20 p-6 flex flex-col h-full justify-between">
                    
                    {/* Top Section: Category Badge */}
                    <div>
                      <span className="inline-block bg-[#00b386] text-white px-3 py-1 rounded-full text-xs font-semibold w-fit uppercase tracking-wider shadow-sm">
                        {category}
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
                      <p className="text-sm md:text-base text-white/85 line-clamp-3 mb-4">
                        {excerpt}
                      </p>

                      {/* Read More Link */}
                      <span className="text-[#00b386] text-sm font-semibold inline-flex items-center group-hover:text-[#009973] transition-colors duration-300">
                        Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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

export default RelatedArticles;
