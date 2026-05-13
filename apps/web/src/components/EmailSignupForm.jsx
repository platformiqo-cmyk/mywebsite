
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Loader2, CheckCircle2 } from 'lucide-react';

const EmailSignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ họ tên và email.",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập địa chỉ email hợp lệ.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      await pb.collection('email_signups').create({
        name: name.trim(),
        email: email.trim()
      }, { $autoCancel: false });

      setIsSuccess(true);
      setName('');
      setEmail('');
      
      toast({
        title: "Thành công!",
        description: "Bạn đã đăng ký nhận báo cáo thành công. Vui lòng kiểm tra email.",
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Đã xảy ra lỗi",
        description: "Không thể đăng ký lúc này. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center text-white animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Đăng ký thành công!</h3>
        <p className="text-emerald-100">
          Cảm ơn bạn đã quan tâm. Chúng tôi sẽ gửi báo cáo mới nhất đến email của bạn.
        </p>
        <Button 
          variant="outline" 
          className="mt-6 border-white/30 text-white hover:bg-white/20"
          onClick={() => setIsSuccess(false)}
        >
          Đăng ký email khác
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 max-w-md mx-auto w-full">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-medium">Họ và tên</Label>
          <Input
            id="name"
            type="text"
            placeholder="Nhập họ tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-gray-50/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-gray-50/50"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            'Nhận báo cáo miễn phí'
          )}
        </Button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          Chúng tôi cam kết bảo mật thông tin của bạn và không gửi spam.
        </p>
      </div>
    </form>
  );
};

export default EmailSignupForm;
