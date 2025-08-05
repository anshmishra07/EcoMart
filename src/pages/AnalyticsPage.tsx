import React from 'react';

const AnalyticsPage: React.FC = () => (
  <div className="min-h-screen px-4 pt-20 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50">
    <h1 className="text-3xl font-bold mb-6">Analytics</h1>
    <div className="w-full max-w-2xl space-y-8">
      <div className="bg-white/80 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Eco Score Trend</h2>
        <div className="w-full h-32 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg flex items-end">
          <div className="bg-green-500 h-16 w-1/6 mx-1 rounded-t"></div>
          <div className="bg-green-400 h-20 w-1/6 mx-1 rounded-t"></div>
          <div className="bg-blue-400 h-24 w-1/6 mx-1 rounded-t"></div>
          <div className="bg-blue-500 h-28 w-1/6 mx-1 rounded-t"></div>
          <div className="bg-purple-400 h-24 w-1/6 mx-1 rounded-t"></div>
          <div className="bg-purple-600 h-32 w-1/6 mx-1 rounded-t"></div>
        </div>
        <div className="text-xs text-gray-400 mt-2">Last 6 months</div>
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Total Carbon Saved</h2>
        <div className="text-4xl font-bold text-green-600 mb-1">128.5 kg CO₂</div>
        <div className="text-xs text-gray-400">Compared to average shopper: +35%</div>
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Purchase Impact</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Most sustainable category: Clothing</li>
          <li>Top eco product: Organic Cotton T-shirt</li>
          <li>Average eco score: 82/100</li>
        </ul>
      </div>
    </div>
  </div>
);

export default AnalyticsPage; 