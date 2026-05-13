
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, CreditCard, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const PaymentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Hardcoded bank details for demo
  const bankDetails = {
    bankName: 'Vietcombank',
    accountNumber: '0123456789',
    accountName: 'CONG TY TNHH XTC',
    branch: 'Chi nhánh Sở Giao Dịch'
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const record = await pb.collection('courses').getOne(courseId, { $autoCancel: false });
        setCourse(record);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Không tìm thấy thông tin khóa học.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleConfirmPayment = async () => {
    setProcessing(true);
    setError('');

    try {
      await pb.collection('orders').create({
        userId: currentUser.id,
        courseId: course.id,
        paymentStatus: 'pending',
        bankTransferInfo: `Chuyển khoản cho khóa học: ${course.title}`
      }, { $autoCancel: false });
      
      setSuccess(true);
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{error}</h2>
            <Button onClick={() => navigate('/courses')} variant="outline">
              Quay lại danh sách khóa học
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Thanh toán - XTC Investment Platform</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <div className="flex-grow py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <button 
              onClick={() => navigate('/courses')}
              className="flex items-center text-gray-600 hover:text-emerald-600 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </button>

            {success ? (
              <div className="bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Đăng ký thành công!</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Yêu cầu mua khóa học <strong>{course.title}</strong> của bạn đã được ghi nhận. <br/>
                  Chúng tôi sẽ kích hoạt khóa học ngay sau khi nhận được thanh toán.
                </p>
                <Button 
                  onClick={() => navigate('/my-courses')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-xl text-lg"
                >
                  Xem khóa học của tôi
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gray-900 p-8 text-white">
                  <h1 className="text-2xl font-bold mb-2">Thông tin thanh toán</h1>
                  <p className="text-gray-400">Vui lòng chuyển khoản theo thông tin bên dưới để hoàn tất mua khóa học.</p>
                </div>

                <div className="p-8">
                  {/* Order Summary */}
                  <div className="mb-8 pb-8 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Chi tiết đơn hàng</h3>
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">{course.title}</p>
                        <p className="text-sm text-gray-500">Khóa học trực tuyến</p>
                      </div>
                      <div className="text-xl font-bold text-emerald-600">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-emerald-500" />
                      Thông tin chuyển khoản
                    </h3>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-emerald-200/50 pb-4">
                        <span className="text-gray-600">Ngân hàng:</span>
                        <span className="font-bold text-gray-900">{bankDetails.bankName}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-emerald-200/50 pb-4">
                        <span className="text-gray-600">Số tài khoản:</span>
                        <span className="font-bold text-gray-900 text-xl tracking-wider">{bankDetails.accountNumber}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-emerald-200/50 pb-4">
                        <span className="text-gray-600">Chủ tài khoản:</span>
                        <span className="font-bold text-gray-900">{bankDetails.accountName}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-emerald-200/50 pb-4">
                        <span className="text-gray-600">Chi nhánh:</span>
                        <span className="font-bold text-gray-900">{bankDetails.branch}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-gray-600">Nội dung CK:</span>
                        <span className="font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">
                          {currentUser.phone || currentUser.email} - {course.id.substring(0, 5)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleConfirmPayment}
                    disabled={processing}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 rounded-xl text-lg font-medium transition-all duration-300 flex items-center justify-center"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {processing ? 'Đang xử lý...' : 'Tôi đã chuyển khoản'}
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Bằng việc click xác nhận, bạn đồng ý với các điều khoản dịch vụ của chúng tôi.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PaymentPage;
