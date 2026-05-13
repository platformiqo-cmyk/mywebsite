
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

const AnalysisCard = ({ title, description, link }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
        <FileText className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
        {description}
      </p>
      <Link 
        to={link} 
        className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-800 transition-colors mt-auto"
      >
        Xem chi tiết
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
      </Link>
    </div>
  );
};

export default AnalysisCard;
