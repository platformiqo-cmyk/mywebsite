
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const RiskDisclaimerSection = () => {
  return (
    <div className="bg-[#F3F4F6] border border-gray-200 rounded-lg p-5 my-8 flex flex-col sm:flex-row items-start gap-4">
      <div className="flex-shrink-0 mt-1">
        <AlertTriangle className="w-6 h-6 text-gray-500" />
      </div>
      <div>
        <h4 className="text-base font-bold text-gray-800 mb-2">Cảnh báo rủi ro</h4>
        <p className="text-sm text-gray-500 leading-relaxed">
          Nội dung tài liệu này chỉ được cung cấp mang tính thông tin chung và không được xem là tư vấn đầu tư hoặc khuyến nghị. XTC sẽ không chịu trách nhiệm đối với bất kỳ tổn thất hoặc thiệt hại nào, bao gồm nhưng không giới hạn, bất kỳ tổn thất lợi nhuận nào, có thể phát sinh trực tiếp hoặc gián tiếp từ việc sử dụng hoặc phụ thuộc vào thông tin đó. Tất cả các quyết định giao dịch phải luôn dựa trên phán quyết độc lập của bạn.
        </p>
      </div>
    </div>
  );
};

export default RiskDisclaimerSection;
