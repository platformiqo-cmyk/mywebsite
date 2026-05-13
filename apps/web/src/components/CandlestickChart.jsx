
import React from 'react';

const CandlestickChart = () => {
  // Mock OHLC data
  const data = [
    { o: 100, h: 105, l: 95, c: 102 },
    { o: 102, h: 108, l: 100, c: 106 },
    { o: 106, h: 107, l: 98, c: 99 },
    { o: 99, h: 104, l: 97, c: 103 },
    { o: 103, h: 110, l: 101, c: 108 },
    { o: 108, h: 112, l: 105, c: 106 },
    { o: 106, h: 109, l: 102, c: 104 },
    { o: 104, h: 108, l: 100, c: 107 },
    { o: 107, h: 115, l: 106, c: 114 },
    { o: 114, h: 116, l: 110, c: 112 },
    { o: 112, h: 118, l: 111, c: 117 },
    { o: 117, h: 120, l: 115, c: 119 },
  ];

  const width = 800;
  const height = 300;
  const padding = 40;
  
  const minL = Math.min(...data.map(d => d.l));
  const maxH = Math.max(...data.map(d => d.h));
  
  const scaleY = (val) => height - padding - ((val - minL) / (maxH - minL)) * (height - 2 * padding);
  const scaleX = (index) => padding + (index * ((width - 2 * padding) / (data.length - 1)));

  return (
    <div className="w-full overflow-x-auto bg-[#111827] rounded-2xl border border-gray-800 p-4 my-8">
      <div className="min-w-[600px]">
        <div className="flex justify-between items-center mb-4 px-4">
          <h4 className="text-white font-semibold">Biểu đồ giá (Minh họa)</h4>
          <div className="flex space-x-2 text-xs">
            <span className="text-emerald-500 flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></span> Tăng</span>
            <span className="text-red-500 flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span> Giảm</span>
          </div>
        </div>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="text-gray-400">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
            const y = padding + tick * (height - 2 * padding);
            const val = maxH - tick * (maxH - minL);
            return (
              <g key={`grid-${i}`}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#1F2937" strokeWidth="1" strokeDasharray="4 4" />
                <text x={padding - 10} y={y + 4} fill="#6B7280" fontSize="10" textAnchor="end">{val.toFixed(1)}</text>
              </g>
            );
          })}

          {/* Candlesticks */}
          {data.map((d, i) => {
            const x = scaleX(i);
            const yHigh = scaleY(d.h);
            const yLow = scaleY(d.l);
            const yOpen = scaleY(d.o);
            const yClose = scaleY(d.c);
            
            const isUp = d.c >= d.o;
            const color = isUp ? "#10B981" : "#EF4444";
            
            const rectY = Math.min(yOpen, yClose);
            const rectHeight = Math.max(Math.abs(yOpen - yClose), 1); // Ensure at least 1px height

            return (
              <g key={`candle-${i}`}>
                {/* Wick */}
                <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="2" />
                {/* Body */}
                <rect 
                  x={x - 6} 
                  y={rectY} 
                  width="12" 
                  height={rectHeight} 
                  fill={color} 
                  rx="1"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default CandlestickChart;
