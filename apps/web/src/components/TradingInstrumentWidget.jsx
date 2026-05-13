
import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const TradingInstrumentWidget = ({ instrument = "USD/CAD", price = "1.3542", change = "+0.24%", isPositive = true }) => {
  // Mock sparkline data
  const sparklinePoints = isPositive 
    ? "0,20 10,18 20,22 30,15 40,10 50,12 60,5" 
    : "0,5 10,8 20,4 30,12 40,18 50,15 60,20";
  
  const strokeColor = isPositive ? "#10B981" : "#EF4444";

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <Activity className="w-4 h-4 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-white">{instrument}</h3>
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded-md">CFD</span>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-extrabold text-white mb-1">{price}</div>
        <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>

      <div className="h-16 w-full mb-6 opacity-80">
        <svg viewBox="0 0 60 25" className="w-full h-full preserve-3d">
          <polyline
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            points={sparklinePoints}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
        Mở tài khoản giao dịch
      </Button>
      
      <p className="text-center text-xs text-gray-500 mt-4">
        78% tài khoản nhà đầu tư bán lẻ bị mất tiền khi giao dịch CFD với nhà cung cấp này.
      </p>
    </div>
  );
};

export default TradingInstrumentWidget;
