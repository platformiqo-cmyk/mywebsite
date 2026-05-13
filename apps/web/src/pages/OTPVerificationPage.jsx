import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const OTPVerificationPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { completeOTPVerification } = useAuth();

  const email = location.state?.email;
  const otpId = location.state?.otpId;

  useEffect(() => {
    if (!email || !otpId) {
      navigate('/login', { replace: true });
    }
  }, [email, otpId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (code.length !== 8) {
      return setError('Mã xác thực phải bao gồm 8 chữ số.');
    }

    setIsLoading(true);

    try {
      await completeOTPVerification(otpId, code);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('Mã xác thực không chính xác hoặc đã hết hạn.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Xác thực Email - XTC Investment Platform</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <div className="flex-grow flex items-center justify-center py-24 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Xác thực Email</h1>
            <p className="text-gray-500 mb-8">
              Chúng tôi đã gửi mã xác thực gồm 8 chữ số đến email <br/>
              <span className="font-semibold text-gray-900">{email}</span>
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-left">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  required
                  maxLength={8}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  className="block w-full text-center text-3xl tracking-widest py-4 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-mono"
                  placeholder="00000000"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || code.length !== 8}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 rounded-xl text-lg font-medium transition-all duration-300"
              >
                {isLoading ? 'Đang xác thực...' : 'Xác nhận'}
                {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default OTPVerificationPage;