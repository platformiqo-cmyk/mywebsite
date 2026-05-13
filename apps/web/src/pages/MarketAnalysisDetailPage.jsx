
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleContent from '@/components/ArticleContent.jsx';
import ShareBar from '@/components/ShareBar.jsx';
import RelatedArticles from '@/components/RelatedArticles.jsx';

const MarketAnalysisDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        const record = await pb.collection('news').getOne(id, {
          $autoCancel: false
        });
        
        setArticle(record);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Không tìm thấy bài viết hoặc đã xảy ra lỗi.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center pt-20">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Đang tải bài viết...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center pt-20">
          <div className="text-center max-w-md mx-auto px-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rất tiếc!</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button onClick={() => navigate('/market-analysis')} className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách phân tích
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const pageTitle = `${article.title} - XTC Investment Platform`;
  const pageDescription = article.excerpt || article.content?.replace(/<[^>]*>?/gm, '').substring(0, 160) || 'Đọc bài viết phân tích thị trường mới nhất trên XTC.';
  
  const getHeroImageUrl = () => {
    if (article.heroImage) return pb.files.getUrl(article, article.heroImage);
    if (article.image) return pb.files.getUrl(article, article.image);
    return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1920';
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={getHeroImageUrl()} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />

        <main className="flex-grow pt-16 md:pt-20">
          {/* 1. HERO SECTION */}
          <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-900">
            <div 
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${getHeroImageUrl()})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            />
            {/* Gradient overlay: dark at bottom, transparent at top */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute top-[65%] lg:top-[70%] left-1/2 -translate-x-1/2 z-20 w-full max-w-[900px] px-6 md:px-10 lg:px-14">
              <h1 className="text-[20px] md:text-[28px] lg:text-[36px] font-bold text-white leading-tight drop-shadow-lg text-center">
                {article.title}
              </h1>
            </div>
          </section>

          {/* 2. ARTICLE CONTENT SECTION */}
          <div className="bg-white w-full">
            <div className="max-w-[900px] mx-auto px-6 md:px-10 lg:px-14 py-12">
              
              <ArticleContent article={article} />
              
              {/* 3. METADATA BAR */}
              <ShareBar category={article.category || 'MARKET ANALYSIS'} />

              {/* 4. WARNING BOX */}
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-lg p-6 mt-8">
                <h4 className="text-gray-900 font-bold mb-2">Cảnh báo rủi ro:</h4>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ lineHeight: '1.5' }}>
                  Nội dung tài liệu này chỉ được cung cấp mang tính thông tin chung và không được xem là tư vấn đầu tư hoặc khuyến nghị . XTC sẽ không chịu trách nhiệm đối với bất kỳ tổn thất hoặc thiệt hại nào, bao gồm nhưng không giới hạn, bất kỳ tổn thất lợi nhuận nào, có thể phát sinh trực tiếp hoặc gián tiếp từ việc sử dụng hoặc phụ thuộc vào thông tin đó. Tất cả các quyết định giao dịch phải luôn dựa trên phán quyết độc lập của bạn.
                </p>
              </div>

            </div>
          </div>

          {/* 5. RELATED ARTICLES SECTION */}
          <RelatedArticles currentId={article.id} category={article.category || 'market-analysis'} basePath="/market-analysis" />
          
        </main>

        {/* 6. FOOTER */}
        <Footer />
      </div>
    </>
  );
};

export default MarketAnalysisDetailPage;
