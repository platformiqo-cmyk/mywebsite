
import React from 'react';
import { Helmet } from 'react-helmet';
import { DollarSign, Zap, Headphones, BarChart3, Shield, Globe, Clock, Award } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const TradingBenefitsPage = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Phí giao dịch thấp',
      description: 'Mức phí cạnh tranh nhất thị trường, giúp tối ưu hóa lợi nhuận đầu tư của bạn. Không có phí ẩn, minh bạch 100%.',
      color: 'from-emerald-500 to-emerald-600',
      features: ['Phí giao dịch từ 0.15%', 'Miễn phí nạp/rút tiền', 'Không phí duy trì tài khoản']
    },
    {
      icon: Zap,
      title: 'Thực hiện lệnh nhanh chóng',
      description: 'Công nghệ matching engine tiên tiến đảm bảo lệnh được thực hiện trong tích tắc, không bỏ lỡ cơ hội.',
      color: 'from-blue-500 to-blue-600',
      features: ['Thực hiện lệnh < 0.1 giây', 'Hệ thống ổn định 99.9%', 'Không gián đoạn trong giờ giao dịch']
    },
    {
      icon: Headphones,
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ chăm sóc khách hàng chuyên nghiệp luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.',
      color: 'from-purple-500 to-purple-600',
      features: ['Hotline 24/7', 'Live chat trực tuyến', 'Email support nhanh chóng']
    },
    {
      icon: BarChart3,
      title: 'Công cụ phân tích mạnh mẽ',
      description: 'Bộ công cụ phân tích kỹ thuật và cơ bản chuyên sâu giúp bạn đưa ra quyết định đầu tư thông minh.',
      color: 'from-orange-500 to-orange-600',
      features: ['100+ chỉ báo kỹ thuật', 'Biểu đồ real-time', 'Báo cáo phân tích chuyên sâu']
    },
    {
      icon: Shield,
      title: 'Bảo mật tuyệt đối',
      description: 'Hệ thống bảo mật đa lớp với mã hóa SSL 256-bit, xác thực 2 yếu tố và giám sát 24/7.',
      color: 'from-red-500 to-red-600',
      features: ['Mã hóa SSL 256-bit', 'Xác thực 2 yếu tố (2FA)', 'Bảo hiểm tài sản']
    },
    {
      icon: Globe,
      title: 'Tiếp cận thị trường toàn cầu',
      description: 'Giao dịch không chỉ trên thị trường Việt Nam mà còn các thị trường quốc tế lớn.',
      color: 'from-teal-500 to-teal-600',
      features: ['Cổ phiếu Việt Nam', 'Chứng khoán quốc tế', 'Forex & Crypto']
    },
    {
      icon: Clock,
      title: 'Giao dịch linh hoạt',
      description: 'Đặt lệnh mọi lúc, mọi nơi với ứng dụng di động và web platform hiện đại.',
      color: 'from-indigo-500 to-indigo-600',
      features: ['App iOS & Android', 'Web platform', 'Đồng bộ đa thiết bị']
    },
    {
      icon: Award,
      title: 'Chương trình ưu đãi',
      description: 'Nhiều chương trình khuyến mãi hấp dẫn và phần thưởng cho nhà đầu tư trung thành.',
      color: 'from-pink-500 to-pink-600',
      features: ['Hoàn phí giao dịch', 'Tích điểm đổi quà', 'Ưu đãi VIP']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tiện ích giao dịch - XTC Investment Platform</title>
        <meta name="description" content="Khám phá các tiện ích giao dịch vượt trội tại XTC: phí thấp, thực hiện nhanh, hỗ trợ 24/7, công cụ phân tích mạnh mẽ và bảo mật tuyệt đối." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-6 py-3 bg-emerald-100 rounded-full mb-6">
                <span className="text-emerald-700 font-semibold">Tiện ích giao dịch</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Trải nghiệm giao dịch{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  vượt trội
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                XTC mang đến những tiện ích và tính năng hàng đầu giúp bạn giao dịch 
                hiệu quả, an toàn và tối ưu hóa lợi nhuận đầu tư
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {benefit.description}
                  </p>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  So sánh với đối thủ
                </h2>
                <p className="text-xl text-gray-600">
                  XTC vượt trội về mọi mặt
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-emerald-500 to-emerald-600">
                      <tr>
                        <th className="px-6 py-4 text-left text-white font-bold">Tiêu chí</th>
                        <th className="px-6 py-4 text-center text-white font-bold">XTC</th>
                        <th className="px-6 py-4 text-center text-white font-bold">Đối thủ A</th>
                        <th className="px-6 py-4 text-center text-white font-bold">Đối thủ B</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-medium">Phí giao dịch</td>
                        <td className="px-6 py-4 text-center text-emerald-600 font-bold">0.15%</td>
                        <td className="px-6 py-4 text-center text-gray-600">0.25%</td>
                        <td className="px-6 py-4 text-center text-gray-600">0.30%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-medium">Thời gian thực hiện lệnh</td>
                        <td className="px-6 py-4 text-center text-emerald-600 font-bold">&lt; 0.1s</td>
                        <td className="px-6 py-4 text-center text-gray-600">0.5s</td>
                        <td className="px-6 py-4 text-center text-gray-600">1s</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-medium">Hỗ trợ khách hàng</td>
                        <td className="px-6 py-4 text-center text-emerald-600 font-bold">24/7</td>
                        <td className="px-6 py-4 text-center text-gray-600">8h-17h</td>
                        <td className="px-6 py-4 text-center text-gray-600">8h-20h</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-medium">Số chỉ báo kỹ thuật</td>
                        <td className="px-6 py-4 text-center text-emerald-600 font-bold">100+</td>
                        <td className="px-6 py-4 text-center text-gray-600">50</td>
                        <td className="px-6 py-4 text-center text-gray-600">30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-500 to-emerald-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trải nghiệm ngay hôm nay
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Mở tài khoản miễn phí và khám phá các tiện ích giao dịch vượt trội
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

export default TradingBenefitsPage;
