import React from 'react';
import { Leaf, Award, TrendingUp, Sparkles } from 'lucide-react';

const StatsBoxes: React.FC = () => (
  <div className="w-full flex flex-col items-center py-12">
    <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* CO2 Saved */}
      <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center py-8 px-4">
        <Leaf className="w-8 h-8 text-green-500 mb-2" />
        <div className="text-3xl font-bold text-gray-900 mb-1">2.5M kg</div>
        <div className="text-gray-500 font-medium">CO 2 Saved</div>
      </div>
      {/* Eco Products */}
      <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center py-8 px-4">
        <Award className="w-8 h-8 text-blue-500 mb-2" />
        <div className="text-3xl font-bold text-gray-900 mb-1">10K+</div>
        <div className="text-gray-500 font-medium">Eco Products</div>
      </div>
      {/* Active Users */}
      <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center py-8 px-4">
        <TrendingUp className="w-8 h-8 text-purple-500 mb-2" />
        <div className="text-3xl font-bold text-gray-900 mb-1">250K+</div>
        <div className="text-gray-500 font-medium">Active Users</div>
      </div>
      {/* NFT Receipts */}
      <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center py-8 px-4">
        <Sparkles className="w-8 h-8 text-yellow-400 mb-2" />
        <div className="text-3xl font-bold text-gray-900 mb-1">1M+</div>
        <div className="text-gray-500 font-medium">NFT Receipts</div>
      </div>
    </div>
  </div>
);

export default StatsBoxes; 