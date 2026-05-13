
import React, { useState, useEffect } from 'react';
import { Loader2, Upload } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { useToast } from '@/hooks/use-toast.js';
import QuillEditor from '@/components/QuillEditor.jsx';

const EditArticleModal = ({ isOpen, onClose, article, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    publishDate: '',
    category: 'knowledge',
    heroImage: null,
    image: null
  });

  useEffect(() => {
    if (article && isOpen) {
      setFormData({
        title: article.title || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        author: article.author || '',
        publishDate: article.publishDate ? article.publishDate.split('T')[0] : '',
        category: article.category || 'knowledge',
        heroImage: null,
        image: null
      });
    }
  }, [article, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleContentChange = (htmlContent) => {
    setFormData(prev => ({ ...prev, content: htmlContent }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({ title: "Lỗi", description: "Vui lòng nhập tiêu đề và nội dung.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('excerpt', formData.excerpt);
      submitData.append('content', formData.content);
      submitData.append('author', formData.author);
      submitData.append('category', formData.category);
      
      if (formData.publishDate) {
        submitData.append('publishDate', new Date(formData.publishDate).toISOString());
      }
      
      if (formData.heroImage) submitData.append('heroImage', formData.heroImage);
      if (formData.image) submitData.append('image', formData.image);

      await pb.collection('news').update(article.id, submitData, { $autoCancel: false });
      
      toast({ title: "Thành công", description: "Đã cập nhật bài viết." });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Update error:', error);
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-title">Tiêu đề</Label>
              <Input id="edit-title" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-excerpt">Tóm tắt</Label>
              <Textarea id="edit-excerpt" name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Danh mục</Label>
              <Select value={formData.category} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="knowledge">Kiến thức đầu tư</SelectItem>
                  <SelectItem value="market-analysis">Phân tích thị trường</SelectItem>
                  <SelectItem value="news">Tin tức</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-author">Tác giả</Label>
              <Input id="edit-author" name="author" value={formData.author} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-publishDate">Ngày đăng</Label>
              <Input id="edit-publishDate" name="publishDate" type="date" value={formData.publishDate} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-heroImage">Ảnh bìa (Hero Image)</Label>
              <Input id="edit-heroImage" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'heroImage')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Ảnh nội dung</Label>
              <Input id="edit-image" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nội dung</Label>
            <QuillEditor value={formData.content} onChange={handleContentChange} />
          </div>
          <DialogFooter>
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

export default EditArticleModal;
