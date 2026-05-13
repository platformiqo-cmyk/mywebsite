
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { 
  User, 
  Mail, 
  Shield, 
  LogOut, 
  BookOpen, 
  TrendingUp, 
  Settings,
  CreditCard
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button.jsx';

const DashboardPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // If not logged in, we should ideally redirect, but we'll handle basic display
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-grow flex items-center justify-center pt-24 pb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h2>
            <Button onClick={() => navigate('/login')}>Đăng nhập ngay</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - XTC Investment Platform</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Xin chào, {currentUser.name || currentUser.email.split('@')[0]}! 👋
              </h1>
              <p className="text-gray-500 mt-1">Chào mừng bạn quay trở lại bảng điều khiển.</p>
            </div>
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-emerald-600" />
                Thông tin tài khoản
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="font-medium text-gray-900">{currentUser.name || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{currentUser.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentUser.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {currentUser.verified ? 'Đã xác thực' : 'Chưa xác thực'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button 
                  onClick={() => navigate('/profile')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transform hover:scale-[1.02] transition-all duration-300 shadow-sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  Xem hồ sơ cá nhân
                </Button>
                <Button 
                  onClick={() => navigate('/settings')}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white transform hover:scale-[1.02] transition-all duration-300 shadow-sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Cài đặt tài khoản
                </Button>
              </div>
            </div>

            {/* Quick Actions & Stats */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Khóa học của tôi</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Cấp độ đầu tư</p>
                    <p className="text-2xl font-bold text-gray-900">Người mới</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Truy cập nhanh</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/courses" className="flex items-center p-4 rounded-xl border border-gray-100 hover:border-emerald-500 hover:shadow-md transition-all group">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Khám phá khóa học</p>
                      <p className="text-sm text-gray-500">Nâng cao kiến thức đầu tư</p>
                    </div>
                  </Link>
                  
                  <Link to="/market-analysis" className="flex items-center p-4 rounded-xl border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all group">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Phân tích thị trường</p>
                      <p className="text-sm text-gray-500">Cập nhật xu hướng mới nhất</p>
                    </div>
                  </Link>

                  <Link to="/my-courses" className="flex items-center p-4 rounded-xl border border-gray-100 hover:border-purple-500 hover:shadow-md transition-all group">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Khóa học của tôi</p>
                      <p className="text-sm text-gray-500">Tiếp tục tiến trình học tập</p>
                    </div>
                  </Link>

                  <Link to="/payment/history" className="flex items-center p-4 rounded-xl border border-gray-100 hover:border-amber-500 hover:shadow-md transition-all group">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Lịch sử giao dịch</p>
                      <p className="text-sm text-gray-500">Quản lý thanh toán</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
