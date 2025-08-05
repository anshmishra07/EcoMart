export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sustainabilityScore: number;
  carbonSaved: number;
  rating: number;
  reviews: number;
  ecoFeatures: string[];
  materials: string[];
  certifications: string[];
  lcaData: {
    production: number;
    transportation: number;
    usage: number;
    disposal: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  ecoScore: number;
  totalCarbonSaved: number;
  rewardPoints: number;
  biometricProfile: BiometricProfile;
  preferences: UserPreferences;
}

export interface BiometricProfile {
  keystrokeDynamics: number[];
  mouseMovements: { x: number; y: number; timestamp: number }[];
  touchPressure: number[];
  scrollingBehavior: number[];
  deviceFingerprint: string;
}

export interface UserPreferences {
  sustainabilityPriority: 'high' | 'medium' | 'low';
  categories: string[];
  budgetRange: { min: number; max: number };
  ecoFeatures: string[];
}

export interface NFTReceipt {
  id: string;
  transactionId: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  timestamp: Date;
  blockchainHash: string;
  qrCode: string;
  sustainabilityData: {
    totalCarbonSaved: number;
    ecoScore: number;
    sustainableItemsCount: number;
  };
}

export interface EcoAction {
  id: string;
  userId: string;
  action: 'purchase' | 'review' | 'return' | 'share';
  points: number;
  carbonImpact: number;
  timestamp: Date;
  details: any;
}

export interface SustainabilityRecommendation {
  id: string;
  type: 'alternative' | 'upgrade' | 'bundle' | 'tip';
  title: string;
  description: string;
  targetProduct?: Product;
  alternatives?: Product[];
  expectedImpact: {
    carbonSaved: number;
    costSaved: number;
    wasteReduced: number;
  };
  urgency: 'high' | 'medium' | 'low';
}

export interface CircularProduct {
  id: string;
  originalProduct: Product;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  conditionScore: number;
  price: number;
  seller: string;
  images: string[];
  description: string;
  certifiedCondition: boolean;
  returnPolicy: string;
  warranty: string;
}