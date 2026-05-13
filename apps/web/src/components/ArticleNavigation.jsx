
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';

const ArticleNavigation = ({ currentArticle }) => {
  const [prevArticle, setPrevArticle] = useState(null);
  const [nextArticle, setNextArticle] = useState(null);

  useEffect(() => {
    const fetchNavigation = async () => {
      if (!currentArticle) return;
      
      const dateRef = currentArticle.publishDate || currentArticle.created;

      try {
        const prevRes = await pb.collection('news').getList(1, 1, {
          filter: `(publishDate < "${dateRef}" || (publishDate = "" && created < "${currentArticle.created}")) && id != "${currentArticle.id}"`,
          sort: '-publishDate,-created',
          $autoCancel: false
        });
        
        if (prevRes.items.length > 0) {
          setPrevArticle(prevRes.items[0]);
        }

        const nextRes = await pb.collection('news').getList(1, 1, {
          filter: `(publishDate > "${dateRef}" || (publishDate = "" && created > "${currentArticle.created}")) && id != "${currentArticle.id}"`,
          sort: 'publishDate,created',
          $autoCancel: false
        });
        
        if (nextRes.items.length > 0) {
          setNextArticle(nextRes.items[0]);
        }
      } catch (err) {
        console.error('Error fetching adjacent articles:', err);
      }
    };

    fetchNavigation();
  }, [currentArticle]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  };

  if (!prevArticle && !nextArticle) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10 border-t border-gray-200 mt-16">
      {prevArticle ? (
        <Link 
          to={`/news/${prevArticle.id}`} 
          className="group flex flex-col p-6 bg-gray-50 hover:bg-emerald-50 rounded-xl border border-gray-100 hover:border-emerald-100 transition-all duration-300"
        >
          <div className="flex items-center text-emerald-600 font-medium mb-3 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Bài trước
          </div>
          <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 line-clamp-2 mb-2 transition-colors">
            {prevArticle.title}
          </h4>
          <div className="flex items-center text-xs text-gray-500 mt-auto">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {formatDate(prevArticle.publishDate || prevArticle.created)}
          </div>
        </Link>
      ) : (
        <div className="hidden md:block"></div>
      )}

      {nextArticle ? (
        <Link 
          to={`/news/${nextArticle.id}`} 
          className="group flex flex-col p-6 bg-gray-50 hover:bg-emerald-50 rounded-xl border border-gray-100 hover:border-emerald-100 transition-all duration-300 text-right items-end"
        >
          <div className="flex items-center text-emerald-600 font-medium mb-3 text-sm">
            Bài sau
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 line-clamp-2 mb-2 transition-colors">
            {nextArticle.title}
          </h4>
          <div className="flex items-center text-xs text-gray-500 mt-auto">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {formatDate(nextArticle.publishDate || nextArticle.created)}
          </div>
        </Link>
      ) : (
        <div className="hidden md:block"></div>
      )}
    </div>
  );
};

export default ArticleNavigation;
