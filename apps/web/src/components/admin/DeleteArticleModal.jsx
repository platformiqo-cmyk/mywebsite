
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog.jsx';
import { useToast } from '@/hooks/use-toast.js';
import { useAuth } from '@/contexts/AuthContext.jsx';

const DeleteArticleModal = ({ isOpen, onClose, article, onSuccess }) => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!article) return;
    
    // Backend validation check on the frontend before attempting delete
    if (currentUser?.role !== 'admin') {
      toast({ 
        title: "Lỗi phân quyền", 
        description: "Bạn không có quyền xóa bài viết. Chỉ Admin mới có thể thực hiện thao tác này.", 
        variant: "destructive" 
      });
      onClose();
      return;
    }

    setLoading(true);
    try {
      await pb.collection('news').delete(article.id, { $autoCancel: false });
      toast({ title: "Thành công", description: "Đã xóa bài viết." });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Delete error:', error);
      toast({ title: "Lỗi", description: "Không thể xóa bài viết.", variant: "destructive" });
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
            Hành động này không thể hoàn tác. Bài viết "{article?.title}" sẽ bị xóa vĩnh viễn khỏi hệ thống.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Xóa bài viết
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteArticleModal;
