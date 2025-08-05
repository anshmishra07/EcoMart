import React, { createContext, useContext, useState, useEffect } from 'react';
import { SustainabilityRecommendation, Product } from '../types';

interface SustainabilityContextType {
  recommendations: SustainabilityRecommendation[];
  userCarbonFootprint: number;
  monthlyGoal: number;
  ecoScore: number;
  generateRecommendations: (products: Product[]) => void;
  updateCarbonFootprint: (impact: number) => void;
}

const SustainabilityContext = createContext<SustainabilityContextType | undefined>(undefined);

export const useSustainability = () => {
  const context = useContext(SustainabilityContext);
  if (!context) {
    throw new Error('useSustainability must be used within a SustainabilityProvider');
  }
  return context;
};

export const SustainabilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recommendations, setRecommendations] = useState<SustainabilityRecommendation[]>([]);
  const [userCarbonFootprint, setUserCarbonFootprint] = useState(0);
  const [monthlyGoal, setMonthlyGoal] = useState(50); // kg CO₂ saved per month
  const [ecoScore, setEcoScore] = useState(75);

  useEffect(() => {
    const savedData = localStorage.getItem('sustainability_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserCarbonFootprint(data.userCarbonFootprint || 0);
      setEcoScore(data.ecoScore || 75);
    }
  }, []);

  useEffect(() => {
    const data = {
      userCarbonFootprint,
      ecoScore
    };
    localStorage.setItem('sustainability_data', JSON.stringify(data));
  }, [userCarbonFootprint, ecoScore]);

  const generateRecommendations = (products: Product[]) => {
    // AI-powered recommendation generation
    const newRecommendations: SustainabilityRecommendation[] = [];

    // Analyze products for sustainability improvements
    products.forEach(product => {
      if (product.sustainabilityScore < 60) {
        newRecommendations.push({
          id: `alt-${product.id}`,
          type: 'alternative',
          title: `Eco-friendly alternative to ${product.name}`,
          description: `Switch to a more sustainable version and save ${product.carbonSaved + 2}kg CO₂`,
          targetProduct: product,
          expectedImpact: {
            carbonSaved: product.carbonSaved + 2,
            costSaved: 0,
            wasteReduced: 0.5
          },
          urgency: 'medium'
        });
      }
    });

    // Add general sustainability tips
    newRecommendations.push({
      id: 'tip-bulk-buying',
      type: 'tip',
      title: 'Buy in bulk to reduce packaging waste',
      description: 'Purchasing larger quantities reduces packaging per unit and saves money',
      expectedImpact: {
        carbonSaved: 2,
        costSaved: 15,
        wasteReduced: 1
      },
      urgency: 'low'
    });

    setRecommendations(newRecommendations);
  };

  const updateCarbonFootprint = (impact: number) => {
    setUserCarbonFootprint(prev => prev + impact);
    
    // Update eco score based on carbon impact
    const newEcoScore = Math.min(100, Math.max(0, ecoScore + (impact > 0 ? 2 : -1)));
    setEcoScore(newEcoScore);
  };

  return (
    <SustainabilityContext.Provider value={{
      recommendations,
      userCarbonFootprint,
      monthlyGoal,
      ecoScore,
      generateRecommendations,
      updateCarbonFootprint
    }}>
      {children}
    </SustainabilityContext.Provider>
  );
};