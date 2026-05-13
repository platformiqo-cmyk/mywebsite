
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import ArticleManagement from '@/components/admin/ArticleManagement.jsx';
import UserManagement from '@/components/admin/UserManagement.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';

const AdminPanel = () => {
  const { currentUser } = useAuth();
  const [activeSection, setActiveSection] = useState('articles');

  // Ensure non-admins cannot stay on the users tab if they somehow get there
  useEffect(() => {
    if (activeSection === 'users' && currentUser?.role !== 'admin') {
      setActiveSection('articles');
    }
  }, [activeSection, currentUser]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <Helmet>
        <title>Admin Panel | XTC</title>
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản trị hệ thống</h1>
          <p className="text-gray-600 mt-2">Quản lý nội dung và người dùng trên nền tảng</p>
        </div>

        {/* Top Navigation Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={() => setActiveSection('articles')}
            variant={activeSection === 'articles' ? 'default' : 'outline'}
            className={`px-6 py-6 text-base rounded-xl transition-all ${
              activeSection === 'articles' 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
            }`}
          >
            <FileText className="w-5 h-5 mr-2" />
            📝 Quản lý bài viết
          </Button>
          
          {currentUser?.role === 'admin' && (
            <Button 
              onClick={() => setActiveSection('users')}
              variant={activeSection === 'users' ? 'default' : 'outline'}
              className={`px-6 py-6 text-base rounded-xl transition-all ${
                activeSection === 'users' 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              👥 Quản lý người dùng
            </Button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="transition-all duration-300">
          {activeSection === 'articles' && <ArticleManagement />}
          {activeSection === 'users' && currentUser?.role === 'admin' && <UserManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
