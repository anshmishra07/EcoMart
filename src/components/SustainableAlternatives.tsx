import React from 'react';
import { Leaf, ArrowRight, Star, Zap, Award, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { mockProducts } from '../data/mockProducts';
import { getMaterialInfo } from '../data/materialDatabase';

interface SustainableAlternativesProps {
  currentProduct: Product;
}

interface AlternativeProduct extends Product {
  sustainabilityReason: string;
  materialImprovements: string[];
  compatibilityScore: number;
  useCaseMatch: number;
  overallScore: number;
  keyBenefits: string[];
}

const SustainableAlternatives: React.FC<SustainableAlternativesProps> = ({ currentProduct }) => {
  // Enhanced use case detection
  const detectUseCase = (product: Product): string[] => {
    const useCaseKeywords = {
      'phone protection': ['phone', 'case', 'protection', 'shock', 'cover'],
      'lighting': ['lamp', 'light', 'solar', 'led', 'desk', 'garden'],
      'personal care': ['shampoo', 'toothbrush', 'soap', 'beauty', 'hygiene', 'care'],
      'food storage': ['food', 'storage', 'container', 'bottle', 'lunchbox', 'wrap'],
      'clothing': ['shirt', 't-shirt', 'backpack', 'jeans', 'socks', 'onesie', 'fleece'],
      'yoga fitness': ['yoga', 'mat', 'strap', 'block', 'fitness', 'exercise'],
      'cleaning': ['detergent', 'sponge', 'cleaning', 'laundry', 'trash'],
      'drinking': ['water', 'bottle', 'straw', 'drinking', 'hydration'],
      'cooking': ['cutlery', 'kitchen', 'cooking', 'utensil', 'straw'],
      'home decor': ['vase', 'sheet', 'bedding', 'home', 'decor']
    };

    const productText = `${product.name} ${product.description}`.toLowerCase();
    const detectedUses: string[] = [];

    Object.entries(useCaseKeywords).forEach(([useCase, keywords]) => {
      const matchCount = keywords.filter(keyword => productText.includes(keyword)).length;
      if (matchCount >= 2) {
        detectedUses.push(useCase);
      }
    });

    return detectedUses;
  };

  // Calculate material compatibility and improvements
  const analyzeMaterialCompatibility = (currentProduct: Product, alternativeProduct: Product) => {
    const currentMaterials = currentProduct.materials.map(material => getMaterialInfo(material)).filter(Boolean);
    const alternativeMaterials = alternativeProduct.materials.map(material => getMaterialInfo(material)).filter(Boolean);
    
    let compatibilityScore = 0;
    const materialImprovements: string[] = [];
    const keyBenefits: string[] = [];

    // Check for direct material upgrades
    alternativeMaterials.forEach(altMaterial => {
      currentMaterials.forEach(currentMaterial => {
        if (currentMaterial!.alternatives.includes(altMaterial!.name)) {
          const scoreImprovement = altMaterial!.sustainabilityScore - currentMaterial!.sustainabilityScore;
          if (scoreImprovement > 0) {
            compatibilityScore += scoreImprovement;
            materialImprovements.push(`${altMaterial!.name} (${altMaterial!.sustainabilityScore}/10) vs ${currentMaterial!.name} (${currentMaterial!.sustainabilityScore}/10)`);
            
            // Add specific benefits based on material type
            if (altMaterial!.category === 'natural' && currentMaterial!.category === 'synthetic') {
              keyBenefits.push('Natural material instead of synthetic');
            }
            if (altMaterial!.category === 'renewable' && currentMaterial!.category !== 'renewable') {
              keyBenefits.push('Renewable resource');
            }
            if (altMaterial!.category === 'biodegradable' && currentMaterial!.category !== 'biodegradable') {
              keyBenefits.push('Biodegradable material');
            }
          }
        }
      });
    });

    // Check for category improvements
    const currentCategories = currentMaterials.map(m => m!.category);
    const alternativeCategories = alternativeMaterials.map(m => m!.category);
    
    if (alternativeCategories.includes('natural') && !currentCategories.includes('natural')) {
      keyBenefits.push('Uses natural materials');
    }
    if (alternativeCategories.includes('renewable') && !currentCategories.includes('renewable')) {
      keyBenefits.push('Uses renewable resources');
    }
    if (alternativeCategories.includes('biodegradable') && !currentCategories.includes('biodegradable')) {
      keyBenefits.push('Biodegradable components');
    }

    return { compatibilityScore, materialImprovements, keyBenefits };
  };

  // Enhanced scoring system
  const calculateOverallScore = (
    product: Product,
    compatibilityScore: number,
    useCaseMatch: number,
    currentProduct: Product
  ): number => {
    const sustainabilityImprovement = product.sustainabilityScore - currentProduct.sustainabilityScore;
    const priceFactor = currentProduct.price > 0 ? (currentProduct.price - product.price) / currentProduct.price : 0;
    const ratingFactor = product.rating / 5;
    
    // Weighted scoring
    const score = (
      sustainabilityImprovement * 0.4 + // 40% weight on sustainability
      compatibilityScore * 0.3 + // 30% weight on material compatibility
      useCaseMatch * 0.2 + // 20% weight on use case match
      (priceFactor * 0.05) + // 5% weight on price (bonus for cheaper)
      (ratingFactor * 0.05) // 5% weight on rating
    );

    return Math.max(0, score);
  };

  const findMoreSustainableAlternatives = (): AlternativeProduct[] => {
    const currentUseCases = detectUseCase(currentProduct);
    const alternatives: AlternativeProduct[] = [];

    mockProducts
      .filter(product => product.id !== currentProduct.id)
      .forEach(product => {
        const alternativeUseCases = detectUseCase(product);
        const useCaseMatch = currentUseCases.filter(use => alternativeUseCases.includes(use)).length;
        
        // Only consider products with some use case overlap or same category
        if (useCaseMatch > 0 || product.category === currentProduct.category) {
          const { compatibilityScore, materialImprovements, keyBenefits } = analyzeMaterialCompatibility(currentProduct, product);
          
          if (compatibilityScore > 0 || product.sustainabilityScore > currentProduct.sustainabilityScore) {
            const overallScore = calculateOverallScore(product, compatibilityScore, useCaseMatch, currentProduct);
            
            if (overallScore > 0) {
              const sustainabilityReason = materialImprovements.length > 0 
                ? `Uses ${materialImprovements.length} more sustainable material${materialImprovements.length > 1 ? 's' : ''}: ${materialImprovements.join(', ')}`
                : `Higher overall sustainability score (${product.sustainabilityScore} vs ${currentProduct.sustainabilityScore})`;

              alternatives.push({
                ...product,
                sustainabilityReason,
                materialImprovements,
                compatibilityScore,
                useCaseMatch,
                overallScore,
                keyBenefits: [...new Set(keyBenefits)] // Remove duplicates
              });
            }
          }
        }
      });

    // Sort by overall score and return top 3
    return alternatives
      .sort((a, b) => b.overallScore - a.overallScore)
      .slice(0, 3);
  };

  const alternatives = findMoreSustainableAlternatives();

  if (alternatives.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <Leaf className="w-5 h-5 mr-2 text-green-600" />
          More Sustainable Alternatives
        </h3>
        <div className="text-center py-8">
          <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            This product already uses highly sustainable materials. 
            Great choice for the environment!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <Leaf className="w-5 h-5 mr-2 text-green-600" />
        More Sustainable Alternatives
      </h3>
      
      <div className="space-y-4">
        {alternatives.map((alternative, index) => (
          <div key={alternative.id} className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <img 
                src={alternative.image} 
                alt={alternative.name} 
                className="w-16 h-16 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{alternative.name}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{alternative.rating}</span>
                    </div>
                    <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                      {alternative.sustainabilityScore}/100
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{alternative.description}</p>
                
                <div className="bg-green-50 rounded-lg p-3 mb-3">
                  <h5 className="font-medium text-green-800 mb-1 flex items-center">
                    <Leaf className="w-4 h-4 mr-1" />
                    Why More Sustainable
                  </h5>
                  <p className="text-sm text-green-700 mb-2">{alternative.sustainabilityReason}</p>
                  
                  {alternative.keyBenefits.length > 0 && (
                    <div className="mt-2">
                      <h6 className="font-medium text-green-800 text-xs mb-1">Key Benefits:</h6>
                      <div className="flex flex-wrap gap-1">
                        {alternative.keyBenefits.map((benefit, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-800">
                    ${alternative.price}
                  </div>
                  <button className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    <span>View Product</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2 flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          Sustainability Impact
        </h4>
        <p className="text-sm text-green-700">
          Choosing one of these alternatives could reduce your environmental impact by up to 
          <span className="font-semibold"> {Math.max(...alternatives.map(a => a.sustainabilityScore - currentProduct.sustainabilityScore))}%</span> 
          compared to the current product.
        </p>
      </div>
    </div>
  );
};

export default SustainableAlternatives; 