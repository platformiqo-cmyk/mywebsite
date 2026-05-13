
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const KnowledgePlatformPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('Tất cả');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tags = [
    'Tất cả',
    'Forex',
    'Hàng hóa',
    'Chỉ số',
    'Tiền điện tử',
    'Phân tích kỹ thuật',
    'Tin tức thị trường',
    'Cổ phiếu',
    'Phân tích cơ bản',
    'CFDs',
    'ETFs',
    'Nền tảng giao dịch',
    'Hướng dẫn',
    'Đầu tư'
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch from 'news' collection where category is 'knowledge'
        const result = await pb.collection('news').getList(1, 50, {
          filter: 'category="knowledge"',
          sort: '-publishDate',
          $autoCancel: false
        });
        setArticles(result.items);
      } catch (err) {
        console.error('Error fetching knowledge articles:', err);
        setError('Không thể tải dữ liệu kiến thức. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const calculateReadingTime = (content) => {
    if (!content) return '1 phút';
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(wordCount / wordsPerMinute))} phút`;
  };

  const filteredArticles = articles.filter(article => {
    const title = article.title || '';
    const excerpt = article.excerpt || '';
    const content = article.content || '';
    
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          excerpt.toLowerCase().includes(searchQuery.toLowerCase());
                          
    // Since 'tags' field doesn't exist in the schema, we filter by checking if the tag keyword is in title/excerpt/content
    const matchesTag = activeTag === 'Tất cả' || 
                       title.toLowerCase().includes(activeTag.toLowerCase()) || 
                       excerpt.toLowerCase().includes(activeTag.toLowerCase()) ||
                       content.toLowerCase().includes(activeTag.toLowerCase());
                       
    return matchesSearch && matchesTag;
  });

  return (
    <>
      <Helmet>
        <title>Nền tảng Kiến thức - XTC Investment Platform</title>
        <meta name="description" content="Cơ sở kiến thức toàn diện về giao dịch, đầu tư, phân tích kỹ thuật và cơ bản từ XTC." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nền tảng Kiến thức
              </h1>
              <p className="text-lg text-gray-600 mb-10">
                Khám phá hàng trăm bài viết, hướng dẫn và phân tích chuyên sâu để nâng cao kỹ năng giao dịch của bạn.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 bg-gray-100 border-transparent rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 text-lg shadow-sm"
                  placeholder="Tìm kiếm kiến thức, thuật ngữ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tags Section */}
        <section className="py-8 bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center max-w-6xl mx-auto">
              {tags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTag === tag
                      ? 'bg-emerald-500 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid Section */}
        <section className="py-16 flex-grow">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500">Đang tải dữ liệu kiến thức...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="inline-block p-4 bg-red-50 rounded-full mb-4">
                  <BookOpen className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy kết quả</h2>
                <p className="text-gray-500">
                  Vui lòng thử lại với từ khóa khác hoặc chọn danh mục khác.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-gray-100"
                  >
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{calculateReadingTime(article.content)}</span>
                      <span className="mx-2">•</span>
                      <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md">Kiến thức</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                      {article.excerpt || (article.content ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : '')}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {new Date(article.publishDate).toLocaleDateString('vi-VN')}
                      </span>
                      <Link to={`/news/${article.id}`} className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group/link text-sm">
                        Đọc tiếp
                        <ArrowRight className="ml-1 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default KnowledgePlatformPage;
