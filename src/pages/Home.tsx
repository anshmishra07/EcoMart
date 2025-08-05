import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
// import SustainabilityRecommendations from '../components/SustainabilityRecommendations';
import { Product } from '../types';
import { mockProducts } from '../data/mockProducts';
import { Leaf, Sparkles, TrendingUp, Award, Recycle } from 'lucide-react';
// Remove SearchComponent import and usage from Home page
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import StatsBoxes from '../components/StatsBoxes';
import ChatBot from '../components/ChatBot';
import DashboardPage from './DashboardPage';

const RECOMMENDATIONS = [
  'Buy refurbished or certified pre-owned electronics to reduce e-waste.',
  'Choose organic cotton and fair-trade clothing for lower environmental impact.',
  'Prefer products with high eco scores and verified certifications.',
  'Bundle purchases to minimize shipping emissions.',
  'Use the circular marketplace to resell or recycle old items.',
];

// Add AnimatedWalmartStar component
const AnimatedWalmartStar: React.FC = () => (
  <svg
    className="w-12 h-12 animate-wiggle-star"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 2px 8px #facc15)' }}
  >
    <g>
      <circle cx="32" cy="32" r="28" fill="#fffbe6" />
      <g>
        <g className="origin-center animate-spin-slow">
          {/* 6-pointed Walmart star */}
          {[...Array(6)].map((_, i) => (
            <rect
              key={i}
              x="30"
              y="10"
              width="4"
              height="18"
              rx="2"
              fill="#facc15"
              transform={`rotate(${i * 60} 32 32)`}
            />
          ))}
        </g>
        <circle cx="32" cy="32" r="6" fill="#fde047" />
      </g>
    </g>
  </svg>
);

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('eco-score');
  const [showRec, setShowRec] = useState(true);
  const [recIndex, setRecIndex] = useState(0);
  const [recVisible, setRecVisible] = useState(true);
  const [searchBarQuery, setSearchBarQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    let filtered = products;
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'eco-score':
          return b.sustainabilityScore - a.sustainabilityScore;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Cycle recommendations with animation
  useEffect(() => {
    if (!showRec) return;
    const interval = setInterval(() => {
      setRecVisible(false);
      setTimeout(() => {
        setRecIndex(i => (i + 1) % RECOMMENDATIONS.length);
        setRecVisible(true);
      }, 400); // match transition duration
    }, 4000);
    return () => clearInterval(interval);
  }, [showRec]);

  const categories = ['all', 'electronics', 'clothing', 'home', 'beauty', 'sports'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Hero Section */}
      {(!searchBarQuery || searchBarQuery.trim() === '') && (
        <HeroSection />
      )}

      {/* Products Section (moved up) */}
      <section id="products-section" className="py-16">
        <div className="px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Sustainable Products
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our curated collection of eco-friendly products, 
              each scored for sustainability and impact.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="eco-score">Sort by Eco Score</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.slice(0, visibleCount).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length > visibleCount && (
            <div className="flex justify-center mt-8">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all"
                onClick={() => setVisibleCount(c => Math.min(c + 20, filteredProducts.length))}
              >
                Load More Products
              </button>
            </div>
          )}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Chatbot floating button and window */}
      <ChatBot />

      {/* Stats Boxes at the bottom */}
      <StatsBoxes />
      <Footer />
    </div>
  );
};

export default Home;

/* Add to your global CSS or tailwind.config.js:
.genz-bubble {
  border-radius: 2.5rem 1.5rem 2.5rem 2.5rem/2rem 2.5rem 2.5rem 2.5rem;
  box-shadow: 0 8px 32px 0 rgba(34,197,94,0.18), 0 1.5px 8px 0 rgba(59,130,246,0.10), 0 0 16px 2px #a78bfa44;
  border-width: 2.5px;
  border-style: solid;
  border-image: linear-gradient(120deg, #60a5fa 40%, #a78bfa 100%) 1;
  transition: box-shadow 0.3s, border-color 0.3s;
}
.genz-bubble:hover {
  box-shadow: 0 12px 40px 0 #a78bfa55, 0 1.5px 8px 0 #60a5fa33, 0 0 24px 4px #f472b6aa;
  border-image: linear-gradient(120deg, #a78bfa 40%, #f472b6 100%) 1;
}
.neon-tail {
  filter: drop-shadow(0 0 8px #a78bfa88) drop-shadow(0 0 2px #60a5fa88);
}
.animate-slide-in {
  animation: slideIn 0.4s cubic-bezier(0.4,0,0.2,1);
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(24px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-wiggle-star {
  animation: wiggleStar 1.2s infinite alternate;
}
@keyframes wiggleStar {
  0% { transform: rotate(-8deg) scale(1.05); }
  100% { transform: rotate(8deg) scale(1.15); }
}
.animate-spin-slow {
  animation: spinSlow 3s linear infinite;
}
@keyframes spinSlow {
  100% { transform: rotate(360deg); }
}
.speech-bubble {
  position: relative;
}
@keyframes sparkle {
  0%, 100% { opacity: 0.7; transform: scale(1) rotate(-10deg); }
  50% { opacity: 1; transform: scale(1.3) rotate(10deg); }
}
@keyframes sparkle2 {
  0%, 100% { opacity: 0.7; transform: scale(1) rotate(10deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(-10deg); }
}
.animate-sparkle {
  animation: sparkle 1.8s infinite;
}
.animate-sparkle2 {
  animation: sparkle2 2.2s infinite;
}
*/