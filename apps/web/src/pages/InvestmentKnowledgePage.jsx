
import React from 'react';
import { Helmet } from 'react-helmet';
import { BookOpen, TrendingUp, PieChart, Shield, Lightbulb, Target, BarChart3, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.js';
import { Button } from '@/components/ui/button.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const InvestmentKnowledgePage = () => {
  const { toast } = useToast();

  const categories = [
    {
      icon: BookOpen,
      title: 'Kiến thức cơ bản',
      description: 'Nền tảng đầu tư cho người mới bắt đầu',
      color: 'from-blue-500 to-blue-600',
      topics: [
        'Chứng khoán là gì?',
        'Cách thức hoạt động của thị trường',
        'Các loại chứng khoán',
        'Thuật ngữ cơ bản'
      ]
    },
    {
      icon: BarChart3,
      title: 'Phân tích kỹ thuật',
      description: 'Đọc biểu đồ và chỉ báo kỹ thuật',
      color: 'from-emerald-500 to-emerald-600',
      topics: [
        'Đọc biểu đồ nến',
        'Các chỉ báo phổ biến',
        'Mô hình giá',
        'Chiến lược giao dịch'
      ]
    },
    {
      icon: PieChart,
      title: 'Phân tích cơ bản',
      description: 'Đánh giá giá trị doanh nghiệp',
      color: 'from-purple-500 to-purple-600',
      topics: [
        'Đọc báo cáo tài chính',
        'Các chỉ số định giá',
        'Phân tích ngành',
        'Dự báo tăng trưởng'
      ]
    },
    {
      icon: Shield,
      title: 'Quản lý rủi ro',
      description: 'Bảo vệ vốn đầu tư của bạn',
      color: 'from-red-500 to-red-600',
      topics: [
        'Đa dạng hóa danh mục',
        'Stop loss & Take profit',
        'Quản lý vốn',
        'Tâm lý giao dịch'
      ]
    },
    {
      icon: Target,
      title: 'Chiến lược đầu tư',
      description: 'Xây dựng kế hoạch đầu tư hiệu quả',
      color: 'from-orange-500 to-orange-600',
      topics: [
        'Đầu tư dài hạn',
        'Đầu tư ngắn hạn',
        'Value investing',
        'Growth investing'
      ]
    },
    {
      icon: DollarSign,
      title: 'Tài chính cá nhân',
      description: 'Quản lý tài chính thông minh',
      color: 'from-teal-500 to-teal-600',
      topics: [
        'Lập kế hoạch tài chính',
        'Tiết kiệm hiệu quả',
        'Đầu tư thụ động',
        'Nghỉ hưu sớm'
      ]
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: 'Sách điện tử',
      description: 'Thư viện sách đầu tư miễn phí'
    },
    {
      icon: TrendingUp,
      title: 'Video hướng dẫn',
      description: 'Khóa học video từ cơ bản đến nâng cao'
    },
    {
      icon: Lightbulb,
      title: 'Webinar',
      description: 'Hội thảo trực tuyến với chuyên gia'
    },
    {
      icon: BarChart3,
      title: 'Báo cáo phân tích',
      description: 'Báo cáo thị trường hàng tuần'
    }
  ];

  const handleLearnMore = (title) => {
    toast({
      title: "🚧 Tính năng đang phát triển",
      description: `Nội dung về ${title} sẽ sớm được cập nhật. Vui lòng theo dõi để không bỏ lỡ!`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Kiến thức đầu tư - XTC Investment Platform</title>
        <meta name="description" content="Nâng cao kiến thức đầu tư với XTC - từ cơ bản đến nâng cao. Học phân tích kỹ thuật, phân tích cơ bản, quản lý rủi ro và chiến lược đầu tư hiệu quả." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-emerald-50 via-white to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-6 py-3 bg-emerald-100 rounded-full mb-6">
                <span className="text-emerald-700 font-semibold">Học viện đầu tư</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Nâng cao{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                  kiến thức đầu tư
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Từ kiến thức cơ bản đến chiến lược nâng cao, XTC đồng hành cùng bạn 
                trên hành trình trở thành nhà đầu tư thông minh
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Chủ đề học tập
              </h2>
              <p className="text-xl text-gray-600">
                Khám phá các chủ đề kiến thức đầu tư quan trọng
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {category.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handleLearnMore(category.title)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Tìm hiểu thêm
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tài nguyên học tập
              </h2>
              <p className="text-xl text-gray-600">
                Đa dạng hình thức học tập phù hợp với mọi nhu cầu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
                  onClick={() => handleLearnMore(resource.title)}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <resource.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Lời khuyên cho nhà đầu tư mới
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-50 to-white rounded-xl p-6 border-l-4 border-emerald-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">1. Học trước khi đầu tư</h3>
                  <p className="text-gray-600">
                    Đầu tư vào kiến thức trước khi đầu tư vào thị trường. Hiểu rõ sản phẩm bạn đang đầu tư.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2. Bắt đầu với số vốn nhỏ</h3>
                  <p className="text-gray-600">
                    Chỉ đầu tư số tiền bạn có thể chấp nhận mất. Tích lũy kinh nghiệm trước khi tăng vốn.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">3. Đa dạng hóa danh mục</h3>
                  <p className="text-gray-600">
                    Không bỏ tất cả trứng vào một giỏ. Phân bổ vốn vào nhiều loại tài sản khác nhau.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-6 border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">4. Kiên nhẫn và kỷ luật</h3>
                  <p className="text-gray-600">
                    Đầu tư là marathon, không phải sprint. Tuân thủ kế hoạch và không để cảm xúc chi phối.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">5. Học từ sai lầm</h3>
                  <p className="text-gray-600">
                    Mọi nhà đầu tư đều mắc sai lầm. Quan trọng là học hỏi và không lặp lại chúng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-500 to-emerald-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bắt đầu hành trình học tập
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Đăng ký tài khoản để truy cập đầy đủ tài liệu học tập và tham gia cộng đồng nhà đầu tư
            </p>
            <a
              href="/signup"
              className="inline-block bg-white text-emerald-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105"
            >
              Đăng ký ngay
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default InvestmentKnowledgePage;
