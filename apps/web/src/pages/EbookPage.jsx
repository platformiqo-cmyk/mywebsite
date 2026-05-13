
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Book, Download, FileText } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const EbookPage = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const records = await pb.collection('ebooks').getFullList({
          sort: '-created',
          $autoCancel: false
        });
        setEbooks(records);
      } catch (error) {
        console.error('Error fetching ebooks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  const handleDownload = (ebook) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/ebook' } } });
      return;
    }

    if (ebook.file) {
      const url = pb.files.getUrl(ebook, ebook.file);
      window.open(url, '_blank');
    } else {
      alert('File không tồn tại.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Ebook Đầu Tư - XTC Investment Platform</title>
        <meta name="description" content="Thư viện sách điện tử miễn phí về đầu tư, tài chính và giao dịch từ XTC." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1613870221621-b6626f6b6b3e?q=80&w=2000" 
              alt="Library" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/95"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full mb-6 border border-blue-500/30">
                <span className="text-blue-400 font-semibold flex items-center">
                  <Book className="w-4 h-4 mr-2" />
                  Thư viện XTC
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Kho tàng tri thức <br/>
                <span className="text-blue-400">đầu tư miễn phí</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Tải xuống các tài liệu, sách điện tử chuyên sâu được biên soạn bởi đội ngũ chuyên gia.
              </p>
            </div>
          </div>
        </section>

        {/* Ebooks Grid */}
        <section className="py-20 flex-grow">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : ebooks.length === 0 ? (
              <div className="text-center py-20">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Chưa có tài liệu nào</h2>
                <p className="text-gray-500">Thư viện đang được cập nhật. Vui lòng quay lại sau.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {ebooks.map((ebook) => (
                  <div key={ebook.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
                    <div className="relative h-64 overflow-hidden bg-gray-100 p-4 flex items-center justify-center">
                      {ebook.thumbnail ? (
                        <img 
                          src={pb.files.getUrl(ebook, ebook.thumbnail)} 
                          alt={ebook.title}
                          className="max-h-full max-w-full object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <Book className="w-16 h-16 text-gray-300" />
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {ebook.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-grow">
                        {ebook.description}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-100 mt-auto">
                        <Button 
                          onClick={() => handleDownload(ebook)}
                          variant="outline"
                          className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 py-5 rounded-xl font-medium transition-all duration-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Tải xuống
                        </Button>
                      </div>
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

export default EbookPage;
