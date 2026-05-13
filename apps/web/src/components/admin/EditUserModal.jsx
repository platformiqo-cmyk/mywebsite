
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { useToast } from '@/hooks/use-toast.js';

const EditUserModal = ({ isOpen, onClose, user, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    role: 'viewer',
    password: '',
    passwordConfirm: ''
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        email: user.email || '',
        role: user.role || 'viewer',
        password: '',
        passwordConfirm: ''
      });
    }
  }, [user, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.passwordConfirm) {
      toast({ title: "Lỗi", description: "Mật khẩu xác nhận không khớp.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        email: formData.email,
        role: formData.role
      };

      if (formData.password) {
        updateData.password = formData.password;
        updateData.passwordConfirm = formData.passwordConfirm;
      }

      await pb.collection('users').update(user.id, updateData, { $autoCancel: false });
      
      toast({ title: "Thành công", description: "Đã cập nhật thông tin người dùng." });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Update user error:', error);
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input id="edit-email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label>Vai trò (Role)</Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4">Để trống nếu không muốn đổi mật khẩu</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-password">Mật khẩu mới</Label>
                <Input id="edit-password" name="password" type="password" value={formData.password} onChange={handleInputChange} minLength={8} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-passwordConfirm">Xác nhận mật khẩu mới</Label>
                <Input id="edit-passwordConfirm" name="passwordConfirm" type="password" value={formData.passwordConfirm} onChange={handleInputChange} minLength={8} />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Hủy</Button>
            <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
