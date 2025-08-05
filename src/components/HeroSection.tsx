import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Star, Award, TrendingUp, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { mockProducts } from '../data/mockProducts';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Add background images for hero section
  const HERO_IMAGES = [
    '/Screenshot 2025-07-14 223807.png',
    '/Screenshot 2025-07-14 224053.png',
  ];

  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Get top sustainable products for the carousel
  const topProducts = mockProducts
    .sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
    .slice(0, 8);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topProducts.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [topProducts.length]);

  // Scroll to current index
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 280; // Approximate card width including margin
      carouselRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const getSustainabilityColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const handleExploreClick = () => {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="relative min-h-[550px] bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 overflow-hidden">
      {/* Animated background images */}
      <div className="absolute left-0 top-0 w-full" style={{height:'570px', zIndex:0}}>
        {HERO_IMAGES.map((img, i) => (
          <div key={i} className={`absolute left-0 top-0 w-full h-full transition-opacity duration-1000 ${i === bgIndex ? 'opacity-100' : 'opacity-0'}`} style={{zIndex:0}}>
            <img
              src={img}
              alt="hero background"
              className="object-cover w-full h-full"
              style={{zIndex:0, height:'570px'}}
            />
            {/* Strong blur/gradient at the lower side */}
            <div className="absolute left-0 right-0 bottom-0 h-40 pointer-events-none" style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,1) 100%)',
              backdropFilter:'blur(32px)',
              WebkitBackdropFilter:'blur(32px)',
              zIndex:2
            }} />
          </div>
        ))}
        {/* Soft overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/60 to-emerald-50/60" style={{zIndex:1, height:'570px'}} />
      </div>

      <div className="relative z-10 pt-16 pb-16 px-4">
        {/* Hero Content */}
                  <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4 mr-2" />
              Sustainable Shopping Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Buy Smart.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Buy Sustainable.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover products with transparent sustainability insights and make informed choices for a better planet.
            </p>
            
            <button
              onClick={handleExploreClick}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white text-lg font-semibold rounded-full hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

        {/* Product Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured Sustainable Products
            </h2>
            <div className="flex space-x-2">
              {topProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-green-50 via-blue-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-emerald-50 via-blue-50 to-transparent z-10 pointer-events-none"></div>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                >
                  {/* Product Image */}
                  <div className="relative h-48 rounded-t-2xl overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    {/* Sustainability Score Badge */}
                    <div className="absolute top-3 right-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${product.sustainabilityScore >= 70 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-800'}`}>
                        {product.sustainabilityScore}/100
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                      {product.name}
                    </h3>
                    {/* Eco Features as keywords */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.ecoFeatures.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom scrollbar styles */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </section>
  );
};

export default HeroSection; 