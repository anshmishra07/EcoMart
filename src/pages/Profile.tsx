import React, { useState } from 'react';
import { User, Settings, Award, Leaf, TrendingUp, Gift, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Modal state for viewing receipt details
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Provide mock user if not authenticated
  const mockUser = {
    name: 'Eco Warrior',
    email: 'eco@example.com',
    ecoScore: 85,
    totalCarbonSaved: 127.5,
    rewardPoints: 2350,
  };
  const displayUser = user || mockUser;

  // Mock data for carbon footprint comparison (over time)
  const userCarbonData = [60, 80, 100, 110, 127.5]; // kg CO2 saved over months
  const internationalAvgData = [50, 60, 70, 75, 80]; // kg CO2 saved over months
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const userLatest = userCarbonData[userCarbonData.length - 1];
  const internationalLatest = internationalAvgData[internationalAvgData.length - 1];
  const isAboveAvg = userLatest >= internationalLatest;

  return (
    <div className="min-h-screen px-4 pt-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{displayUser.name}</h1>
              <p className="text-gray-600 mb-4">{displayUser.email}</p>
              
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{displayUser.ecoScore}</div>
                  <div className="text-sm text-gray-600">Eco Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{displayUser.totalCarbonSaved}</div>
                  <div className="text-sm text-gray-600">kg CO₂ Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{displayUser.rewardPoints}</div>
                  <div className="text-sm text-gray-600">Reward Points</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-8">
          <div className="flex space-x-1 p-1">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'rewards', label: 'Rewards', icon: Gift },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800">Account Overview</h2>
              
              {/* Carbon Footprint Comparison Line Graph (now at the top) */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-12 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Your Carbon Footprint vs. International Average</h2>
                <svg viewBox="0 0 320 120" width="100%" height="120" className="mb-4">
                  {/* X axis labels */}
                  {months.map((month, i) => (
                    <text key={month} x={20 + i * 60} y={115} fontSize="12" textAnchor="middle" fill="#888">{month}</text>
                  ))}
                  {/* User line */}
                  <polyline
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    points={userCarbonData.map((v, i) => `${20 + i * 60},${100 - (v / 140) * 90}`).join(' ')}
                  />
                  {/* International average line */}
                  <polyline
                    fill="none"
                    stroke="#a3a3a3"
                    strokeDasharray="4 2"
                    strokeWidth="3"
                    points={internationalAvgData.map((v, i) => `${20 + i * 60},${100 - (v / 140) * 90}`).join(' ')}
                  />
                  {/* User dots */}
                  {userCarbonData.map((v, i) => (
                    <circle key={i} cx={20 + i * 60} cy={100 - (v / 140) * 90} r="4" fill="#22c55e" />
                  ))}
                  {/* International dots */}
                  {internationalAvgData.map((v, i) => (
                    <circle key={i} cx={20 + i * 60} cy={100 - (v / 140) * 90} r="4" fill="#a3a3a3" />
                  ))}
                </svg>
                <div className="flex justify-between mb-2">
                  <span className="flex items-center"><span className="w-4 h-2 bg-green-400 inline-block mr-2 rounded"></span> You</span>
                  <span className="flex items-center"><span className="w-4 h-2 bg-gray-400 inline-block mr-2 rounded"></span> International Avg</span>
                </div>
                <div className={`text-lg font-bold ${isAboveAvg ? 'text-green-600' : 'text-red-600'}`}>{isAboveAvg ? 'Well done! Your carbon savings are above the international average.' : 'Keep going! You can beat the international average with more sustainable choices.'}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Environmental Impact
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total CO₂ Saved</span>
                      <span className="font-bold text-green-600">{displayUser.totalCarbonSaved}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Eco Score</span>
                      <span className="font-bold text-blue-600">{displayUser.ecoScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sustainable Purchases</span>
                      <span className="font-bold text-purple-600">47</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Rewards & Points
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Points</span>
                      <span className="font-bold text-purple-600">{displayUser.rewardPoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lifetime Earned</span>
                      <span className="font-bold text-pink-600">5,280</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Redeemed</span>
                      <span className="font-bold text-blue-600">2,930</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Purchased Eco-Friendly Bamboo Phone Case</p>
                      <p className="text-sm text-gray-600">Saved 3.2kg CO₂ • Earned 32 points</p>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Achieved "Green Shopper" badge</p>
                      <p className="text-sm text-gray-600">Purchased 50 eco-friendly products</p>
                    </div>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                </div>
              </div>

              {/* Feedback & Rewards Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {/* Post-Purchase Feedback */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold mb-2">Post-Purchase Feedback</h3>
                  <p className="text-gray-500 mb-4">Earn reward points by sharing your experience with recent purchases. Your feedback helps us improve and develop more sustainable products.</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <img src="https://via.placeholder.com/32" alt="Product" className="w-8 h-8 rounded mr-2" />
                      <div>
                        <div className="font-semibold">Organic Cotton T-Shirt</div>
                        <div className="text-xs text-gray-400">Purchased on June 12, 2023</div>
                      </div>
                    </div>
                    <div className="mb-2">How would you rate this product?</div>
                    <div className="flex space-x-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <span key={star} className="text-2xl text-gray-300 cursor-pointer">★</span>
                      ))}
                    </div>
                    <textarea className="w-full border rounded p-2 mb-2" placeholder="Your feedback (optional)" rows={2}></textarea>
                    <div className="flex items-center mb-2">
                      <input type="checkbox" id="sustainability" className="mr-2" />
                      <label htmlFor="sustainability" className="text-sm text-gray-600">Include sustainability feedback (earns +10 bonus points)</label>
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition">Submit & Earn 25 Points</button>
                  </div>
                </div>
                {/* Reward Balance */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold mb-2">Your Reward Balance</h3>
                  <p className="text-gray-500 mb-4">Redeem your points for exclusive discounts, cashback, or donate to environmental causes.</p>
                  <div className="mb-4">
                    <div className="text-3xl font-bold">1,850</div>
                    <div className="text-sm text-gray-400">TOTAL POINTS</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-100 rounded p-2 text-center">
                      <div className="font-semibold">$5 Cashback</div>
                      <div className="text-xs text-gray-500">500 points</div>
                    </div>
                    <div className="bg-gray-100 rounded p-2 text-center">
                      <div className="font-semibold">10% Off</div>
                      <div className="text-xs text-gray-500">750 points</div>
                    </div>
                    <div className="bg-gray-100 rounded p-2 text-center">
                      <div className="font-semibold">Plant a Tree</div>
                      <div className="text-xs text-gray-500">250 points</div>
                    </div>
                    <div className="bg-gray-100 rounded p-2 text-center">
                      <div className="font-semibold">$10 Donation</div>
                      <div className="text-xs text-gray-500">1,000 points</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">RECENT ACTIVITY</div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Product review</span>
                      <span className="text-green-600 font-bold">+25</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Eco purchase bonus</span>
                      <span className="text-green-600 font-bold">+50</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Donation</span>
                      <span className="text-red-500 font-bold">-250</span>
                    </div>
                  </div>
                </div>
              </div>

            {/* NFT Digital Receipts Section (redesigned invoices) */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* How NFT Receipts Work */}
              <div>
                <h2 className="text-2xl font-bold mb-4">How NFT Receipts Work</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 text-xl">🛒</span>
                    <div>
                      <div className="font-semibold">1. Make a Purchase</div>
                      <div className="text-gray-500 text-sm">Shop as usual on our platform</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 text-xl">🪙</span>
                    <div>
                      <div className="font-semibold">2. NFT Generation</div>
                      <div className="text-gray-500 text-sm">Smart contract creates a unique NFT receipt</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xl">🗄️</span>
                    <div>
                      <div className="font-semibold">3. Secure Storage</div>
                      <div className="text-gray-500 text-sm">NFT is stored in your digital wallet</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 text-xl">🛡️</span>
                    <div>
                      <div className="font-semibold">4. Lifetime Access</div>
                      <div className="text-gray-500 text-sm">Access receipt anytime for returns, warranties, or proof of purchase</div>
                    </div>
                  </li>
                </ul>
                <button className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition">Learn More About NFT Receipts</button>
              </div>
              {/* Your NFT Receipt Wallet */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Your NFT Receipt Wallet</h2>
                <p className="text-gray-500 mb-4">View and manage your digital purchase receipts</p>
                <div className="space-y-4">
                  {[
                    {
                      id: '1',
                      date: 'June 15, 2023',
                      items: 3,
                      order: '',
                      wallet: 'polygon:0x8d12a197cb00d...7c5a6759',
                      status: 'VERIFIED',
                      details: 'Mock details for receipt 1: 3 items, total $29.99, NFT hash: 0x8d12a197cb00d...7c5a6759',
                    },
                    {
                      id: '2',
                      date: 'May 28, 2023',
                      items: 5,
                      order: 'Order #SPK-2023-04891',
                      wallet: 'polygon:0x7f5b1a22d4e...8c3b9a7',
                      status: 'VERIFIED',
                      details: 'Mock details for receipt 2: 5 items, total $54.99, NFT hash: 0x7f5b1a22d4e...8c3b9a7',
                    },
                    {
                      id: '3',
                      date: 'April 12, 2023',
                      items: 2,
                      order: 'Order #SPK-2023-03921',
                      wallet: 'polygon:0x3a9f3d1b2c...5d6e7f8',
                      status: 'VERIFIED',
                      details: 'Mock details for receipt 3: 2 items, total $12.99, NFT hash: 0x3a9f3d1b2c...5d6e7f8',
                    },
                  ].map((receipt) => (
                    <div key={receipt.id} className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg text-indigo-500">📄</span>
                          <span className="font-semibold">{receipt.order || `${receipt.date} • ${receipt.items} items`}</span>
                        </div>
                        <div className="text-xs text-gray-400 mb-1">
                          <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
                            {receipt.wallet}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 text-xs underline" onClick={() => { setSelectedReceipt(receipt); setModalOpen(true); }}>View Details</button>
                          <span className="text-green-600 text-xs font-bold">{receipt.status}</span>
                        </div>
                      </div>
                      <button className="ml-0 md:ml-4 mt-2 md:mt-0 text-gray-400 hover:text-gray-600 flex items-center text-xs"><span className="mr-1">Share</span>🔗</button>
                    </div>
                  ))}
                </div>
                {/* Modal for receipt details */}
                {modalOpen && selectedReceipt && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
                      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl" onClick={() => setModalOpen(false)}>&times;</button>
                      <h3 className="text-xl font-bold mb-2">Receipt Details</h3>
                      <div className="mb-2 font-semibold">{selectedReceipt.order || `${selectedReceipt.date} • ${selectedReceipt.items} items`}</div>
                      <div className="mb-2 text-xs text-gray-500">{selectedReceipt.wallet}</div>
                      <div className="mb-4 text-gray-700">{selectedReceipt.details}</div>
                      <button className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition" onClick={() => setModalOpen(false)}>Close</button>
                    </div>
                  </div>
                )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Eco Warrior', description: 'Saved 100kg CO₂', completed: true, color: 'green' },
                  { title: 'Green Shopper', description: 'Bought 50 eco products', completed: true, color: 'blue' },
                  { title: 'Sustainability Champion', description: 'Maintained 80+ eco score', completed: true, color: 'purple' },
                  { title: 'Carbon Neutral', description: 'Offset 500kg CO₂', completed: false, color: 'gray' },
                  { title: 'Circular Economy Hero', description: 'Resold 10 items', completed: false, color: 'gray' },
                  { title: 'Review Master', description: 'Left 25 product reviews', completed: false, color: 'gray' }
                ].map((achievement, index) => (
                  <div key={index} className={`p-6 rounded-xl border-2 ${
                    achievement.completed 
                      ? `bg-${achievement.color}-50 border-${achievement.color}-200` 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.completed 
                          ? `bg-${achievement.color}-100` 
                          : 'bg-gray-100'
                      }`}>
                        <Award className={`w-6 h-6 ${
                          achievement.completed 
                            ? `text-${achievement.color}-600` 
                            : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Rewards Center</h2>
              
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Available Points: {displayUser.rewardPoints}
                </h3>
                <p className="text-gray-600">
                  Redeem your points for discounts, exclusive products, or charitable donations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: '$5 Off Next Purchase', cost: 500, description: 'Minimum order $25' },
                  { title: '$10 Off Next Purchase', cost: 1000, description: 'Minimum order $50' },
                  { title: 'Free Shipping', cost: 200, description: 'Valid for 30 days' },
                  { title: 'Exclusive Eco Product', cost: 2000, description: 'Limited edition bamboo mug' },
                  { title: 'Tree Planting Donation', cost: 300, description: 'Plant 1 tree in your name' },
                  { title: 'Ocean Cleanup Donation', cost: 500, description: 'Remove 1kg plastic from ocean' }
                ].map((reward, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 mb-2">{reward.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-purple-600">{reward.cost} points</span>
                      <button
                        disabled={displayUser.rewardPoints < reward.cost}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          displayUser.rewardPoints >= reward.cost
                            ? 'bg-purple-500 text-white hover:bg-purple-600'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Redeem
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Sustainability Preferences
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sustainability Priority
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="high">High - Only show eco-friendly products</option>
                        <option value="medium">Medium - Prefer eco-friendly products</option>
                        <option value="low">Low - Show all products</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <div className="flex space-x-4">
                        <input
                          type="number"
                          placeholder="Min"
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Biometric Authentication
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Your behavioral biometrics are securely stored and processed locally.
                    </p>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Re-train Pattern
                      </button>
                      <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        View Security Log
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      'New eco-friendly product recommendations',
                      'Sustainability goal reminders',
                      'Reward point updates',
                      'Environmental impact reports'
                    ].map((notification, index) => (
                      <label key={index} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{notification}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;