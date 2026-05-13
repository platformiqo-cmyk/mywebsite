
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, description, ctaText, ctaLink }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full group">
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
          {description}
        </p>
      </div>
      <Link to={ctaLink} className="mt-auto">
        <Button variant="outline" className="w-full group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200 transition-all duration-300 py-6 rounded-xl text-base font-medium">
          {ctaText}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  );
};

export default ServiceCard;
