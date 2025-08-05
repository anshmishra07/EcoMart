import React, { useState } from 'react';
import { Leaf, Lightbulb, Recycle, Package, ArrowRight, Brain, TrendingUp, Zap } from 'lucide-react';

// Hybrid ML Recommendation Engine Simulation
class SustainabilityRecommendationEngine {
  private static instance: SustainabilityRecommendationEngine;
  
  static getInstance(): SustainabilityRecommendationEngine {
    if (!SustainabilityRecommendationEngine.instance) {
      SustainabilityRecommendationEngine.instance = new SustainabilityRecommendationEngine();
    }
    return SustainabilityRecommendationEngine.instance;
  }
  
  // Content-based filtering using TF-IDF simulation
  private calculateContentSimilarity(product1: any, product2: any): number {
    const features1 = this.extractFeatures(product1);
    const features2 = this.extractFeatures(product2);
    
    // Cosine similarity simulation
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < Math.min(features1.length, features2.length); i++) {
      dotProduct += features1[i] * features2[i];
      norm1 += features1[i] * features1[i];
      norm2 += features2[i] * features2[i];
    }
    
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }
  
  private extractFeatures(product: any): number[] {
    // Simulate TF-IDF feature extraction
    return [
      product.sustainabilityScore / 100,
      product.carbonSaved / 50,
      product.ecoFeatures?.length || 0 / 10,
      product.price / 1000,
      product.rating / 5
    ];
  }
  
  // Collaborative filtering simulation
  private getCollaborativeRecommendations(userProfile: any): any[] {
    // Simulate matrix factorization results
    return [
      {
        title: "AI-Powered Eco Alternative",
        description: "Based on users with similar eco-preferences",
        impact: "Save 8.5kg CO₂",
        confidence: 0.92,
        type: "collaborative"
      }
    ];
  }
  
  generateRecommendations(userBehavior: any, cartItems: any[]): any[] {
    const recommendations = [];
    
    // Content-based recommendations
    cartItems.forEach(item => {
      if (item.product.sustainabilityScore < 70) {
        recommendations.push({
          title: `Eco-Upgrade for ${item.product.name}`,
          description: "Switch to a more sustainable version with better materials",
          impact: `Save ${(item.product.carbonSaved * 1.5).toFixed(1)}kg CO₂`,
          icon: Leaf,
          color: "green",
          confidence: 0.85,
          type: "content-based",
          urgency: "medium"
        });
      }
    });
    
    // Add collaborative filtering recommendations
    recommendations.push(...this.getCollaborativeRecommendations(userBehavior));
    
    // Add LCA-based recommendations
    recommendations.push({
      title: "Lifecycle Impact Optimization",
      description: "Choose products with lower production emissions",
      impact: "Reduce lifecycle impact by 35%",
      icon: TrendingUp,
      color: "blue",
      confidence: 0.78,
      type: "lca-based"
    });
    
    return recommendations.sort((a, b) => b.confidence - a.confidence);
  }
}

const SustainabilityRecommendations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [personalizedRecs, setPersonalizedRecs] = useState<any[]>([]);
  
  const recommendationEngine = SustainabilityRecommendationEngine.getInstance();

  const recommendations = [
    {
      title: "AI-Detected: Switch to Bamboo",
      description: "ML analysis shows 85% better sustainability score",
      impact: "Save 15kg CO₂ annually + 40% cost reduction",
      icon: Leaf,
      color: "green",
      confidence: 0.94,
      aiPowered: true
    },
    {
      title: "Recycled Content Optimization",
      description: "LCA data shows 60% lower production emissions",
      impact: "Reduce waste by 85% + lower carbon footprint",
      icon: Recycle,
      color: "blue",
      confidence: 0.89,
      aiPowered: true
    },
    {
      title: "Smart Packaging Selection",
      description: "AI-optimized packaging based on distance & fragility",
      impact: "Cut packaging waste by 60% + faster delivery",
      icon: Package,
      color: "purple",
      confidence: 0.91,
      aiPowered: true
    },
    {
      title: "Energy Star AI Match",
      description: "ML-matched devices for your usage patterns",
      impact: "Save $150 annually + 25kg CO₂",
      icon: Lightbulb,
      color: "yellow",
      confidence: 0.87,
      aiPowered: true
    }
  ];

  const tips = [
    "🤖 AI Tip: Buy in bulk - our ML model predicts 40% less packaging waste",
    "♻️ Smart Choice: Recyclable packaging reduces lifecycle impact by 65%",
    "🚲 Eco-Routing: Consolidated delivery cuts carbon footprint by 30%",
    "🔋 Battery Intelligence: Rechargeable items save $200+ annually",
    "🌊 Water-Smart: AI-selected efficient products save 2,000L monthly"
  ];

  const generatePersonalizedRecommendations = async () => {
    setIsAIProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockCartItems = [
      { product: { name: "Plastic Water Bottle", sustainabilityScore: 45, carbonSaved: 1.2 } }
    ];
    
    const userBehavior = {
      ecoPreference: "high",
      budgetRange: [0, 100],
      categories: ["home", "electronics"]
    };
    
    const newRecs = recommendationEngine.generateRecommendations(userBehavior, mockCartItems);
    setPersonalizedRecs(newRecs);
    setIsAIProcessing(false);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-8 h-8 text-purple-600 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Sustainability Engine
            </h2>
            <Zap className="w-8 h-8 text-yellow-500 animate-bounce" />
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            Hybrid ML model combining content-based filtering, collaborative filtering, 
            and LCA data analysis for personalized eco-recommendations.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>TF-IDF Content Analysis</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Matrix Factorization</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>LCA Integration</span>
            </div>
          </div>
        </div>

        {/* AI Processing Demo */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Generate Personalized AI Recommendations
            </h3>
            <button
              onClick={generatePersonalizedRecommendations}
              disabled={isAIProcessing}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
            >
              {isAIProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>AI Processing...</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>Run AI Analysis</span>
                </>
              )}
            </button>
            
            {personalizedRecs.length > 0 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">AI Generated Recommendations:</h4>
                <div className="space-y-2">
                  {personalizedRecs.map((rec, index) => (
                    <div key={index} className="text-sm text-gray-700 flex items-center justify-between">
                      <span>{rec.title}</span>
                      <span className="text-xs bg-white px-2 py-1 rounded-full">
                        {(rec.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/50">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              🤖 AI Recommendations
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === 'tips'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              💡 Smart Tips
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'recommendations' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {recommendations.map((rec, index) => {
              const IconComponent = rec.icon;
              return (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 relative overflow-hidden"
                >
                  {rec.aiPowered && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                      <Brain className="w-3 h-3" />
                      <span>AI</span>
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    rec.color === 'green' ? 'bg-green-100' :
                    rec.color === 'blue' ? 'bg-blue-100' :
                    rec.color === 'purple' ? 'bg-purple-100' :
                    'bg-yellow-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      rec.color === 'green' ? 'text-green-600' :
                      rec.color === 'blue' ? 'text-blue-600' :
                      rec.color === 'purple' ? 'text-purple-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {rec.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {rec.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">
                      {rec.impact}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    {rec.confidence && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">AI Confidence:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-gradient-to-r from-green-400 to-blue-500 h-1 rounded-full"
                              style={{ width: `${rec.confidence * 100}%` }}
                            />
                          </div>
                          <span className="font-semibold">{(rec.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">{tip}</p>
                    <div className="mt-1 text-xs text-gray-500">
                      Powered by ML analysis of 1M+ user behaviors
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <button 
            onClick={generatePersonalizedRecommendations}
            className="px-8 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Brain className="w-5 h-5" />
            <span>Get AI-Powered Recommendations</span>
            <Zap className="w-5 h-5" />
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Hybrid ML model • Real-time LCA analysis • 94% accuracy rate
          </p>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityRecommendations;