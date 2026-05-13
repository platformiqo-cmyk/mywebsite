
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleContent from '@/components/ArticleContent.jsx';
import ShareBar from '@/components/ShareBar.jsx';
import ReadingProgressBar from '@/components/ReadingProgressBar.jsx';
import TableOfContents from '@/components/TableOfContents.jsx';
import InArticleCTA from '@/components/InArticleCTA.jsx';
import RelatedArticlesOverlay from '@/components/RelatedArticlesOverlay.jsx';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);

  // Fetch main article
  useEffect(() => {
    const fetchArticleData = async () => {
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
      fetchArticleData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center pt-20">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#00b386] border-t-transparent rounded-full animate-spin"></div>
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
            <button onClick={() => navigate('/news')} className="inline-flex items-center justify-center px-6 py-3 bg-[#00b386] text-white rounded-lg hover:bg-[#009973] font-medium transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách tin tức
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const pageTitle = article.title || 'Bài viết';
  const pageDescription = article.excerpt || article.content?.replace(/<[^>]*>?/gm, '').substring(0, 160) || 'Khám phá các kiến thức và phân tích thị trường mới nhất.';
  
  const getHeroImageUrl = () => {
    if (article.heroImage) return pb.files.getUrl(article, article.heroImage);
    if (article.image) return pb.files.getUrl(article, article.image);
    return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1920';
  };

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} - XTC Investment Platform`}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={getHeroImageUrl()} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col font-sans">
        <ReadingProgressBar />
        <Header />

        <main className="flex-grow pt-16 md:pt-20">
          {/* 1. HERO SECTION */}
          <section className="relative w-full h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden bg-gray-900">
            <div 
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${getHeroImageUrl()})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/40 to-black/90" />

            {/* Title Container */}
            <div className="absolute bottom-0 left-0 right-0 z-20 w-full pt-20 pb-8 md:pb-12 px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end">
              <div className="mb-4">
                <span className="inline-block bg-[#00b386] text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider shadow-sm">
                  {article.category || 'TIN TỨC'}
                </span>
              </div>
              <h1 className="text-[24px] md:text-[32px] lg:text-[42px] font-bold text-white drop-shadow-lg text-center leading-tight max-w-[1000px]">
                {pageTitle}
              </h1>
            </div>
          </section>

          {/* 2. MAIN CONTENT CONTAINER */}
          <div className="max-w-[800px] mx-auto px-6 md:px-8 lg:px-0 py-12 md:py-16 lg:py-20">
            
            {/* Table of Contents for long articles */}
            {headings.length > 0 && (
              <div className="mb-10">
                <TableOfContents headings={headings} />
              </div>
            )}

            {/* Article Content */}
            <div className="prose-custom">
              <ArticleContent 
                article={article} 
                onHeadingsExtracted={setHeadings} 
              />
            </div>

            {/* 3. IN-ARTICLE CTA */}
            <InArticleCTA />

            {/* Share Bar */}
            <div className="mt-12">
              <ShareBar category={article.category} />
            </div>

          </div>

          {/* 4. BÀI VIẾT LIÊN QUAN (OVERLAY STYLE) */}
          {/* Delegating data fetching to the component to avoid race conditions with article category */}
          <RelatedArticlesOverlay 
            currentArticleId={article.id}
            category={article.category}
          />
          
        </main>

        {/* 5. FOOTER */}
        <Footer />
      </div>
    </>
  );
};

export default NewsDetailPage;
