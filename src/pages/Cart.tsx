import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useSustainability } from '../contexts/SustainabilityContext';
import { Trash2, Plus, Minus, Leaf, Award, CreditCard, Smartphone } from 'lucide-react';
import NFTReceiptGenerator from '../components/NFTReceiptGenerator';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalCarbonSaved } = useCart();
  const { updateCarbonFootprint } = useSustainability();
  const [showNFTReceipt, setShowNFTReceipt] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update sustainability metrics
    updateCarbonFootprint(totalCarbonSaved);
    
    // Generate NFT receipt
    setShowNFTReceipt(true);
    setIsCheckingOut(false);
  };

  if (showNFTReceipt) {
    return (
      <NFTReceiptGenerator
        items={items}
        totalAmount={totalPrice}
        onClose={() => {
          setShowNFTReceipt(false);
          clearCart();
        }}
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping sustainably and make a positive impact!</p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                      <p className="text-gray-600 text-sm">{item.product.description}</p>
                      
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-green-600">
                          <Leaf className="w-4 h-4" />
                          <span className="text-sm">-{item.product.carbonSaved}kg CO₂</span>
                        </div>
                        <div className="flex items-center space-x-1 text-yellow-600">
                          <Award className="w-4 h-4" />
                          <span className="text-sm">Eco Score: {item.product.sustainabilityScore}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Eco Discount</span>
                  <span className="font-semibold text-green-600">-$5.00</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(totalPrice - 5).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Checkout</span>
                  </>
                )}
              </button>
            </div>

            {/* Environmental Impact */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-green-600" />
                Environmental Impact
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Carbon Saved</span>
                  <span className="font-semibold text-green-600">
                    {totalCarbonSaved.toFixed(1)}kg CO₂
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-700">Eco Products</span>
                  <span className="font-semibold">
                    {items.filter(item => item.product.sustainabilityScore > 70).length}/{items.length}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-700">Reward Points</span>
                  <span className="font-semibold text-blue-600">
                    +{Math.floor(totalCarbonSaved * 10)} points
                  </span>
                </div>
              </div>
            </div>

            {/* NFT Receipt Preview */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-purple-600" />
                NFT Receipt
              </h3>
              
              <p className="text-gray-700 text-sm mb-4">
                Your purchase will be immortalized as a tamper-proof NFT receipt, 
                stored securely on the blockchain.
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Blockchain verified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Warranty included</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>QR code access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;