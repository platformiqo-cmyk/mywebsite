
import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

const CustomerSupportChat = () => {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-3 md:gap-4">
      {/* Facebook Messenger */}
      <a
        href="https://m.me/thanhnam.hhps"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on Facebook Messenger"
        title="Chat on Facebook Messenger"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      </a>

      {/* Telegram */}
      <a
        href="https://t.me/olibuy"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-500 hover:bg-sky-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on Telegram"
        title="Chat on Telegram"
      >
        <Send className="w-6 h-6 md:w-7 md:h-7 pr-[2px] pb-[2px]" />
      </a>
    </div>
  );
};

export default CustomerSupportChat;
