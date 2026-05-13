
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Star, ArrowRight } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const records = await pb.collection('courses').getFullList({
          sort: '-created',
          $autoCancel: false
        });
        setCourses(records);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleBuyClick = (courseId) => {
    if (isAuthenticated) {
      navigate(`/payment/${courseId}`);
    } else {
      navigate('/login', { state: { from: { pathname: `/payment/${courseId}` } } });
    }
  };

  return (
    <>
      <Helmet>
        <title>Khóa học Đầu tư - XTC Investment Platform</title>
        <meta name="description" content="Nâng cao kiến thức đầu tư với các khóa học chuyên sâu từ chuyên gia XTC." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1608600712992-03e5325d94c8?q=80&w=2000" 
              alt="Trading charts" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/95"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-emerald-500/20 rounded-full mb-6 border border-emerald-500/30">
                <span className="text-emerald-400 font-semibold flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Học viện XTC
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Nâng tầm kỹ năng <br/>
                <span className="text-emerald-400">đầu tư của bạn</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Học hỏi từ các chuyên gia hàng đầu với các khóa học thực chiến, từ cơ bản đến nâng cao.
              </p>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20 flex-grow">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Chưa có khóa học nào</h2>
                <p className="text-gray-500">Các khóa học đang được cập nhật. Vui lòng quay lại sau.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
                    <div className="relative h-56 overflow-hidden">
                      {course.thumbnail ? (
                        <img 
                          src={pb.files.getUrl(course, course.thumbnail)} 
                          alt={course.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-emerald-600 shadow-sm">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                        {course.description}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-100 mt-auto">
                        <Button 
                          onClick={() => handleBuyClick(course.id)}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 rounded-xl text-lg font-medium transition-all duration-300"
                        >
                          Mua ngay
                          <ArrowRight className="ml-2 w-5 h-5" />
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

export default CoursesPage;
