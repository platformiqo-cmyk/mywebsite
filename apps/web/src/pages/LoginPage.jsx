import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  
  const { login, requestOTP, rememberMe, setRememberMe } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, rememberMe);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPLogin = async () => {
    if (!email) {
      setError('Vui lòng nhập email để đăng nhập bằng OTP.');
      return;
    }
    
    setError('');
    setIsOtpLoading(true);

    try {
      const otpResult = await requestOTP(email);
      navigate('/verify-otp', { 
        state: { 
          email: email, 
          otpId: otpResult.otpId 
        } 
      });
    } catch (err) {
      console.error('OTP request error:', err);
      setError('Không thể gửi mã OTP. Vui lòng kiểm tra lại email hoặc đăng ký tài khoản mới.');
    } finally {
      setIsOtpLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập - XTC Investment Platform</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <div className="flex-grow flex items-center justify-center py-24 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại</h1>
              <p className="text-gray-500">Đăng nhập để tiếp tục hành trình đầu tư của bạn</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked)}
                    className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  />
                  <label 
                    htmlFor="remember" 
                    className="text-sm font-medium text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Duy trì đăng nhập
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={isLoading || isOtpLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 rounded-xl text-lg font-medium transition-all duration-300"
                >
                  {isLoading ? 'Đang xử lý...' : 'Đăng nhập bằng mật khẩu'}
                  {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Hoặc</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleOTPLogin}
                  disabled={isLoading || isOtpLoading}
                  className="w-full py-6 rounded-xl text-lg font-medium transition-all duration-300 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  {isOtpLoading ? 'Đang gửi mã...' : 'Đăng nhập bằng mã OTP'}
                  {!isOtpLoading && <KeyRound className="ml-2 w-5 h-5" />}
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Chưa có tài khoản?{' '}
                <Link to="/signup" className="text-emerald-600 font-semibold hover:text-emerald-700">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default LoginPage;