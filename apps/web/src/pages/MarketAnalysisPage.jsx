
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Search, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';

const MarketAnalysisPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await pb.collection('news').getList(1, 50, {
        filter: 'category="market-analysis"',
        sort: '-publishDate',
        $autoCancel: false
      });
      setArticles(result.items);
    } catch (err) {
      console.error('Error fetching market analysis:', err);
      setError('Không thể tải dữ liệu phân tích thị trường. Vui lòng kiểm tra kết nối và thử lại.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Filter articles based on search query
  const filteredArticles = articles.filter(article => 
    article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group articles by date
  const groupArticlesByDate = (items) => {
    const groups = {
      'Hôm nay': [],
      'Hôm qua': [],
      'Tuần này': [],
      'Cũ hơn': []
    };

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    items.forEach(article => {
      const pubDate = new Date(article.publishDate || article.created);
      pubDate.setHours(0, 0, 0, 0);
      
      const diffTime = now.getTime() - pubDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        groups['Hôm nay'].push(article);
      } else if (diffDays === 1) {
        groups['Hôm qua'].push(article);
      } else if (diffDays > 1 && diffDays <= 7) {
        groups['Tuần này'].push(article);
      } else {
        groups['Cũ hơn'].push(article);
      }
    });

    // Merge 'Hôm nay' into 'Hôm qua' if requested to just show 'Hôm qua' and 'Tuần này' as primary sections,
    // but keeping them separate is usually better. Let's stick to the requested sections if they have data.
    return groups;
  };

  const groupedArticles = groupArticlesByDate(filteredArticles);

  // Loading Skeleton Component
  const SkeletonCard = () => (
    <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 h-[400px] animate-pulse flex flex-col relative">
      <div className="absolute inset-0 bg-slate-800/80"></div>
      <div className="relative z-10 p-6 flex flex-col h-full justify-end">
        <div className="h-4 bg-slate-700 rounded w-24 mb-4"></div>
        <div className="h-8 bg-slate-700 rounded w-full mb-3"></div>
        <div className="h-8 bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6 mb-6"></div>
        <div className="h-4 bg-slate-700 rounded w-24"></div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Phân tích thị trường - XTC Investment</title>
        <meta name="description" content="Cập nhật các bài phân tích thị trường tài chính, chứng khoán, hàng hóa mới nhất từ các chuyên gia XTC." />
      </Helmet>

      <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans selection:bg-emerald-500/30">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden border-b border-slate-800/50">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0f172a] to-[#0B1120] z-0"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-block mb-6">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase">
                  MARKET INSIGHTS
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Phân tích Thị trường
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10">
                Nhận định chuyên sâu, dự báo xu hướng và phân tích kỹ thuật từ đội ngũ chuyên gia hàng đầu.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm bài phân tích, mã cổ phiếu, hàng hoá..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:bg-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300 text-base shadow-lg backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between text-red-400 mb-12">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                  <button 
                    onClick={fetchArticles}
                    className="flex items-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Thử lại
                  </button>
                </div>
              )}

              {loading ? (
                <div className="space-y-16">
                  <div>
                    <div className="h-8 bg-slate-800 rounded w-48 mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                    </div>
                  </div>
                </div>
              ) : filteredArticles.length === 0 && !error ? (
                <div className="text-center py-24 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <TrendingUp className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy kết quả</h3>
                  <p className="text-slate-400">Thử điều chỉnh từ khóa tìm kiếm của bạn.</p>
                </div>
              ) : (
                <div className="space-y-16">
                  {Object.entries(groupedArticles).map(([groupName, items]) => {
                    if (items.length === 0) return null;
                    
                    return (
                      <div key={groupName} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Section Header with Green Accent */}
                        <div className="mb-8">
                          <h2 className="text-2xl md:text-3xl font-bold text-white border-l-4 border-emerald-500 pl-4 py-1">
                            {groupName}
                          </h2>
                        </div>
                        
                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {items.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MarketAnalysisPage;
