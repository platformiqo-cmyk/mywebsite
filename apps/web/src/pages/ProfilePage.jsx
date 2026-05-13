
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { useToast } from '@/hooks/use-toast.js';
import { 
  User, 
  Mail, 
  Shield, 
  ArrowLeft, 
  Edit2, 
  Save, 
  X,
  Camera
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!newName.trim()) {
      toast({
        title: "Lỗi",
        description: "Tên không được để trống.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await pb.collection('users').update(currentUser.id, {
        name: newName
      }, { $autoCancel: false });
      
      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin hồ sơ.",
      });
      setIsEditing(false);
      // AuthContext will automatically update via pb.authStore.onChange
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Lỗi cập nhật",
        description: error.message || "Đã xảy ra lỗi khi cập nhật hồ sơ.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setNewName(currentUser?.name || '');
    setIsEditing(false);
  };

  const avatarUrl = currentUser?.avatar 
    ? pb.files.getUrl(currentUser, currentUser.avatar) 
    : null;

  return (
    <>
      <Helmet>
        <title>Hồ sơ cá nhân - XTC Investment Platform</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
              <p className="text-gray-500 mt-1">Quản lý thông tin cá nhân của bạn</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại Dashboard
            </Button>
          </div>

          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-xl flex items-center">
                <User className="w-5 h-5 mr-2 text-emerald-600" />
                Thông tin cơ bản
              </CardTitle>
              <CardDescription>
                Cập nhật ảnh đại diện và chi tiết cá nhân của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                    <button 
                      className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-1.5 flex justify-center items-center hover:bg-black/70 transition-colors"
                      onClick={() => toast({ description: "🚧 Tính năng tải ảnh lên đang được phát triển!" })}
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentUser?.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {currentUser?.verified ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 w-full space-y-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Họ và tên
                    </label>
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <Input 
                          value={newName} 
                          onChange={(e) => setNewName(e.target.value)}
                          className="max-w-md text-gray-900"
                          placeholder="Nhập họ và tên của bạn"
                          autoFocus
                        />
                        <Button size="sm" onClick={handleSave} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                          <Save className="w-4 h-4 mr-1" /> Lưu
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel} disabled={isLoading}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between max-w-md p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-gray-900 font-medium">{currentUser?.name || 'Chưa cập nhật'}</span>
                        <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="h-8 px-2 text-gray-500 hover:text-emerald-600">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Địa chỉ Email
                    </label>
                    <div className="max-w-md p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-500 cursor-not-allowed">
                      {currentUser?.email}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Email không thể thay đổi sau khi đăng ký.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;
