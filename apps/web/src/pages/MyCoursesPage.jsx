
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const MyCoursesPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        // Fetch orders for current user that are completed, expand course details
        const records = await pb.collection('orders').getFullList({
          filter: `userId="${currentUser.id}" && paymentStatus="completed"`,
          expand: 'courseId',
          sort: '-created',
          $autoCancel: false
        });
        setOrders(records);
      } catch (error) {
        console.error('Error fetching my courses:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchMyCourses();
    }
  }, [currentUser]);

  return (
    <>
      <Helmet>
        <title>Khóa học của tôi - XTC Investment Platform</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <section className="pt-32 pb-12 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Khóa học của tôi
              </h1>
              <p className="text-lg text-gray-600">
                Tiếp tục hành trình học tập và nâng cao kỹ năng đầu tư của bạn.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 flex-grow">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed max-w-3xl mx-auto">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Bạn chưa có khóa học nào</h2>
                <p className="text-gray-500 mb-6">Khám phá các khóa học của chúng tôi để bắt đầu học tập.</p>
                <Link to="/courses" className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors">
                  Xem danh sách khóa học
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {orders.map((order) => {
                  const course = order.expand?.courseId;
                  if (!course) return null;

                  return (
                    <Link 
                      key={order.id} 
                      to={`/courses/${course.id}`}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden">
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
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <PlayCircle className="w-16 h-16 text-white" />
                        </div>
                      </div>
                      
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <div className="mt-auto pt-4 flex items-center text-emerald-600 font-medium">
                          Tiếp tục học
                          <PlayCircle className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MyCoursesPage;
