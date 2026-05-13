
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const records = await pb.collection('news').getList(1, 20, {
          sort: '-publishDate',
          $autoCancel: false
        });
        setNews(records.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredNews = news.filter(item => item.featured);
  const regularNews = news.filter(item => !item.featured);

  return (
    <>
      <Helmet>
        <title>Tin tức thị trường - XTC Investment Platform</title>
        <meta name="description" content="Cập nhật tin tức tài chính, phân tích thị trường chứng khoán và báo cáo đầu tư mới nhất từ XTC." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-6 py-3 bg-emerald-100 rounded-full mb-6">
                <span className="text-emerald-700 font-semibold">Tin tức & Phân tích</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Cập nhật{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  thị trường
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Tin tức tài chính, phân tích chuyên sâu và báo cáo thị trường mới nhất
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Đang tải tin tức...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 text-lg">Lỗi: {error}</p>
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">Chưa có tin tức nào</p>
              </div>
            ) : (
              <>
                {/* Featured News */}
                {featuredNews.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center space-x-2 mb-8">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                      <h2 className="text-3xl font-bold text-gray-900">Tin nổi bật</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {featuredNews.map((article) => (
                        <Link
                          key={article.id}
                          to={`/news/${article.id}`}
                          className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                        >
                          <div className="p-8">
                            <div className="inline-block px-4 py-2 bg-emerald-100 rounded-full mb-4">
                              <span className="text-emerald-700 font-semibold text-sm">Nổi bật</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            {article.excerpt && (
                              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                {article.excerpt}
                              </p>
                            )}
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-4">
                                {article.author && (
                                  <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>{article.author}</span>
                                  </div>
                                )}
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(article.publishDate)}</span>
                                </div>
                              </div>
                              <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-2 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular News */}
                {regularNews.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Tin tức mới nhất</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {regularNews.map((article) => (
                        <Link
                          key={article.id}
                          to={`/news/${article.id}`}
                          className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                        >
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            {article.excerpt && (
                              <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                                {article.excerpt}
                              </p>
                            )}
                            <div className="flex flex-col space-y-2 text-xs text-gray-500">
                              {article.author && (
                                <div className="flex items-center space-x-2">
                                  <User className="w-3 h-3" />
                                  <span>{article.author}</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(article.publishDate)}</span>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center text-emerald-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                              Xem chi tiết
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default NewsPage;
