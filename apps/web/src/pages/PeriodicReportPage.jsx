
import React from 'react';
import { Helmet } from 'react-helmet';
import { FileBarChart } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const PeriodicReportPage = () => {
  return (
    <>
      <Helmet>
        <title>Báo cáo định kỳ - XTC Investment Platform</title>
        <meta name="description" content="Cung cấp báo cung - cầu mùa vụ, sản lượng, tồn kho..." />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-6 py-3 bg-emerald-100 rounded-full mb-6">
                <span className="text-emerald-700 font-semibold">Thông tin thị trường</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Báo cáo định kỳ
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Cung cấp báo cung - cầu mùa vụ, sản lượng, tồn kho...
              </p>
            </div>
          </div>
        </section>

        {/* Placeholder Content */}
        <section className="py-16 flex-grow bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl border border-gray-200 border-dashed p-12 text-center">
              <FileBarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Nội dung đang được cập nhật</h2>
              <p className="text-gray-500">
                Các báo cáo định kỳ mới nhất sẽ sớm được cập nhật tại đây. Vui lòng quay lại sau!
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PeriodicReportPage;
