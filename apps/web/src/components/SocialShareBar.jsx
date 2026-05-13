
import React from 'react';
import { Linkedin, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';

const SocialShareBar = ({ title }) => {
  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title || 'Phân tích thị trường');
    
    let shareUrl = '';
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        alert('Đã sao chép đường dẫn!');
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center space-x-3 my-6">
      <span className="text-sm text-gray-400 font-medium mr-2">Chia sẻ:</span>
      <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white transition-colors duration-300">
        <Linkedin className="w-4 h-4" />
      </button>
      <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1877f2] hover:text-white transition-colors duration-300">
        <Facebook className="w-4 h-4" />
      </button>
      <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1da1f2] hover:text-white transition-colors duration-300">
        <Twitter className="w-4 h-4" />
      </button>
      <button onClick={() => handleShare('copy')} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-colors duration-300">
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SocialShareBar;
