import React from 'react';
import { Leaf, Recycle, Lightbulb, Zap, TrendingUp, BarChart2, ShoppingBag, Globe, Droplet, Package, ArrowRight } from 'lucide-react';
// If recharts or chart.js is available, import here. Otherwise, render placeholder divs for charts.

const tips = [
  {
    icon: <Leaf className="w-7 h-7 text-green-500" />, title: 'Buy in Bulk', desc: 'Reduces packaging waste and saves money.'
  },
  {
    icon: <Recycle className="w-7 h-7 text-blue-500" />, title: 'Choose Recycled', desc: 'Opt for recycled or upcycled products.'
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-yellow-400" />, title: 'Switch to LEDs', desc: 'LED bulbs use 80% less energy.'
  },
  {
    icon: <Zap className="w-7 h-7 text-purple-500" />, title: 'Unplug Devices', desc: 'Save energy by unplugging unused electronics.'
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-pink-500" />, title: 'Track Your Impact', desc: 'Monitor your carbon footprint regularly.'
  },
];

const habits = [
  'Bring reusable bags when shopping',
  'Use a refillable water bottle',
  'Compost food scraps',
  'Bike or walk for short trips',
  'Support local and seasonal produce',
  'Repair instead of replace',
  'Reduce single-use plastics',
];

const stats = [
  { icon: <ShoppingBag className="w-8 h-8 text-blue-600" />, label: 'Secondhand Purchases', value: '68% less CO₂', desc: 'Buying pre-owned saves up to 68% carbon emissions vs. new.' },
  { icon: <Package className="w-8 h-8 text-green-600" />, label: 'Bulk Buying', value: '30% less waste', desc: 'Bulk shopping reduces packaging waste by 30%.' },
  { icon: <Droplet className="w-8 h-8 text-cyan-500" />, label: 'Organic Choices', value: '21% less water', desc: 'Organic products use 21% less water on average.' },
  { icon: <Globe className="w-8 h-8 text-purple-600" />, label: 'Local Shopping', value: '2x less transport', desc: 'Local goods cut transport emissions by half.' },
];

const shoppingSteps = [
  { icon: <BarChart2 className="w-6 h-6 text-blue-500" />, title: 'Filter by Eco Score', desc: 'Sort and filter products by their sustainability rating.' },
  { icon: <Recycle className="w-6 h-6 text-green-600" />, title: 'Buy Secondhand', desc: 'Choose pre-owned or refurbished items in the Circular Market Place.' },
  { icon: <Package className="w-6 h-6 text-yellow-600" />, title: 'Bundle Orders', desc: 'Combine purchases to reduce shipping emissions.' },
  { icon: <Lightbulb className="w-6 h-6 text-purple-500" />, title: 'Digital Receipts', desc: 'Opt for NFT digital receipts to save paper.' },
];

const impactExample = [
  { action: 'Buy 1 used phone', carbon: '-55 kg CO₂', waste: '-40 kg e-waste', water: '-13,000 L' },
  { action: 'Switch to bulk groceries', carbon: '-12 kg CO₂', waste: '-8 kg packaging', water: '-1,200 L' },
  { action: 'Choose organic cotton shirt', carbon: '-3 kg CO₂', waste: '-0.5 kg', water: '-2,700 L' },
];

const chartData = [
  { name: 'Jan', carbon: 12, waste: 4, water: 30 },
  { name: 'Feb', carbon: 10, waste: 3, water: 28 },
  { name: 'Mar', carbon: 8, waste: 2, water: 25 },
  { name: 'Apr', carbon: 7, waste: 2, water: 22 },
  { name: 'May', carbon: 6, waste: 1, water: 20 },
];

const SustainabilityTips: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-green-700">Sustainability Tips & Insights</h1>
        <p className="text-center text-lg text-gray-600 mb-10">Actionable ways to live greener, save money, and help the planet. Explore tips, habits, and your impact over time!</p>

        {/* Stat Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/90 rounded-2xl shadow-lg p-6 flex items-center gap-4 border border-white/60">
              <div>{stat.icon}</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{stat.label}</h3>
                <div className="text-2xl font-bold text-blue-700 mb-1">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Step-by-Step Guide */}
        <div className="bg-white/80 rounded-2xl shadow p-6 mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-3">How to Shop Sustainably</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {shoppingSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div>{step.icon}</div>
                <div>
                  <h4 className="font-bold text-base text-gray-800 mb-1">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Calculator Example */}
        <div className="bg-white/80 rounded-2xl shadow p-6 mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Sustainable Shopping Impact Examples</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-2 px-4 font-semibold text-gray-700">Action</th>
                  <th className="py-2 px-4 font-semibold text-green-700">CO₂ Saved</th>
                  <th className="py-2 px-4 font-semibold text-purple-700">Waste Reduced</th>
                  <th className="py-2 px-4 font-semibold text-cyan-700">Water Saved</th>
                </tr>
              </thead>
              <tbody>
                {impactExample.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="py-2 px-4">{row.action}</td>
                    <td className="py-2 px-4">{row.carbon}</td>
                    <td className="py-2 px-4">{row.waste}</td>
                    <td className="py-2 px-4">{row.water}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {tips.map((tip, i) => (
            <div key={i} className="bg-white/90 rounded-2xl shadow-lg p-6 flex items-center gap-4 border border-white/60">
              <div>{tip.icon}</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Habits List */}
        <div className="bg-white/80 rounded-2xl shadow p-6 mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Eco-Friendly Habits</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {habits.map((habit, i) => (
              <li key={i}>{habit}</li>
            ))}
          </ul>
        </div>

        {/* Charts Section */}
        <div className="bg-white/80 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">Your Impact Over Time</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {/* Carbon Saved Graph */}
            <div className="w-full md:w-1/2 h-56 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
              <svg width="100%" height="180" viewBox="0 0 320 180">
                {/* X axis labels */}
                {chartData.map((d, i) => (
                  <text key={d.name} x={40 + i * 60} y={170} fontSize="13" textAnchor="middle" fill="#888">{d.name}</text>
                ))}
                {/* Y axis labels */}
                {[0, 5, 10, 15].map((v) => (
                  <text key={v} x={20} y={160 - (v / 15) * 120} fontSize="12" fill="#bbb">{v}</text>
                ))}
                {/* Carbon Saved Line */}
                <polyline
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  points={chartData.map((d, i) => `${40 + i * 60},${160 - (d.carbon / 15) * 120}`).join(' ')}
                />
                {/* Dots */}
                {chartData.map((d, i) => (
                  <circle key={i} cx={40 + i * 60} cy={160 - (d.carbon / 15) * 120} r="5" fill="#22c55e" />
                ))}
                {/* Title */}
                <text x="160" y="30" textAnchor="middle" fontSize="16" fill="#22c55e" fontWeight="bold">Carbon Saved (kg)</text>
              </svg>
            </div>
            {/* Waste Reduced Graph */}
            <div className="w-full md:w-1/2 h-56 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              <svg width="100%" height="180" viewBox="0 0 320 180">
                {/* X axis labels */}
                {chartData.map((d, i) => (
                  <text key={d.name} x={40 + i * 60} y={170} fontSize="13" textAnchor="middle" fill="#888">{d.name}</text>
                ))}
                {/* Y axis labels */}
                {[0, 1, 2, 3, 4].map((v) => (
                  <text key={v} x={20} y={160 - (v / 4) * 120} fontSize="12" fill="#bbb">{v}</text>
                ))}
                {/* Waste Reduced Line */}
                <polyline
                  fill="none"
                  stroke="#a21caf"
                  strokeWidth="3"
                  points={chartData.map((d, i) => `${40 + i * 60},${160 - (d.waste / 4) * 120}`).join(' ')}
                />
                {/* Dots */}
                {chartData.map((d, i) => (
                  <circle key={i} cx={40 + i * 60} cy={160 - (d.waste / 4) * 120} r="5" fill="#a21caf" />
                ))}
                {/* Title */}
                <text x="160" y="30" textAnchor="middle" fontSize="16" fill="#a21caf" fontWeight="bold">Waste Reduced (kg)</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityTips; 