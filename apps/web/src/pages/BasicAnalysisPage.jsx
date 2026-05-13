
import React from 'react';
import { Helmet } from 'react-helmet';
import { LineChart } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const BasicAnalysisPage = () => {
  return (
    <>
      <Helmet>
        <title>Phân tích cơ bản - XTC Investment Platform</title>
        <meta name="description" content="Đào tạo nhận biết xu hướng thị trường thông qua các yếu tố vi mô và vĩ mô." />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-emerald-50 via-white to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-6 py-3 bg-emerald-100 rounded-full mb-6">
                <span className="text-emerald-700 font-semibold">Học viện</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Phân tích cơ bản
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Đào tạo nhận biết xu hướng thị trường thông qua các yếu tố vi mô và vĩ mô.
              </p>
            </div>
          </div>
        </section>

        {/* Placeholder Content */}
        <section className="py-16 flex-grow bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl border border-gray-200 border-dashed p-12 text-center">
              <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Nội dung đang được cập nhật</h2>
              <p className="text-gray-500">
                Tài liệu đào tạo phân tích cơ bản sẽ sớm được cung cấp. Vui lòng quay lại sau!
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BasicAnalysisPage;
