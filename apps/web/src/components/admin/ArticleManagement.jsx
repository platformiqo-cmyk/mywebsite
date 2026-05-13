
import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { useToast } from '@/hooks/use-toast.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import QuillEditor from '@/components/QuillEditor.jsx';
import EditArticleModal from './EditArticleModal.jsx';
import DeleteArticleModal from './DeleteArticleModal.jsx';

const ArticleManagement = () => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  
  // Modals state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Form state
  const initialFormState = {
    title: '', excerpt: '', content: '', author: '',
    publishDate: new Date().toISOString().split('T')[0],
    category: 'knowledge', heroImage: null, image: null
  };
  const [formData, setFormData] = useState(initialFormState);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('news').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setArticles(records);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({ title: "Lỗi", description: "Không thể tải danh sách bài viết.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

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
    if (file) setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({ title: "Lỗi", description: "Vui lòng nhập tiêu đề và nội dung.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
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

      await pb.collection('news').create(submitData, { $autoCancel: false });
      
      toast({ title: "Thành công", description: "Đã tạo bài viết mới." });
      setFormData(initialFormState);
      fetchArticles();
      setActiveTab('list');
    } catch (error) {
      console.error('Create error:', error);
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (article) => {
    setSelectedArticle(article);
    setEditModalOpen(true);
  };

  const openDeleteModal = (article) => {
    setSelectedArticle(article);
    setDeleteModalOpen(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="list">Danh sách</TabsTrigger>
          <TabsTrigger value="create">Tạo bài mới</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Tác giả</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Ngày đăng</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">Không có bài viết nào.</TableCell>
                    </TableRow>
                  ) : (
                    articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium max-w-[300px] truncate">{article.title}</TableCell>
                        <TableCell>{article.author || '-'}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">
                            {article.category}
                          </span>
                        </TableCell>
                        <TableCell>{article.publishDate ? new Date(article.publishDate).toLocaleDateString('vi-VN') : '-'}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openEditModal(article)} className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          {/* Only show delete button for admin role */}
                          {currentUser?.role === 'admin' && (
                            <Button variant="ghost" size="icon" onClick={() => openDeleteModal(article)} className="text-red-600 hover:text-red-800 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="create">
          <form onSubmit={handleCreateSubmit} className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">Tiêu đề <span className="text-red-500">*</span></Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="excerpt">Tóm tắt</Label>
                <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows={3} />
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
                <Label htmlFor="author">Tác giả</Label>
                <Input id="author" name="author" value={formData.author} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishDate">Ngày đăng</Label>
                <Input id="publishDate" name="publishDate" type="date" value={formData.publishDate} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroImage">Ảnh bìa (Hero Image)</Label>
                <Input id="heroImage" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'heroImage')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Ảnh nội dung</Label>
                <Input id="image" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Nội dung <span className="text-red-500">*</span></Label>
              <QuillEditor value={formData.content} onChange={handleContentChange} />
            </div>
            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={submitting} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                Tạo bài viết
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      <EditArticleModal 
        isOpen={editModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        article={selectedArticle} 
        onSuccess={fetchArticles} 
      />
      <DeleteArticleModal 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        article={selectedArticle} 
        onSuccess={fetchArticles} 
      />
    </div>
  );
};

export default ArticleManagement;
