
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import UserProfileDropdown from '@/components/UserProfileDropdown.jsx';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Base navigation items
  const navItems = [
    {
      label: 'Thông tin thị trường',
      items: [
        { title: 'Lịch kinh tế', desc: 'Dữ liệu sự kiện vĩ mô', path: '/market-calendar' },
        { title: 'Báo cáo định kỳ', desc: 'Phân tích cung cầu', path: '/periodic-report' }
      ]
    },
    { label: 'Sản phẩm', path: '/products' },
    { label: 'Khóa học', path: '/courses' },
    {
      label: 'Học viện',
      items: [
        { title: 'Phái sinh cơ bản', desc: 'Nền tảng cho người mới', path: '/commodity-derivatives' },
        { title: 'Phân tích cơ bản', desc: 'Nhận biết xu hướng', path: '/basic-analysis' }
      ]
    },
    {
      label: 'Kiến thức đầu tư',
      items: [
        { title: 'Nền tảng kiến thức', desc: 'Cơ sở toàn diện', path: '/knowledge-platform' },
        { title: 'Phân tích thị trường', desc: 'Diễn biến mới nhất', path: '/market-analysis' },
        { title: 'Ebook Đầu Tư', desc: 'Thư viện miễn phí', path: '/ebook' }
      ]
    },
    {
      label: 'Về XTC',
      items: [
        { title: 'Giới thiệu', desc: 'Sứ mệnh & tầm nhìn', path: '/about' },
        { title: 'Tuyển dụng', desc: 'Cơ hội nghề nghiệp', path: '/recruitment' },
        { title: 'Liên hệ', desc: 'Hỗ trợ khách hàng', path: '/contact' }
      ]
    }
  ];

  // Add Admin link to 'Về XTC' dropdown if user is admin or editor
  if (currentUser?.role === 'admin' || currentUser?.role === 'editor') {
    const aboutIndex = navItems.findIndex(item => item.label === 'Về XTC');
    if (aboutIndex !== -1) {
      navItems[aboutIndex].items.push({
        title: 'Admin Panel',
        desc: 'Quản trị hệ thống',
        path: '/admin'
      });
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0B1120]/95 backdrop-blur-md border-b border-gray-800 shadow-lg py-2' : 'bg-[#0B1120] border-b border-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <span className="text-white font-bold text-xl">X</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">XTC</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === item.path ? 'text-emerald-400 bg-gray-800/50' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-800/50`}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 ml-1 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.items && (
                  <div
                    className={`absolute top-full left-0 w-72 pt-4 transition-all duration-300 origin-top-left ${activeDropdown === index ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
                  >
                    <div className="bg-[#111827] rounded-xl shadow-2xl border border-gray-800 p-2 overflow-hidden">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 group/item"
                        >
                          <div className={`font-semibold transition-colors mb-1 text-sm ${subItem.path === '/admin' ? 'text-emerald-400 group-hover/item:text-emerald-300' : 'text-gray-200 group-hover/item:text-emerald-400'}`}>
                            {subItem.title}
                          </div>
                          <div className="text-xs text-gray-500 leading-snug">
                            {subItem.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Đăng nhập
                </Link>
                <Button onClick={() => navigate('/signup')} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full px-6 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
                  Tạo tài khoản
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/my-courses">
                  <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-gray-800 rounded-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Khóa học
                  </Button>
                </Link>
                <UserProfileDropdown />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800 bg-[#0B1120] max-h-[calc(100vh-80px)] overflow-y-auto absolute left-0 right-0 top-full shadow-2xl">
            <nav className="flex flex-col space-y-1 px-4">
              {navItems.map((item, index) => (
                <div key={index} className="flex flex-col">
                  {item.path ? (
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${location.pathname === item.path ? 'text-emerald-400 bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="px-4 py-3 font-medium text-gray-400 border-b border-gray-800/50">
                      {item.label}
                    </div>
                  )}
                  
                  {item.items && (
                    <div className="flex flex-col pl-4 pr-2 py-2 space-y-1 bg-[#111827]/50 rounded-b-lg">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="p-3 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <div className={`font-medium text-sm mb-1 ${subItem.path === '/admin' ? 'text-emerald-400' : 'text-gray-300'}`}>
                            {subItem.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-6 mt-4 border-t border-gray-800 space-y-4 pb-6">
                {!isAuthenticated ? (
                  <>
                    <Button onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-full h-12">
                      Đăng nhập
                    </Button>
                    <Button onClick={() => { navigate('/signup'); setIsMobileMenuOpen(false); }} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-full h-12">
                      Tạo tài khoản
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center mb-4">
                      <UserProfileDropdown />
                    </div>
                    <Button onClick={handleLogout} variant="outline" className="w-full border-gray-700 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-full h-12">
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
