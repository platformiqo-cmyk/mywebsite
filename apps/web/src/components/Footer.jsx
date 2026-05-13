
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] border-t border-gray-800 text-gray-400 pt-16 pb-8 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <span className="text-white font-bold text-xl">X</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">XTC</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Nền tảng giao dịch tài chính chuyên nghiệp. Cung cấp công cụ phân tích, dữ liệu thị trường realtime và giải pháp đầu tư toàn diện cho nhà giao dịch hiện đại.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-5">Sản phẩm</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="hover:text-emerald-400 transition-colors">Giao dịch CFD</Link></li>
              <li><Link to="/products" className="hover:text-emerald-400 transition-colors">Hàng hóa phái sinh</Link></li>
              <li><Link to="/market-analysis" className="hover:text-emerald-400 transition-colors">Phân tích thị trường</Link></li>
              <li><Link to="/periodic-report" className="hover:text-emerald-400 transition-colors">Báo cáo chuyên sâu</Link></li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-white font-semibold mb-5">Học viện</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/courses" className="hover:text-emerald-400 transition-colors">Khóa học đầu tư</Link></li>
              <li><Link to="/knowledge-platform" className="hover:text-emerald-400 transition-colors">Nền tảng kiến thức</Link></li>
              <li><Link to="/ebook" className="hover:text-emerald-400 transition-colors">Thư viện Ebook</Link></li>
              <li><Link to="/market-calendar" className="hover:text-emerald-400 transition-colors">Lịch kinh tế</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5">Công ty</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">Về chúng tôi</Link></li>
              <li><Link to="/recruitment" className="hover:text-emerald-400 transition-colors">Tuyển dụng</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Liên hệ hỗ trợ</Link></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Trung tâm trợ giúp</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} XTC Investment Platform. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-white transition-colors">Chính sách Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
