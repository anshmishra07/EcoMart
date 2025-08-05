import React, { useState } from 'react';
import { Search, Filter, Camera, Star, Shield, Package, Recycle } from 'lucide-react';
import { CircularProduct } from '../types';
import SearchComponent from '../components/SearchComponent';

const CircularMarketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [showSellModal, setShowSellModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);

  const mockCircularProducts: CircularProduct[] = [
    {
      id: 'cp1',
      originalProduct: {
        id: '1',
        name: 'iPhone 13 Pro',
        description: 'Excellent condition iPhone with original box',
        price: 699,
        image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'electronics',
        sustainabilityScore: 85,
        carbonSaved: 15.2,
        rating: 4.8,
        reviews: 156,
        ecoFeatures: ['Refurbished', 'Certified'],
        materials: ['Aluminum', 'Glass'],
        certifications: ['Apple Certified'],
        lcaData: { production: 2.1, transportation: 0.8, usage: 0.1, disposal: 0.2 }
      },
      condition: 'excellent',
      conditionScore: 95,
      price: 699,
      seller: 'TechRecycle Pro',
      images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500'],
      description: 'Like-new iPhone 13 Pro with minimal wear. All functions tested and verified.',
      certifiedCondition: true,
      returnPolicy: '30-day return guarantee',
      warranty: '6 months seller warranty'
    },
    {
      id: 'cp2',
      originalProduct: {
        id: '2',
        name: 'MacBook Air M1',
        description: 'Refurbished MacBook Air with new battery',
        price: 849,
        image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'electronics',
        sustainabilityScore: 82,
        carbonSaved: 28.5,
        rating: 4.7,
        reviews: 89,
        ecoFeatures: ['Refurbished', 'Energy Efficient'],
        materials: ['Aluminum', 'Glass'],
        certifications: ['Apple Certified Refurbished'],
        lcaData: { production: 2.1, transportation: 0.8, usage: 0.1, disposal: 0.2 }
      },
      condition: 'good',
      conditionScore: 88,
      price: 849,
      seller: 'GreenTech Solutions',
      images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500'],
      description: 'Fully refurbished MacBook Air with new battery and keyboard. Minor cosmetic wear.',
      certifiedCondition: true,
      returnPolicy: '14-day return',
      warranty: '1 year extended warranty'
    },
    {
      id: 'cp3',
      originalProduct: {
        id: '3',
        name: 'Eco Yoga Mat',
        description: 'Non-slip, biodegradable yoga mat',
        price: 35,
        image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'sports',
        sustainabilityScore: 90,
        carbonSaved: 2.5,
        rating: 4.9,
        reviews: 42,
        ecoFeatures: ['Biodegradable', 'Non-toxic'],
        materials: ['Natural Rubber'],
        certifications: ['EcoCert'],
        lcaData: { production: 0.5, transportation: 0.2, usage: 0.05, disposal: 0.1 }
      },
      condition: 'excellent',
      conditionScore: 97,
      price: 35,
      seller: 'EcoSports',
      images: ['https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=500'],
      description: 'Like-new eco yoga mat, barely used. 100% biodegradable.',
      certifiedCondition: true,
      returnPolicy: '7-day return',
      warranty: '3 months seller warranty'
    },
    {
      id: 'cp4',
      originalProduct: {
        id: '4',
        name: 'Organic Cotton Hoodie',
        description: 'Soft, organic cotton hoodie in great condition',
        price: 28,
        image: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'clothing',
        sustainabilityScore: 88,
        carbonSaved: 1.8,
        rating: 4.6,
        reviews: 31,
        ecoFeatures: ['Organic', 'Fair Trade'],
        materials: ['Cotton'],
        certifications: ['GOTS'],
        lcaData: { production: 0.4, transportation: 0.1, usage: 0.02, disposal: 0.05 }
      },
      condition: 'good',
      conditionScore: 85,
      price: 28,
      seller: 'GreenThreads',
      images: ['https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=500'],
      description: 'Gently used organic cotton hoodie. No stains or tears.',
      certifiedCondition: false,
      returnPolicy: '14-day return',
      warranty: 'No warranty'
    },
    {
      id: 'cp5',
      originalProduct: {
        id: '5',
        name: 'Recycled Glass Vase',
        description: 'Handmade vase from 100% recycled glass',
        price: 15,
        image: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'home',
        sustainabilityScore: 92,
        carbonSaved: 0.8,
        rating: 4.7,
        reviews: 19,
        ecoFeatures: ['Recycled'],
        materials: ['Glass'],
        certifications: ['Recycled Mark'],
        lcaData: { production: 0.2, transportation: 0.05, usage: 0.01, disposal: 0.02 }
      },
      condition: 'excellent',
      conditionScore: 99,
      price: 15,
      seller: 'HomeEco',
      images: ['https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=500'],
      description: 'Beautiful recycled glass vase, handmade and unique.',
      certifiedCondition: true,
      returnPolicy: 'No returns',
      warranty: 'No warranty'
    }
  ];

  const filteredProducts = mockCircularProducts.filter(product => {
    const matchesSearch = product.originalProduct.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.originalProduct.category === selectedCategory;
    const matchesCondition = selectedCondition === 'all' || product.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const categories = ['all', 'electronics', 'clothing', 'home', 'books', 'sports'];
  const conditions = ['all', 'excellent', 'good', 'fair'];

  return (
    <div className="min-h-screen px-4 pt-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Circular Marketplace</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Buy, sell, or donate pre-loved products and help close the loop for a sustainable future.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => setShowSellModal(true)} className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition">Sell an Item</button>
            <button onClick={() => setShowDonateModal(true)} className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-green-700 transition">Donate an Item</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Recycle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">15,420</div>
            <div className="text-gray-600 text-sm">Items Resold</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">8,230</div>
            <div className="text-gray-600 text-sm">kg CO₂ Saved</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">98.5%</div>
            <div className="text-gray-600 text-sm">Satisfaction Rate</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">4.8</div>
            <div className="text-gray-600 text-sm">Average Rating</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {conditions.map(condition => (
                <option key={condition} value={condition}>
                  {condition.charAt(0).toUpperCase() + condition.slice(1)}
                </option>
              ))}
            </select>

            <div className="flex items-center justify-center">
              <SearchComponent />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative">
                <img
                  src={product.originalProduct.image}
                  alt={product.originalProduct.name}
                  className="w-full h-48 object-cover"
                />
                
                <div className="absolute top-3 left-3 flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.condition === 'excellent' ? 'bg-green-100 text-green-800' :
                    product.condition === 'good' ? 'bg-blue-100 text-blue-800' :
                    product.condition === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                  </span>
                  
                  {product.certifiedCondition && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                      Certified
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold">
                  {product.conditionScore}%
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.originalProduct.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl font-bold text-gray-800">
                    ${product.price}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.originalProduct.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Seller:</span>
                    <span className="font-semibold">{product.seller}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Carbon Saved:</span>
                    <span className="font-semibold text-green-600">
                      {product.originalProduct.carbonSaved}kg CO₂
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    Buy Now
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Condition Management Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">AI Condition Management</h2>
          <p className="text-gray-600 mb-6">Our AI analyzes item images and descriptions to assess product condition, authenticity, and eco-friendliness. Upload an item or select from the marketplace to see a simulated AI condition report.</p>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <label className="block font-semibold mb-2">Upload Item Image</label>
              <input type="file" className="mb-4" />
              <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition">Simulate AI Condition Check</button>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center">
              <h3 className="font-semibold text-lg mb-2">AI Condition Report</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><span className="font-bold text-green-600">Condition:</span> Excellent</li>
                <li><span className="font-bold text-blue-600">Authenticity:</span> Verified</li>
                <li><span className="font-bold text-purple-600">Eco-Friendliness:</span> High</li>
                <li><span className="font-bold text-yellow-600">Estimated Resale Value:</span> $120</li>
              </ul>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Recycle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => setShowSellModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              List Your First Item
            </button>
          </div>
        )}

        {/* Sell Modal */}
        {showSellModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Sell Your Item</h3>
              <p className="text-gray-600 mb-6">
                Use AI-powered condition assessment to get the best price for your item.
              </p>
              
              <div className="space-y-4">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Take Photos</span>
                </button>
                
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  AI Condition Assessment
                </button>
                
                <button className="w-full px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Manual Entry
                </button>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowSellModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Donate Modal */}
        {showDonateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Donate Your Item</h3>
              <p className="text-gray-600 mb-6">
                Let's help reduce waste and make a difference.
              </p>
              
              <div className="space-y-4">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Take Photos</span>
                </button>
                
                <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  AI Condition Assessment
                </button>
                
                <button className="w-full px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Manual Entry
                </button>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowDonateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularMarketplace;