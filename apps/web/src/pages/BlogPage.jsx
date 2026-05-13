
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Calendar, User, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const categories = ['Tất cả', 'Hàng hóa', 'Cổ phiếu', 'Forex', 'Dịch vụ XTC'];

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedCategory, searchQuery]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      let filter = '';
      const filters = [];
      
      if (selectedCategory !== 'Tất cả') {
        filters.push(`category="${selectedCategory}"`);
      }
      
      if (searchQuery) {
        filters.push(`title~"${searchQuery}"`);
      }
      
      if (filters.length > 0) {
        filter = filters.join(' && ');
      }

      const result = await pb.collection('news').getList(currentPage, 10, {
        sort: '-publishDate',
        filter: filter || undefined,
        $autoCancel: false
      });

      setPosts(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog - XTC Investment Platform</title>
        <meta name="description" content="Khám phá các bài viết chuyên sâu về đầu tư, phân tích thị trường và kiến thức tài chính từ XTC." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-6 py-3 bg-emerald-500/20 rounded-full mb-6 border border-emerald-500/30">
                <span className="text-emerald-400 font-semibold">Blog XTC</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Kiến thức{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  đầu tư
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Cập nhật tin tức, phân tích chuyên sâu và xu hướng thị trường mới nhất
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm bài viết..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="pl-12 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-emerald-500 rounded-xl h-12"
                    />
                  </form>

                  {/* Category Filter */}
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-600 text-white rounded-xl h-12 appearance-none cursor-pointer focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category} className="bg-gray-800">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-300">Đang tải bài viết...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">Không tìm thấy bài viết nào</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.id}`}
                        className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
                      >
                        {/* Featured Image */}
                        {post.featuredImage && (
                          <div className="relative h-48 overflow-hidden bg-gray-900">
                            <img
                              src={pb.files.getUrl(post, post.featuredImage)}
                              alt={post.title}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                          </div>
                        )}

                        <div className="p-6">
                          {/* Category Badge */}
                          {post.category && (
                            <div className="inline-block px-3 py-1 bg-emerald-500/20 rounded-full mb-3 border border-emerald-500/30">
                              <span className="text-emerald-400 text-xs font-semibold">
                                {post.category}
                              </span>
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          {post.excerpt && (
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                              {post.excerpt}
                            </p>
                          )}

                          {/* Meta Info */}
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-700/50">
                            {post.author && (
                              <div className="flex items-center space-x-2">
                                <User className="w-3 h-3" />
                                <span>{post.author}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(post.publishDate)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center space-x-4">
                      <Button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="border-gray-600 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Trước
                      </Button>

                      <div className="flex items-center space-x-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <Button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              variant={currentPage === pageNum ? 'default' : 'outline'}
                              className={
                                currentPage === pageNum
                                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                  : 'border-gray-600 text-white hover:bg-gray-800'
                              }
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>

                      <Button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        className="border-gray-600 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sau
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
