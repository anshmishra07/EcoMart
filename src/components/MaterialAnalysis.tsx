import React from 'react';
import { Leaf, AlertTriangle, Info, TrendingUp } from 'lucide-react';
import { getMaterialInfo, getSustainabilityColor, getSustainabilityBgColor } from '../data/materialDatabase';
import { Product } from '../types';

interface MaterialAnalysisProps {
  product: Product;
}

const MaterialAnalysis: React.FC<MaterialAnalysisProps> = ({ product }) => {
  const getMaterialInfoForProduct = (materialName: string) => {
    return getMaterialInfo(materialName);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'natural':
        return 'text-green-700 bg-green-50';
      case 'renewable':
        return 'text-blue-700 bg-blue-50';
      case 'recycled':
        return 'text-purple-700 bg-purple-50';
      case 'biodegradable':
        return 'text-emerald-700 bg-emerald-50';
      case 'synthetic':
        return 'text-orange-700 bg-orange-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'natural':
      case 'renewable':
        return <Leaf className="w-4 h-4" />;
      case 'recycled':
        return <TrendingUp className="w-4 h-4" />;
      case 'biodegradable':
        return <Leaf className="w-4 h-4" />;
      case 'synthetic':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Leaf className="w-5 h-5 mr-2 text-green-600" />
        Raw Materials Analysis
      </h3>
      
      <div className="space-y-4">
        {product.materials.map((material, index) => {
          const materialInfo = getMaterialInfoForProduct(material);
          
          if (!materialInfo) {
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">{material}</h4>
                <p className="text-gray-600 text-sm">Information not available for this material.</p>
              </div>
            );
          }

          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800 text-lg">{materialInfo.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getCategoryColor(materialInfo.category)}`}>
                  {getCategoryIcon(materialInfo.category)}
                  {materialInfo.category}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-1 text-blue-600" />
                    Usefulness
                  </h5>
                  <p className="text-sm text-gray-600">{materialInfo.usefulness}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1 text-orange-600" />
                    Harmful Effects
                  </h5>
                  <p className="text-sm text-gray-600">{materialInfo.harmfulEffects}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Sustainability Score:</span>
                  <div className={`px-3 py-1 rounded-full font-bold ${getSustainabilityBgColor(materialInfo.sustainabilityScore)} ${getSustainabilityColor(materialInfo.sustainabilityScore)}`}>
                    {materialInfo.sustainabilityScore}/10
                  </div>
                </div>
                
                {materialInfo.alternatives.length > 0 && (
                  <div className="mt-3">
                    <h6 className="font-medium text-gray-700 mb-2">More Sustainable Alternatives:</h6>
                    <div className="flex flex-wrap gap-2">
                      {materialInfo.alternatives.slice(0, 3).map((alternative, altIndex) => (
                        <span
                          key={altIndex}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {alternative}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Overall Product Sustainability</h4>
        <div className="flex items-center justify-between">
          <span className="text-blue-700">Product Eco Score:</span>
          <div className={`px-4 py-2 rounded-full font-bold text-lg ${getSustainabilityBgColor(product.sustainabilityScore / 10)} ${getSustainabilityColor(product.sustainabilityScore / 10)}`}>
            {product.sustainabilityScore}/100
          </div>
        </div>
        <p className="text-sm text-blue-600 mt-2">
          This score is calculated based on the sustainability of all materials used in this product.
        </p>
      </div>
    </div>
  );
};

export default MaterialAnalysis; 