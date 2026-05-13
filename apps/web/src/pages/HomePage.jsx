
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Target, Shield, Zap, BarChart2, Layers, Activity, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ValueCard from '@/components/ValueCard.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import AnalysisCard from '@/components/AnalysisCard.jsx';
import EmailSignupForm from '@/components/EmailSignupForm.jsx';

const HomePage = () => {
  const valueProps = [
    {
      icon: TrendingUp,
      title: 'Phân tích dựa trên cung-cầu thực',
      description: 'Không chỉ nhìn vào biểu đồ giá, chúng tôi đi sâu vào dữ liệu cơ bản, tồn kho, và các yếu tố vĩ mô ảnh hưởng trực tiếp đến giá hàng hóa.'
    },
    {
      icon: Target,
      title: 'Khung kịch bản thị trường & hành động',
      description: 'Luôn chuẩn bị sẵn các kịch bản (Bull/Bear/Base) kèm theo kế hoạch hành động cụ thể, giúp bạn không bị bị động trước biến động.'
    },
    {
      icon: Shield,
      title: 'Tập trung quản trị rủi ro & kỷ luật',
      description: 'Bảo vệ vốn là ưu tiên số một. Mọi chiến lược đều đi kèm với mức dừng lỗ rõ ràng và tỷ lệ Risk/Reward tối ưu.'
    },
    {
      icon: Zap,
      title: 'Tiếp cận theo chu kỳ ngành hàng hóa',
      description: 'Nhận diện dòng tiền và chu kỳ của từng nhóm hàng hóa (Năng lượng, Nông sản, Kim loại) để tối ưu hóa thời điểm giao dịch.'
    }
  ];

  const differentiators = [
    {
      icon: Layers,
      title: 'Phân tích theo ngành hàng hóa',
      description: 'Chuyên sâu vào từng ngách thị trường thay vì đánh giá chung chung.'
    },
    {
      icon: Activity,
      title: 'Có kịch bản & khung hành động',
      description: 'Biến phân tích thành quyết định giao dịch thực tế và rõ ràng.'
    },
    {
      icon: BarChart2,
      title: 'Dựa trên dữ liệu cung-cầu & dòng tiền',
      description: 'Sử dụng dữ liệu định lượng để xác nhận xu hướng.'
    },
    {
      icon: Lock,
      title: 'Trọng tâm quản trị rủi ro',
      description: 'Hệ thống hóa việc kiểm soát rủi ro trong mọi giao dịch.'
    }
  ];

  const sampleAnalyses = [
    {
      title: 'Phân tích dầu thô Q4 2024 - Xu hướng cung-cầu và kịch bản giá',
      description: 'Đánh giá tác động của cắt giảm sản lượng OPEC+ và dự phóng nhu cầu năng lượng toàn cầu trong mùa đông sắp tới.',
      link: '/market-analysis/dau-tho-q4-2024'
    },
    {
      title: 'Kịch bản vàng trong bối cảnh lạm phát - Phân tích rủi ro và cơ hội',
      description: 'Phân tích mối tương quan giữa lợi suất trái phiếu, chính sách của FED và dòng tiền trú ẩn an toàn vào kim loại quý.',
      link: '/market-analysis/kich-ban-vang-lam-phat'
    },
    {
      title: 'Cà phê: Chu kỳ ngành và chiến lược giao dịch',
      description: 'Cập nhật tình hình thời tiết tại Brazil, tồn kho ICE và các yếu tố ảnh hưởng đến cấu trúc giá cà phê Arabica & Robusta.',
      link: '/market-analysis/ca-phe-chu-ky-nganh'
    }
  ];

  return (
    <>
      <Helmet>
        <title>XTC - Phân tích & tư vấn phái sinh hàng hóa</title>
        <meta name="description" content="Phân tích & tư vấn phái sinh hàng hóa dựa trên dữ liệu. Báo cáo theo ngành, kịch bản thị trường, khung ra quyết định dựa trên dữ liệu cung-cầu." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900">
        <Header />

        {/* Hero Section */}
        <section className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620306677888-10e367e6293d')" }}
          ></div>
          
          {/* Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

          <div className="relative z-10 container mx-auto px-4 text-center pb-20">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-medium mb-4 backdrop-blur-sm shadow-lg">
                <span className="flex w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                Nền tảng phân tích dữ liệu chuyên sâu
              </div>
              
              <p className="text-lg md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-md">
                Báo cáo theo ngành, kịch bản thị trường, khung ra quyết định dựa trên dữ liệu cung-cầu thực tế.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
                <Link to="/market-analysis" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-7 text-lg rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all duration-300 transform hover:-translate-y-1 border-none">
                    Xem phân tích mới nhất
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="#lead-magnet" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:text-white px-8 py-7 text-lg rounded-xl transition-all duration-300 backdrop-blur-md">
                    Nhận báo cáo miễn phí
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Title at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20 w-full px-4">
            <h1 className="text-[20px] md:text-[28px] lg:text-[36px] font-bold text-white leading-tight drop-shadow-lg text-center pb-16 md:pb-24 lg:pb-32">
              Phân tích & tư vấn <span className="text-emerald-400">phái sinh hàng hóa</span> dựa trên dữ liệu
            </h1>
          </div>
        </section>

        {/* Value Proof Section */}
        <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tại sao chọn XTC?
              </h2>
              <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valueProps.map((prop, index) => (
                <ValueCard key={index} {...prop} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Giải pháp của chúng tôi
              </h2>
              <p className="text-lg text-gray-600">
                Hệ sinh thái toàn diện hỗ trợ nhà đầu tư từ kiến thức nền tảng đến chiến lược thực chiến.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <ServiceCard 
                title="Phân tích thị trường"
                description="Báo cáo chuyên sâu định kỳ, cập nhật xu hướng vĩ mô, phân tích cung cầu và đưa ra các kịch bản giá cho từng mặt hàng cụ thể."
                ctaText="Xem báo cáo mẫu"
                ctaLink="/market-analysis"
              />
              <ServiceCard 
                title="Tư vấn chiến lược 1-1"
                description="Đồng hành cùng nhà đầu tư xây dựng danh mục, thiết lập kế hoạch giao dịch và quản trị rủi ro cá nhân hóa theo khẩu vị."
                ctaText="Đặt lịch tư vấn"
                ctaLink="/contact"
              />
              <ServiceCard 
                title="Thư viện kiến thức"
                description="Hệ thống bài giảng, tài liệu và khóa học từ cơ bản đến nâng cao về giao dịch phái sinh hàng hóa và phân tích liên thị trường."
                ctaText="Vào thư viện kiến thức"
                ctaLink="/knowledge-platform"
              />
            </div>
          </div>
        </section>

        {/* USP / Differentiation Section */}
        <section className="py-24 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/3 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Khác biệt so với các nền tảng khác
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Chúng tôi không cung cấp "kèo" hay tín hiệu mù quáng. XTC trang bị cho bạn tư duy, công cụ và dữ liệu để tự tin ra quyết định độc lập.
                </p>
                <Link to="/about">
                  <Button variant="link" className="text-emerald-600 hover:text-emerald-800 p-0 h-auto text-lg font-semibold">
                    Tìm hiểu thêm về phương pháp của chúng tôi
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {differentiators.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 rounded-2xl bg-slate-50 hover:bg-emerald-50 transition-colors duration-300 border border-transparent hover:border-emerald-100">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Content Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Phân tích nổi bật
                </h2>
                <p className="text-gray-600 text-lg">Góc nhìn chuyên sâu về các thị trường trọng điểm.</p>
              </div>
              <Link to="/market-analysis" className="hidden md:flex items-center text-emerald-600 font-semibold hover:text-emerald-800 transition-colors">
                Xem tất cả phân tích
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {sampleAnalyses.map((analysis, index) => (
                <AnalysisCard key={index} {...analysis} />
              ))}
            </div>
            
            <div className="md:hidden text-center">
              <Link to="/market-analysis">
                <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  Xem tất cả phân tích
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Lead Magnet Section */}
        <section id="lead-magnet" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-teal-900"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="relative z-10 container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 max-w-6xl mx-auto">
              <div className="lg:w-1/2 text-center lg:text-left text-white space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Sẵn sàng giao dịch phái sinh hàng hóa bài bản hơn?
                </h2>
                <p className="text-xl text-emerald-100 leading-relaxed">
                  Nhận báo cáo thị trường hàng tuần + khung phân tích miễn phí trực tiếp qua email của bạn.
                </p>
                <ul className="space-y-3 text-emerald-50 text-left inline-block lg:block mx-auto">
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" /> Cập nhật xu hướng vĩ mô</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" /> Phân tích cung cầu các mặt hàng chính</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" /> Kịch bản giao dịch tham khảo</li>
                </ul>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <EmailSignupForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
