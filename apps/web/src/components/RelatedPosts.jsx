
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Image as ImageIcon } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import DOMPurify from 'dompurify';

const RelatedPosts = ({ currentArticleId, category }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!currentArticleId) return;
      
      try {
        setLoading(true);
        const categoryFilter = category ? `category = "${category}" && ` : '';
        const filterStr = `${categoryFilter}id != "${currentArticleId}"`;
        
        const result = await pb.collection('news').getList(1, 3, {
          filter: filterStr,
          sort: '-created',
          $autoCancel: false
        });
        
        setPosts(result.items);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentArticleId, category]);

  const getImageUrl = (record) => {
    try {
      if (record.heroImage) return pb.files.getUrl(record, record.heroImage, { thumb: '800x600' });
      if (record.image) return pb.files.getUrl(record, record.image, { thumb: '800x600' });
    } catch (e) {
      console.warn('Failed to generate image URL', e);
    }
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  };

  if (loading) return null;
  if (posts.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Bài viết liên quan</h2>
          <Link to="/news" className="flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
            Xem tất cả <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const imageUrl = getImageUrl(post);
            const safeExcerptHTML = DOMPurify.sanitize(post.excerpt || post.content?.replace(/<[^>]*>?/gm, '').substring(0, 120) || '', { 
              ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'span'] 
            });

            return (
              <Link 
                key={post.id} 
                to={`/news/${post.id}`}
                className="group relative flex flex-col h-[380px] rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-105 bg-gray-900"
                  style={{ 
                    backgroundImage: !imageUrl ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' : 'none',
                  }}
                >
                  {imageUrl && (
                    <img 
                      src={imageUrl} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full p-6">
                  {/* Top Badge */}
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 text-xs font-bold bg-emerald-500 text-white rounded uppercase tracking-wider shadow-sm">
                      {post.category ? post.category.replace('-', ' ') : 'TIN TỨC'}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="mt-auto">
                    {/* Date */}
                    <div className="flex items-center text-sm text-emerald-400 mb-3 font-medium">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(post.publishDate || post.created)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <div 
                      className="text-gray-300 text-sm mb-5 line-clamp-2 leading-relaxed"
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
          })}
        </div>

      </div>
    </section>
  );
};

export default RelatedPosts;
