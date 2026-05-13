import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const displayName = currentUser?.name || currentUser?.email?.split('@')[0] || 'Người dùng';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full border border-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      >
        <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-emerald-500" />
        </div>
        <span className="text-sm font-medium text-gray-300 hidden sm:block">{displayName}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-56 bg-[#111827] border border-gray-800 rounded-lg shadow-xl py-2 transition-all duration-200 origin-top-right z-50 ${
          isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        <div className="px-4 py-3 border-b border-gray-800 mb-2">
          <p className="text-sm font-medium text-white truncate">{displayName}</p>
          <p className="text-xs text-gray-400 truncate mt-0.5">{currentUser?.email}</p>
        </div>

        <div className="flex flex-col">
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-emerald-500 hover:bg-gray-800 transition-colors duration-200 group"
          >
            <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            Xem hồ sơ cá nhân
          </Link>

          <Link
            to="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-emerald-500 hover:bg-gray-800 transition-colors duration-200 group"
          >
            <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            Cài đặt tài khoản
          </Link>

          <div className="h-px bg-gray-800 my-2"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors duration-200 group"
          >
            <LogOut className="w-4 h-4 mr-3 text-red-400 group-hover:text-red-300 transition-colors" />
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDropdown;