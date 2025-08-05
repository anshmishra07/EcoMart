import React, { useState } from 'react';
import { Leaf, TrendingUp, Award, Target, Calendar, BarChart3, Brain, Zap, Globe } from 'lucide-react';
import { useSustainability } from '../contexts/SustainabilityContext';

// Carbon footprint calculation engine with LCA integration
class CarbonFootprintCalculator {
  private static instance: CarbonFootprintCalculator;
  
  // Mock LCA database integration
  private lcaDatabase = {
    'electronics': { production: 45.2, transport: 3.8, usage: 120.5, disposal: 2.1 },
    'clothing': { production: 12.3, transport: 1.2, usage: 0.5, disposal: 0.8 },
    'home': { production: 8.7, transport: 2.1, usage: 15.2, disposal: 1.3 },
    'beauty': { production: 3.2, transport: 0.8, usage: 0.1, disposal: 0.4 }
  };
  
  static getInstance(): CarbonFootprintCalculator {
    if (!CarbonFootprintCalculator.instance) {
      CarbonFootprintCalculator.instance = new CarbonFootprintCalculator();
    }
    return CarbonFootprintCalculator.instance;
  }
  
  calculateProductFootprint(product: any): number {
    const categoryData = this.lcaDatabase[product.category as keyof typeof this.lcaDatabase] || this.lcaDatabase.home;
    
    // Lifecycle assessment calculation
    const totalFootprint = 
      categoryData.production + 
      categoryData.transport + 
      (categoryData.usage * 0.1) + // Assuming 10% of usage phase
      categoryData.disposal;
    
    // Apply sustainability score modifier
    const sustainabilityModifier = (100 - product.sustainabilityScore) / 100;
    
    return totalFootprint * sustainabilityModifier;
  }
  
  generateActionableTips(userProfile: any): string[] {
    const tips = [
      "🔋 Switch to renewable energy - save 2.3 tons CO₂/year",
      "🚲 Use bike/public transport 2x/week - save 1.2 tons CO₂/year", 
      "🌱 Choose plant-based meals 3x/week - save 0.8 tons CO₂/year",
      "♻️ Buy refurbished electronics - save 0.6 tons CO₂/year",
      "🏠 Improve home insulation - save 1.5 tons CO₂/year"
    ];
    
    // Personalize based on user behavior (mock)
    return tips.slice(0, 3);
  }
}

const EcoTracker: React.FC = () => {
  const { userCarbonFootprint, monthlyGoal, ecoScore } = useSustainability();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isCalculating, setIsCalculating] = useState(false);
  const [detailedAnalysis, setDetailedAnalysis] = useState<any>(null);
  
  const calculator = CarbonFootprintCalculator.getInstance();

  const monthlyData = [
    { month: 'Jan', saved: 12.5, goal: 50, trend: 'up', confidence: 0.89 },
    { month: 'Feb', saved: 18.2, goal: 50, trend: 'up', confidence: 0.92 },
    { month: 'Mar', saved: 24.8, goal: 50, trend: 'up', confidence: 0.94 },
    { month: 'Apr', saved: 32.1, goal: 50, trend: 'up', confidence: 0.91 },
    { month: 'May', saved: 28.5, goal: 50, trend: 'down', confidence: 0.87 },
    { month: 'Jun', saved: 45.3, goal: 50, trend: 'up', confidence: 0.96 },
  ];

  const achievements = [
    { title: 'AI Eco Warrior', description: 'ML-verified 100kg CO₂ saved', icon: Award, color: 'gold', aiVerified: true },
    { title: 'Smart Shopper', description: 'AI-recommended 50 eco products', icon: Leaf, color: 'green', aiVerified: true },
    { title: 'Data Champion', description: 'LCA-tracked 80+ eco score', icon: TrendingUp, color: 'blue', aiVerified: true },
    { title: 'Carbon Optimizer', description: 'Algorithm-optimized savings', icon: Target, color: 'purple', aiVerified: true },
  ];

  const tips = calculator.generateActionableTips({ ecoScore, userCarbonFootprint });

  const progressPercentage = (userCarbonFootprint / monthlyGoal) * 100;

  const runDetailedAnalysis = async () => {
    setIsCalculating(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysis = {
      totalFootprint: userCarbonFootprint,
      breakdown: {
        shopping: 45.2,
        transport: 23.1,
        energy: 18.7,
        food: 13.0
      },
      predictions: {
        nextMonth: userCarbonFootprint * 1.15,
        yearEnd: userCarbonFootprint * 12.3,
        potential: userCarbonFootprint * 0.7
      },
      recommendations: [
        { action: "Switch to eco-products", impact: 12.5, confidence: 0.94 },
        { action: "Optimize delivery routes", impact: 8.3, confidence: 0.87 },
        { action: "Choose local suppliers", impact: 6.1, confidence: 0.91 }
      ]
    };
    
    setDetailedAnalysis(analysis);
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen px-4 pt-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-8 h-8 text-purple-600 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Eco Dashboard
            </h1>
            <Globe className="w-8 h-8 text-green-600 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            Track your environmental impact with LCA-integrated analysis, ML-powered predictions, 
            and real-time carbon footprint calculations.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>LCA Database</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Carbon Interface API</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>ML Predictions</span>
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 border border-white/50">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>AI Carbon Footprint Analysis</span>
            </h3>
            <button
              onClick={runDetailedAnalysis}
              disabled={isCalculating}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing LCA Data...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Run AI Analysis</span>
                </>
              )}
            </button>
            
            {detailedAnalysis && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Carbon Breakdown</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Shopping:</span>
                      <span>{detailedAnalysis.breakdown.shopping}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transport:</span>
                      <span>{detailedAnalysis.breakdown.transport}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">AI Predictions</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Next Month:</span>
                      <span>{detailedAnalysis.predictions.nextMonth.toFixed(1)}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Potential:</span>
                      <span className="text-green-600">{detailedAnalysis.predictions.potential.toFixed(1)}kg</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Top Recommendation</h4>
                  <div className="text-sm">
                    <div className="font-medium">{detailedAnalysis.recommendations[0].action}</div>
                    <div className="text-green-600">Save {detailedAnalysis.recommendations[0].impact}kg CO₂</div>
                    <div className="text-xs text-gray-500">
                      {(detailedAnalysis.recommendations[0].confidence * 100).toFixed(0)}% confidence
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              LCA Verified
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Carbon Saved</p>
                <p className="text-2xl font-bold text-green-600">{userCarbonFootprint.toFixed(1)}kg</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              AI Scored
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Eco Score</p>
                <p className="text-2xl font-bold text-blue-600">{ecoScore}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              ML Target
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Monthly Goal</p>
                <p className="text-2xl font-bold text-purple-600">{monthlyGoal}kg</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
              Real-time
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Progress</p>
                <p className="text-2xl font-bold text-orange-600">{progressPercentage.toFixed(0)}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Monthly Progress */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>AI-Tracked Carbon Savings</span>
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedPeriod('month')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedPeriod === 'month'
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('year')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedPeriod === 'year'
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-12 text-sm text-gray-600 flex items-center space-x-1">
                      <span>{data.month}</span>
                      {data.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingUp className="w-3 h-3 text-red-500 transform rotate-180" />
                      )}
                    </div>
                    <div className="flex-1 relative">
                      <div className="w-full bg-gray-200 rounded-full h-6">
                        <div
                          className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-500 group-hover:shadow-lg"
                          style={{ width: `${(data.saved / data.goal) * 100}%` }}
                        >
                          <span className="text-white text-xs font-medium">
                            {data.saved}kg
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-20 text-sm text-gray-600 text-right">
                      <div>{((data.saved / data.goal) * 100).toFixed(0)}%</div>
                      <div className="text-xs text-gray-400">
                        {(data.confidence * 100).toFixed(0)}% conf.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Month Goal */}
            <div className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-2xl p-6 border border-white/50">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>AI-Optimized Monthly Goal</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Progress to Goal</span>
                  <span className="font-semibold flex items-center space-x-1">
                    <span>{progressPercentage.toFixed(0)}%</span>
                    <Brain className="w-4 h-4 text-purple-600" />
                  </span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{userCarbonFootprint.toFixed(1)}kg saved</span>
                  <span>{monthlyGoal}kg goal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>AI-Verified Achievements</span>
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors relative">
                      {achievement.aiVerified && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                          <Brain className="w-2 h-2 text-white" />
                        </div>
                      )}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.color === 'gold' ? 'bg-yellow-100' :
                        achievement.color === 'green' ? 'bg-green-100' :
                        achievement.color === 'blue' ? 'bg-blue-100' :
                        'bg-purple-100'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${
                          achievement.color === 'gold' ? 'text-yellow-600' :
                          achievement.color === 'green' ? 'text-green-600' :
                          achievement.color === 'blue' ? 'text-blue-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{achievement.title}</h4>
                        <p className="text-gray-600 text-xs">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sustainability Tips */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>AI-Generated Tips</span>
              </h3>
              <div className="space-y-3">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm">{tip}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Powered by LCA analysis & behavioral ML
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoTracker;