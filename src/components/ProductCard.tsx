import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Leaf, Award, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const getSustainabilityBadge = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'green', icon: Award };
    if (score >= 60) return { label: 'Good', color: 'blue', icon: TrendingUp };
    if (score >= 40) return { label: 'Fair', color: 'yellow', icon: Leaf };
    return { label: 'Poor', color: 'red', icon: Leaf };
  };

  const sustainabilityBadge = getSustainabilityBadge(product.sustainabilityScore);
  const BadgeIcon = sustainabilityBadge.icon;

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-105">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Sustainability Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
            sustainabilityBadge.color === 'green' ? 'bg-green-100 text-green-800' :
            sustainabilityBadge.color === 'blue' ? 'bg-blue-100 text-blue-800' :
            sustainabilityBadge.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            <BadgeIcon className="w-3 h-3" />
            <span>{sustainabilityBadge.label}</span>
          </div>

          {/* Eco Score */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs font-bold text-green-600">{product.sustainabilityScore}</div>
              <div className="text-xs text-gray-500">ECO</div>
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-600"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price and Eco Benefits */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1 text-green-600">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">
                -{product.carbonSaved}kg CO₂
              </span>
            </div>
          </div>

          {/* Eco Features */}
          <div className="flex flex-wrap gap-2">
            {product.ecoFeatures.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
            {product.ecoFeatures.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{product.ecoFeatures.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;