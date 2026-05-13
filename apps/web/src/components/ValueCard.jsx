
import React from 'react';

const ValueCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full flex flex-col">
      <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300">
        <Icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed flex-grow">
        {description}
      </p>
    </div>
  );
};

export default ValueCard;
