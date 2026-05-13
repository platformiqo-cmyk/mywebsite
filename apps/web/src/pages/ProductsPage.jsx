
import React from 'react';
import { Helmet } from 'react-helmet';
import { TrendingUp, DollarSign, Bitcoin, FileText, PieChart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useToast } from '@/hooks/use-toast.js';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const ProductsPage = () => {
  const { toast } = useToast();

  const products = [
    {
      icon: TrendingUp,
      category: 'Cổ phiếu',
      title: 'Giao dịch cổ phiếu',
      description: 'Đầu tư vào cổ phiếu của các công ty niêm yết trên sàn HOSE, HNX và UPCoM với phí giao dịch cạnh tranh.',
      color: 'from-blue-500 to-blue-600',
      features: [
        'Hơn 1,500 mã cổ phiếu',
        'Phí giao dịch từ 0.15%',
        'Margin trading lên đến 3x',
        'Phân tích kỹ thuật chuyên sâu'
      ]
    },
    {
      icon: FileText,
      category: 'Trái phiếu',
      title: 'Trái phiếu doanh nghiệp',
      description: 'Đầu tư an toàn với trái phiếu doanh nghiệp và trái phiếu chính phủ, lãi suất hấp dẫn.',
      color: 'from-emerald-500 to-emerald-600',
      features: [
        'Lãi suất 7-12%/năm',
        'Kỳ hạn linh hoạt',
        'Thanh khoản cao',
        'Đa dạng tổ chức phát hành'
      ]
    },
    {
      icon: PieChart,
      category: 'Quỹ mở',
      title: 'Chứng chỉ quỹ',
      description: 'Đầu tư vào các quỹ mở được quản lý bởi các công ty quản lý quỹ uy tín, phù hợp với mọi mức độ rủi ro.',
      color: 'from-purple-500 to-purple-600',
      features: [
        'Hơn 50 quỹ đầu tư',
        'Quản lý chuyên nghiệp',
        'Đa dạng danh mục',
        'Phí quản lý thấp'
      ]
    },
    {
      icon: Bitcoin,
      category: 'Crypto',
      title: 'Tiền điện tử',
      description: 'Giao dịch các loại tiền điện tử hàng đầu như Bitcoin, Ethereum với nền tảng an toàn và bảo mật.',
      color: 'from-orange-500 to-orange-600',
      features: [
        'Top 100 cryptocurrency',
        'Giao dịch 24/7',
        'Ví lưu trữ an toàn',
        'Phí giao dịch thấp'
      ]
    },
    {
      icon: Globe,
      category: 'Forex',
      title: 'Ngoại hối',
      description: 'Giao dịch các cặp tiền tệ chính với đòn bẩy cao, spread thấp và thanh khoản tốt.',
      color: 'from-teal-500 to-teal-600',
      features: [
        '50+ cặp tiền tệ',
        'Đòn bẩy lên đến 1:100',
        'Spread từ 0.1 pip',
        'Giao dịch 24/5'
      ]
    },
    {
      icon: DollarSign,
      category: 'Phái sinh',
      title: 'Chứng khoán phái sinh',
      description: 'Giao dịch hợp đồng tương lai VN30, cơ hội sinh lời cao với quản lý rủi ro hiệu quả.',
      color: 'from-red-500 to-red-600',
      features: [
        'VN30 Index Futures',
        'Đòn bẩy cao',
        'Hedging hiệu quả',
        'Công cụ quản lý rủi ro'
      ]
    }
  ];

  const handleLearnMore = (productTitle) => {
    toast({
      title: "🚧 Tính năng đang phát triển",
      description: `Thông tin chi tiết về ${productTitle} sẽ sớm được cập nhật. Vui lòng liên hệ hotline để được tư vấn!`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Sản phẩm đầu tư - XTC Investment Platform</title>
        <meta name="description" content="Khám phá đa dạng sản phẩm đầu tư tại XTC: cổ phiếu, trái phiếu, quỹ mở, crypto, forex và chứng khoán phái sinh với phí giao dịch cạnh tranh." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-emerald-50 via-white to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-6 py-3 bg-emerald-100 rounded-full mb-6">
                <span className="text-emerald-700 font-semibold">Sản phẩm đầu tư</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Đa dạng{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                  sản phẩm đầu tư
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Từ cổ phiếu truyền thống đến tiền điện tử hiện đại, XTC cung cấp đầy đủ 
                các sản phẩm đầu tư phù hợp với mọi chiến lược và mức độ rủi ro
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <product.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handleLearnMore(product.title)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Tìm hiểu thêm
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Tại sao chọn sản phẩm của XTC?
                </h2>
                <p className="text-xl text-gray-600">
                  Những lợi thế vượt trội khi đầu tư cùng chúng tôi
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Đa dạng lựa chọn</h3>
                  <p className="text-gray-600">
                    Hơn 1,500 sản phẩm đầu tư từ truyền thống đến hiện đại, phù hợp với mọi chiến lược
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Phí giao dịch thấp</h3>
                  <p className="text-gray-600">
                    Mức phí cạnh tranh nhất thị trường, giúp tối ưu hóa lợi nhuận đầu tư của bạn
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Thanh khoản cao</h3>
                  <p className="text-gray-600">
                    Giao dịch nhanh chóng với thanh khoản tốt, dễ dàng mua vào và bán ra
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Hỗ trợ chuyên nghiệp</h3>
                  <p className="text-gray-600">
                    Đội ngũ tư vấn giàu kinh nghiệm sẵn sàng hỗ trợ 24/7
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
              Bắt đầu đầu tư ngay hôm nay
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Mở tài khoản miễn phí và khám phá các sản phẩm đầu tư đa dạng
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

export default ProductsPage;
