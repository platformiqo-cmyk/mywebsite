
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const CTABanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#0B1120] to-[#111827] border-y border-gray-800 py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[200%] bg-emerald-500/5 blur-[120px] rounded-full transform rotate-12"></div>
        <div className="absolute -bottom-[50%] -left-[10%] w-[50%] h-[150%] bg-blue-500/5 blur-[100px] rounded-full transform -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Sẵn sàng nắm bắt cơ hội thị trường?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Mở tài khoản giao dịch ngay hôm nay để truy cập nền tảng chuyên nghiệp, công cụ phân tích chuyên sâu và mức phí cạnh tranh nhất.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 rounded-xl font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 hover:-translate-y-1">
              Mở tài khoản ngay
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg px-8 py-6 rounded-xl font-medium transition-all duration-300">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
