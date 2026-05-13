
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { useToast } from '@/hooks/use-toast.js';
import { 
  Settings, 
  ArrowLeft, 
  Lock, 
  Bell, 
  Eye,
  Save
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';

const SettingsPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Password State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Preferences State (Mocked for UI as they don't exist in schema)
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(false);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin mật khẩu.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới không khớp.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới phải có ít nhất 8 ký tự.",
        variant: "destructive"
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await pb.collection('users').update(currentUser.id, {
        oldPassword: oldPassword,
        password: newPassword,
        passwordConfirm: confirmPassword
      }, { $autoCancel: false });
      
      toast({
        title: "Thành công",
        description: "Mật khẩu của bạn đã được cập nhật.",
      });
      
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error("Error updating password:", error);
      toast({
        title: "Lỗi cập nhật",
        description: error.response?.message || "Mật khẩu cũ không chính xác hoặc có lỗi xảy ra.",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSavePreferences = () => {
    setIsSavingPrefs(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Đã lưu cài đặt",
        description: "Các tùy chọn của bạn đã được cập nhật thành công.",
      });
      setIsSavingPrefs(false);
    }, 600);
  };

  return (
    <>
      <Helmet>
        <title>Cài đặt tài khoản - XTC Investment Platform</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cài đặt tài khoản</h1>
              <p className="text-gray-500 mt-1">Quản lý bảo mật và tùy chọn của bạn</p>
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

          <div className="space-y-8">
            {/* Password Section */}
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-emerald-600" />
                  Đổi mật khẩu
                </CardTitle>
                <CardDescription>
                  Đảm bảo tài khoản của bạn đang sử dụng một mật khẩu dài và an toàn.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Mật khẩu hiện tại</Label>
                    <Input 
                      id="oldPassword" 
                      type="password" 
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="text-gray-900"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isUpdatingPassword}
                    className="bg-emerald-600 hover:bg-emerald-700 mt-2"
                  >
                    {isUpdatingPassword ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Preferences Section */}
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-emerald-600" />
                  Tùy chọn hệ thống
                </CardTitle>
                <CardDescription>
                  Quản lý thông báo và quyền riêng tư của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6 max-w-2xl">
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center">
                        <Bell className="w-4 h-4 mr-2 text-gray-500" />
                        Thông báo Email
                      </Label>
                      <p className="text-sm text-gray-500">
                        Nhận email về các khóa học mới, báo cáo thị trường và tin tức.
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center">
                        <Eye className="w-4 h-4 mr-2 text-gray-500" />
                        Hiển thị hồ sơ công khai
                      </Label>
                      <p className="text-sm text-gray-500">
                        Cho phép người dùng khác nhìn thấy hồ sơ và tiến trình học tập của bạn.
                      </p>
                    </div>
                    <Switch 
                      checked={profileVisibility}
                      onCheckedChange={setProfileVisibility}
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Button 
                      onClick={handleSavePreferences} 
                      disabled={isSavingPrefs}
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSavingPrefs ? 'Đang lưu...' : 'Lưu tùy chọn'}
                    </Button>
                  </div>

                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SettingsPage;
