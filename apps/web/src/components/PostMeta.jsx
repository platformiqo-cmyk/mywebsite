
import React from 'react';
import { Calendar, User, Eye, Hash, Clock } from 'lucide-react';

const PostMeta = ({ article }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Đang cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Mock view count based on ID length or random for demo purposes
  const viewCount = article?.id ? Math.floor(article.id.length * 123.4) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-gray-600">
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
          <Hash className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase">Mã bài viết</span>
          <span className="font-semibold text-gray-800">{article?.id?.substring(0, 8) || '---'}</span>
        </div>
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-200"></div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase">Ngày đăng</span>
          <span className="font-semibold text-gray-800">{formatDate(article?.publishDate || article?.created)}</span>
        </div>
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-200"></div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
          <Clock className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase">Cập nhật</span>
          <span className="font-semibold text-gray-800">{formatDate(article?.updated)}</span>
        </div>
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-200"></div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
          <User className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase">Tác giả</span>
          <span className="font-semibold text-gray-800">{article?.author || 'Ban Biên Tập XTC'}</span>
        </div>
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-200"></div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
          <Eye className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase">Lượt xem</span>
          <span className="font-semibold text-gray-800">{viewCount.toLocaleString('vi-VN')}</span>
        </div>
      </div>

    </div>
  );
};

export default PostMeta;
