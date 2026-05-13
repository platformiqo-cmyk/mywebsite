import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Tag } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import RelatedArticles from '@/components/RelatedArticles.jsx';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const record = await pb.collection('news').getOne(id, {
          $autoCancel: false
        });
        setPost(record);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadingTime = (content) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32">
          <div className="container mx-auto px-4 text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-300">Đang tải bài viết...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32">
          <div className="container mx-auto px-4 text-center py-20">
            <p className="text-red-400 text-lg mb-6">
              {error || 'Không tìm thấy bài viết'}
            </p>
            <Link to="/blog">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <>
      <Helmet>
        <title>{`${post.title} - Blog XTC`}</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-sans">
        <Header />

        {/* Article Content */}
        <article className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link to="/blog" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 group font-medium">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Quay lại Blog
              </Link>

              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10 shadow-2xl">
                  <img
                    src={pb.files.getUrl(post, post.featuredImage)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>
              )}

              {/* Article Header */}
              <div className="mb-10">
                {/* Category Badge */}
                {post.category && (
                  <div className="inline-block px-4 py-1.5 bg-emerald-500/20 rounded-full mb-6 border border-emerald-500/30 backdrop-blur-sm">
                    <span className="text-emerald-400 font-semibold text-sm flex items-center uppercase tracking-wider">
                      <Tag className="w-3.5 h-3.5 mr-2" />
                      {post.category === 'market-analysis' ? 'Phân tích' : post.category === 'knowledge' ? 'Kiến thức' : post.category}
                    </span>
                  </div>
                )}

                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-xl text-gray-300 leading-relaxed mb-8 font-medium border-l-4 border-emerald-500 pl-6 py-2">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-gray-400 border-t border-b border-gray-700/50 py-5 text-sm font-medium">
                  {post.author && (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-emerald-500" />
                      <span className="text-gray-300">{post.author}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span>{formatDate(post.publishDate || post.created)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>{readingTime} phút đọc</span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg md:prose-xl prose-invert max-w-none prose-emerald prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-p:leading-loose prose-a:text-emerald-400 hover:prose-a:text-emerald-300">
                <div className="text-gray-300 leading-loose whitespace-pre-wrap font-sans">
                  {post.content}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-16 pt-8 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-400 font-medium">Chia sẻ bài viết này:</p>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800 hover:text-emerald-400 hover:border-emerald-500 transition-colors rounded-full px-6"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Đã sao chép link bài viết!');
                    }}
                  >
                    Sao chép link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts Component */}
        <div className="bg-white">
          <RelatedArticles 
            currentId={post.id} 
            category={post.category} 
            basePath="/blog" 
            title="Bài viết cùng chuyên mục"
          />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BlogDetailPage;