
import React from 'react';
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.js';

const ShareBar = ({ category }) => {
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Đã sao chép liên kết",
      description: "Liên kết bài viết đã được lưu vào clipboard.",
    });
  };

  const handleShare = (platform) => {
    toast({
      title: "Tính năng đang phát triển",
      description: `Chia sẻ lên ${platform} sẽ sớm ra mắt! 🚀`,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 border-y border-gray-200 my-8 bg-white">
      <div className="flex items-center text-gray-700 font-medium">
        <span className="mr-2">Chuyên mục:</span>
        <span className="uppercase font-bold text-gray-900">
          {category ? category.replace('-', ' ') : 'MARKET ANALYSIS'}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">Chia sẻ:</span>
        <button 
          onClick={() => handleShare('Facebook')}
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button 
          onClick={() => handleShare('Twitter')}
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        <button 
          onClick={() => handleShare('LinkedIn')}
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <button 
          onClick={handleCopyLink}
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Copy Link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ShareBar;
