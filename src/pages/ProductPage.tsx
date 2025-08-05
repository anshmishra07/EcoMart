import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Leaf, Award, ShoppingCart, Heart, Share2, Truck, Shield } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../contexts/CartContext';
import { useSustainability } from '../contexts/SustainabilityContext';
import MaterialAnalysis from '../components/MaterialAnalysis';
import SustainableAlternatives from '../components/SustainableAlternatives';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { recommendations, generateRecommendations } = useSustainability();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    generateRecommendations([product]);
  };

  const images = [product.image, product.image, product.image]; // Mock multiple images

  return (
    <div className="min-h-screen px-4 pt-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex space-x-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Sustainability Info */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-green-600" />
                Sustainability Impact
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {product.sustainabilityScore}
                  </div>
                  <div className="text-sm text-gray-600">Eco Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {product.carbonSaved}kg
                  </div>
                  <div className="text-sm text-gray-600">CO₂ Saved</div>
                </div>
              </div>
            </div>

            {/* Eco Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Eco Features</h3>
              <div className="flex flex-wrap gap-2">
                {product.ecoFeatures.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center space-x-1"
                  >
                    <Award className="w-3 h-3" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Save for Later</span>
              </button>
              
              <button className="flex-1 px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">30-day return policy</span>
              </div>
            </div>

            {/* Material Analysis */}
            <div className="mt-10">
              <MaterialAnalysis product={product} />
            </div>

            {/* Sustainable Alternatives */}
            <div className="mt-10">
              <SustainableAlternatives currentProduct={product} />
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Sustainability Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.slice(0, 3).map((rec, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {rec.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{rec.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Carbon Saved:</span>
                      <span className="font-semibold text-green-600">
                        {rec.expectedImpact.carbonSaved}kg
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cost Saved:</span>
                      <span className="font-semibold text-blue-600">
                        ${rec.expectedImpact.costSaved}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;