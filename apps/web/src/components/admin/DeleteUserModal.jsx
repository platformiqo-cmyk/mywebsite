
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog.jsx';
import { useToast } from '@/hooks/use-toast.js';

const DeleteUserModal = ({ isOpen, onClose, user, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!user) return;
    
    // Prevent deleting oneself
    if (user.id === pb.authStore.model?.id) {
      toast({ title: "Lỗi", description: "Bạn không thể tự xóa tài khoản của chính mình.", variant: "destructive" });
      onClose();
      return;
    }

    setLoading(true);
    try {
      await pb.collection('users').delete(user.id, { $autoCancel: false });
      toast({ title: "Thành công", description: "Đã xóa người dùng." });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Delete user error:', error);
      toast({ title: "Lỗi", description: "Không thể xóa người dùng.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác. Tài khoản "{user?.email}" sẽ bị xóa vĩnh viễn khỏi hệ thống.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Xóa tài khoản
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserModal;
