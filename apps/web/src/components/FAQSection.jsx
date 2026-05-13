
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is commodity trading?',
      answer: 'Commodity trading involves buying and selling physical goods such as gold, oil, natural gas, and agricultural products. Traders speculate on the future price movements of these assets without necessarily taking physical delivery, often using derivative contracts like futures and options.'
    },
    {
      question: 'How do I start trading commodities?',
      answer: 'To start trading commodities, you need to open an account with a regulated broker that offers access to commodity markets. Once your account is funded, you should educate yourself on market fundamentals, choose a trading platform, and develop a solid trading strategy before executing your first trade.'
    },
    {
      question: 'What are the main risks?',
      answer: 'The main risks in commodity trading include high market volatility, leverage risk (which can amplify both gains and losses), geopolitical events affecting supply and demand, and liquidity risks in certain less-traded markets. Proper risk management is essential.'
    },
    {
      question: 'What is leverage in commodity trading?',
      answer: 'Leverage allows traders to control a large position with a relatively small amount of capital. For example, with 10:1 leverage, you can control $10,000 worth of a commodity with just $1,000. While this can magnify profits, it equally magnifies potential losses.'
    },
    {
      question: 'How much capital do I need?',
      answer: 'The required capital varies depending on your broker and the specific commodities you wish to trade. While some brokers allow you to start with as little as $100 using micro-lots or CFDs, a larger capital base (e.g., $1,000 - $5,000) provides more flexibility for risk management and diversification.'
    },
    {
      question: 'What are the best commodities to trade?',
      answer: 'The "best" commodities depend on your trading style and market knowledge. Highly liquid commodities like Crude Oil (WTI/Brent), Gold, Silver, and Natural Gas are popular among day traders due to their tight spreads and clear price trends. Agricultural products like Wheat and Corn are also widely traded.'
    },
    {
      question: 'How do I manage risk?',
      answer: 'Effective risk management involves using stop-loss orders to limit potential losses, sizing your positions appropriately (never risking more than 1-2% of your account on a single trade), diversifying your portfolio, and avoiding over-leveraging. Staying informed about market news is also crucial.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 lg:px-0">
        <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mt-12 md:mt-16 mb-8 md:mb-10 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="flex flex-col border-t border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-4 md:py-5 text-left hover:bg-gray-50 transition-colors duration-300 focus:outline-none group"
                >
                  <span className="text-[16px] md:text-[18px] font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed py-4 md:py-5 pt-0">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
