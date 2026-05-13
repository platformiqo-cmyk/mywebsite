
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { useToast } from '@/hooks/use-toast.js';
import QuillEditor from './QuillEditor.jsx';

const NewsForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    publishDate: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (htmlContent) => {
    setFormData(prev => ({ ...prev, content: htmlContent }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for empty content or just empty tags from Quill
    const isEmptyContent = !formData.content.trim() || formData.content === '<p><br></p>' || formData.content === '<p></p>';

    if (!formData.title.trim() || isEmptyContent) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Ensure publishDate is always included and defaults to today if empty
      const dateString = formData.publishDate || new Date().toISOString().split('T')[0];
      // Convert to full ISO 8601 format for PocketBase
      const isoPublishDate = new Date(dateString).toISOString();

      await pb.collection('news').create({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: 'news',
        publishDate: isoPublishDate
      }, { $autoCancel: false });

      toast({ 
        title: "Thành công", 
        description: "Đã lưu bài viết thành công." 
      });
      
      // Reset form
      setFormData({ 
        title: '', 
        excerpt: '', 
        content: '',
        publishDate: new Date().toISOString().split('T')[0]
      });
      
      // Navigate back to news page
      navigate('/news');
    } catch (error) {
      console.error('Error saving news:', error);
      toast({ 
        title: "Lỗi", 
        description: error.message || "Không thể lưu bài viết. Vui lòng thử lại.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base font-semibold text-gray-900">Tiêu đề bài viết</Label>
        <Input 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleInputChange} 
          required 
          placeholder="Nhập tiêu đề bài viết..."
          className="text-gray-900 text-lg py-6"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishDate" className="text-base font-semibold text-gray-900">Ngày đăng</Label>
        <Input 
          id="publishDate" 
          name="publishDate" 
          type="date"
          value={formData.publishDate} 
          onChange={handleInputChange} 
          className="text-gray-900 py-6"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt" className="text-base font-semibold text-gray-900">Mô tả ngắn (Tóm tắt)</Label>
        <Textarea 
          id="excerpt" 
          name="excerpt" 
          value={formData.excerpt} 
          onChange={handleInputChange} 
          placeholder="Nhập đoạn tóm tắt ngắn gọn về nội dung bài viết..."
          className="text-gray-900 resize-none"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-base font-semibold text-gray-900 block">Nội dung chi tiết</Label>
        <QuillEditor 
          value={formData.content} 
          onChange={handleContentChange} 
        />
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full md:w-auto px-8 py-6 text-lg bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Đang lưu...
            </>
          ) : (
            'Lưu bài viết'
          )}
        </Button>
      </div>
    </form>
  );
};

export default NewsForm;
