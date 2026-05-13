
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayCircle, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // 1. Check access
        const orders = await pb.collection('orders').getFullList({
          filter: `userId="${currentUser.id}" && courseId="${id}" && paymentStatus="completed"`,
          $autoCancel: false
        });

        if (orders.length === 0) {
          setHasAccess(false);
          setLoading(false);
          return;
        }

        setHasAccess(true);

        // 2. Fetch course details
        const courseRecord = await pb.collection('courses').getOne(id, { $autoCancel: false });
        setCourse(courseRecord);

        // 3. Fetch lessons
        const lessonsRecords = await pb.collection('lessons').getFullList({
          filter: `courseId="${id}"`,
          sort: 'order',
          $autoCancel: false
        });
        setLessons(lessonsRecords);
        
        if (lessonsRecords.length > 0) {
          setActiveLesson(lessonsRecords[0]);
        }

      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchCourseData();
    }
  }, [id, currentUser]);

  // Helper to extract YouTube ID
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Truy cập bị từ chối</h2>
            <p className="text-gray-600 mb-6">Bạn chưa mua khóa học này hoặc thanh toán chưa được xác nhận.</p>
            <button 
              onClick={() => navigate('/courses')}
              className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
            >
              Xem danh sách khóa học
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{course?.title || 'Khóa học'} - XTC Investment Platform</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <div className="flex-grow pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <button 
              onClick={() => navigate('/my-courses')}
              className="flex items-center text-gray-600 hover:text-emerald-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại khóa học của tôi
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video Player Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video relative">
                  {activeLesson ? (
                    <iframe
                      src={getYouTubeEmbedUrl(activeLesson.videoUrl)}
                      title={activeLesson.title}
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Chưa có video bài giảng
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {activeLesson ? activeLesson.title : course?.title}
                  </h1>
                  <p className="text-gray-600">
                    {course?.description}
                  </p>
                </div>
              </div>

              {/* Playlist Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-200px)] max-h-[800px]">
                  <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-900">Nội dung khóa học</h2>
                    <p className="text-sm text-gray-500 mt-1">{lessons.length} bài giảng</p>
                  </div>
                  
                  <div className="overflow-y-auto flex-grow">
                    {lessons.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        Đang cập nhật bài giảng...
                      </div>
                    ) : (
                      <ul className="divide-y divide-gray-100">
                        {lessons.map((lesson, index) => (
                          <li key={lesson.id}>
                            <button
                              onClick={() => setActiveLesson(lesson)}
                              className={`w-full text-left p-4 flex items-start space-x-3 hover:bg-gray-50 transition-colors ${
                                activeLesson?.id === lesson.id ? 'bg-emerald-50/50' : ''
                              }`}
                            >
                              <div className="flex-shrink-0 mt-1">
                                {activeLesson?.id === lesson.id ? (
                                  <PlayCircle className="w-5 h-5 text-emerald-500" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-[10px] text-gray-500 font-medium">
                                    {index + 1}
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className={`font-medium text-sm ${
                                  activeLesson?.id === lesson.id ? 'text-emerald-700' : 'text-gray-700'
                                }`}>
                                  {lesson.title}
                                </p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CourseDetailPage;
