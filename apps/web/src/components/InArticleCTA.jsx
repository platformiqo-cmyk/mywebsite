
import React from 'react';
import { Link } from 'react-router-dom';

const InArticleCTA = ({ 
  title = 'Bắt đầu giao dịch ngay', 
  description = 'Mở tài khoản miễn phí và nhận bonus lên đến 100 USD', 
  buttonText = 'Mở tài khoản', 
  buttonLink = '/signup', 
  image = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800' 
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-800 p-6 md:p-8 lg:p-10 rounded-lg my-8 md:my-10 lg:my-12 shadow-lg flex flex-col md:flex-row gap-6 md:gap-8">
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold text-white mb-2 md:mb-3">
          {title}
        </h3>
        <p className="text-[14px] md:text-[15px] text-white/90 leading-relaxed mb-4 md:mb-5">
          {description}
        </p>
        <Link 
          to={buttonLink} 
          className="bg-white text-blue-600 font-semibold px-6 py-2.5 md:px-8 md:py-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 w-fit text-center"
        >
          {buttonText}
        </Link>
      </div>
      {image && (
        <div className="flex-1 hidden md:flex items-center justify-center">
          <img 
            src={image} 
            alt="Call to action" 
            className="max-w-full h-auto rounded-lg object-cover shadow-md" 
          />
        </div>
      )}
    </div>
  );
};

export default InArticleCTA;
