import React from 'react';
import { Helmet } from 'react-helmet';
import { Target, Award, Users, TrendingUp, Shield, Zap, Heart, Globe } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
const AboutPage = () => {
  const values = [{
    icon: Shield,
    title: 'Minh bạch',
    description: 'Cam kết minh bạch trong mọi giao dịch và hoạt động kinh doanh',
    color: 'from-blue-500 to-blue-600'
  }, {
    icon: Heart,
    title: 'Tận tâm',
    description: 'Đặt lợi ích của khách hàng lên hàng đầu trong mọi quyết định',
    color: 'from-emerald-500 to-emerald-600'
  }, {
    icon: Zap,
    title: 'Đổi mới',
    description: 'Không ngừng cải tiến công nghệ và dịch vụ để phục vụ tốt hơn',
    color: 'from-purple-500 to-purple-600'
  }, {
    icon: Globe,
    title: 'Toàn cầu',
    description: 'Kết nối nhà đầu tư Việt Nam với thị trường tài chính thế giới',
    color: 'from-orange-500 to-orange-600'
  }];
  const achievements = [{
    number: '10+',
    label: 'Năm kinh nghiệm'
  }, {
    number: '50,000+',
    label: 'Khách hàng tin tưởng'
  }, {
    number: '10 tỷ+',
    label: 'Khối lượng giao dịch'
  }, {
    number: '99.9%',
    label: 'Thời gian hoạt động'
  }];
  const team = [{
    name: 'Nguyễn Văn A',
    position: 'Giám đốc điều hành',
    description: '15+ năm kinh nghiệm trong lĩnh vực tài chính và đầu tư'
  }, {
    name: 'Trần Thị B',
    position: 'Giám đốc công nghệ',
    description: 'Chuyên gia công nghệ với nhiều dự án thành công tại các tập đoàn lớn'
  }, {
    name: 'Lê Văn C',
    position: 'Giám đốc phân tích',
    description: 'Chuyên gia phân tích thị trường với hơn 10 năm kinh nghiệm'
  }];
  return <>
      <Helmet>
        <title>Giới thiệu - XTC Investment Platform</title>
        <meta name="description" content="Tìm hiểu về XTC - nền tảng đầu tư hàng đầu Việt Nam với sứ mệnh mang đến giải pháp đầu tư chuyên nghiệp cho mọi nhà đầu tư." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-emerald-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Về chúng tôi
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                XTC là nền tảng đầu tư chứng khoán hàng đầu Việt Nam, được thành lập với sứ mệnh 
                mang đến giải pháp đầu tư chuyên nghiệp, minh bạch và hiệu quả cho mọi nhà đầu tư.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-full mb-6">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Sứ mệnh</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Để tiền làm việc cho bạn</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Chúng tôi tin rằng mọi người đều có quyền tiếp cận với các cơ hội đầu tư chất lượng cao. 
                  Với công nghệ tiên tiến và đội ngũ chuyên gia giàu kinh nghiệm, XTC cam kết mang đến 
                  nền tảng đầu tư đơn giản, minh bạch và hiệu quả.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Chúng tôi không chỉ cung cấp công cụ giao dịch mà còn đồng hành cùng bạn trên hành trình 
                  xây dựng tài sản thông qua kiến thức, tư vấn và hỗ trợ chuyên nghiệp.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070" alt="XTC Office" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white p-6 rounded-xl shadow-xl">
                  <Award className="w-12 h-12 mb-2" />
                  <p className="font-bold text-lg">Top 10</p>
                  <p className="text-sm">Nền tảng đầu tư VN</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Giá trị cốt lõi
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Những giá trị định hướng mọi hoạt động của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>)}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-500 to-emerald-600">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Thành tựu của chúng tôi
              </h2>
              <p className="text-xl text-emerald-100">
                Những con số ấn tượng minh chứng cho sự tin tưởng của khách hàng
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => <div key={index} className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-emerald-100 text-lg">{achievement.label}</div>
                </div>)}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Đội ngũ lãnh đạo
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Những chuyên gia hàng đầu với kinh nghiệm dày dặn trong ngành
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 font-semibold mb-4 text-center">
                    {member.position}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {member.description}
                  </p>
                </div>)}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>;
};
export default AboutPage;