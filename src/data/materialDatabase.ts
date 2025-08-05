export interface MaterialInfo {
  name: string;
  description: string;
  usefulness: string;
  harmfulEffects: string;
  sustainabilityScore: number; // 1-10 scale
  alternatives: string[];
  category: 'natural' | 'synthetic' | 'recycled' | 'biodegradable' | 'renewable';
}

export const materialDatabase: Record<string, MaterialInfo> = {
  // Natural Materials
  'Bamboo': {
    name: 'Bamboo',
    description: 'Fast-growing grass that can be harvested sustainably',
    usefulness: 'Strong, lightweight, renewable resource that grows quickly without pesticides',
    harmfulEffects: 'Minimal - some processing may use chemicals, but generally low environmental impact',
    sustainabilityScore: 9,
    alternatives: ['Recycled Wood', 'Hemp', 'Cork'],
    category: 'renewable'
  },
  'Organic Cotton': {
    name: 'Organic Cotton',
    description: 'Cotton grown without synthetic pesticides or fertilizers',
    usefulness: 'Soft, breathable, hypoallergenic, and biodegradable',
    harmfulEffects: 'High water usage during cultivation, though less than conventional cotton',
    sustainabilityScore: 7,
    alternatives: ['Hemp', 'Bamboo Fiber', 'Recycled Cotton'],
    category: 'natural'
  },
  'Hemp': {
    name: 'Hemp',
    description: 'Versatile plant fiber with minimal environmental impact',
    usefulness: 'Strong, durable, requires little water and no pesticides',
    harmfulEffects: 'Minimal - some processing may use chemicals',
    sustainabilityScore: 9,
    alternatives: ['Bamboo', 'Organic Cotton', 'Flax'],
    category: 'renewable'
  },
  'Cork': {
    name: 'Cork',
    description: 'Harvested from cork oak tree bark without harming the tree',
    usefulness: 'Lightweight, water-resistant, naturally antimicrobial',
    harmfulEffects: 'Minimal - sustainable harvesting actually helps preserve cork forests',
    sustainabilityScore: 9,
    alternatives: ['Bamboo', 'Recycled Rubber', 'Natural Rubber'],
    category: 'renewable'
  },
  'Natural Loofah': {
    name: 'Natural Loofah',
    description: 'Dried fruit of the luffa plant',
    usefulness: 'Natural exfoliant, biodegradable, compostable',
    harmfulEffects: 'Minimal - completely natural and biodegradable',
    sustainabilityScore: 10,
    alternatives: ['Bamboo Scrubber', 'Coconut Coir', 'Hemp Scrubber'],
    category: 'natural'
  },
  'Beeswax': {
    name: 'Beeswax',
    description: 'Natural wax produced by honey bees',
    usefulness: 'Water-resistant, antimicrobial, natural preservative',
    harmfulEffects: 'Minimal - sustainable when harvested responsibly',
    sustainabilityScore: 8,
    alternatives: ['Carnauba Wax', 'Soy Wax', 'Coconut Wax'],
    category: 'natural'
  },
  'Coconut Oil': {
    name: 'Coconut Oil',
    description: 'Natural oil extracted from coconut meat',
    usefulness: 'Moisturizing, antimicrobial, biodegradable',
    harmfulEffects: 'Minimal - sustainable when sourced responsibly',
    sustainabilityScore: 8,
    alternatives: ['Jojoba Oil', 'Argan Oil', 'Shea Butter'],
    category: 'natural'
  },
  'Shea Butter': {
    name: 'Shea Butter',
    description: 'Natural fat extracted from shea tree nuts',
    usefulness: 'Deeply moisturizing, anti-inflammatory, natural preservative',
    harmfulEffects: 'Minimal - supports local communities when fair trade',
    sustainabilityScore: 8,
    alternatives: ['Cocoa Butter', 'Mango Butter', 'Avocado Oil'],
    category: 'natural'
  },
  'Essential Oils': {
    name: 'Essential Oils',
    description: 'Concentrated plant extracts',
    usefulness: 'Natural fragrance, therapeutic properties, antimicrobial',
    harmfulEffects: 'Can be irritating to sensitive skin, some may cause allergic reactions',
    sustainabilityScore: 7,
    alternatives: ['Natural Fragrances', 'Herbal Extracts', 'Plant-Based Scents'],
    category: 'natural'
  },
  'Organic Linen': {
    name: 'Organic Linen',
    description: 'Fiber from flax plant grown without chemicals',
    usefulness: 'Strong, breathable, naturally antimicrobial',
    harmfulEffects: 'High water usage during processing, but less than cotton',
    sustainabilityScore: 7,
    alternatives: ['Hemp', 'Organic Cotton', 'Bamboo Fiber'],
    category: 'natural'
  },
  'Organic Wool': {
    name: 'Organic Wool',
    description: 'Natural fiber from sheep raised without chemicals',
    usefulness: 'Warm, moisture-wicking, naturally fire-resistant',
    harmfulEffects: 'Minimal when organic - supports sustainable farming',
    sustainabilityScore: 8,
    alternatives: ['Alpaca Wool', 'Organic Cotton', 'Hemp'],
    category: 'natural'
  },

  // Recycled Materials
  'Recycled PET': {
    name: 'Recycled PET',
    description: 'Recycled polyethylene terephthalate from plastic bottles',
    usefulness: 'Strong, lightweight, reduces plastic waste',
    harmfulEffects: 'Still plastic - may release microplastics, limited recyclability',
    sustainabilityScore: 6,
    alternatives: ['Glass', 'Stainless Steel', 'Bamboo'],
    category: 'recycled'
  },
  'Recycled Aluminum': {
    name: 'Recycled Aluminum',
    description: 'Recycled aluminum from various sources',
    usefulness: 'Lightweight, durable, infinitely recyclable',
    harmfulEffects: 'Energy-intensive production, but recycling reduces impact significantly',
    sustainabilityScore: 8,
    alternatives: ['Stainless Steel', 'Glass', 'Bamboo'],
    category: 'recycled'
  },
  'Recycled Rubber': {
    name: 'Recycled Rubber',
    description: 'Recycled rubber from tires and other sources',
    usefulness: 'Durable, shock-absorbing, reduces waste',
    harmfulEffects: 'May contain chemicals from original rubber, limited recyclability',
    sustainabilityScore: 6,
    alternatives: ['Natural Rubber', 'Cork', 'Bamboo'],
    category: 'recycled'
  },
  'Recycled Paper': {
    name: 'Recycled Paper',
    description: 'Paper made from post-consumer waste',
    usefulness: 'Reduces deforestation, saves energy and water',
    harmfulEffects: 'May contain ink residues, shorter fibers than virgin paper',
    sustainabilityScore: 8,
    alternatives: ['Bamboo Paper', 'Hemp Paper', 'Stone Paper'],
    category: 'recycled'
  },
  'Recycled Polyester': {
    name: 'Recycled Polyester',
    description: 'Recycled polyester from plastic bottles and textiles',
    usefulness: 'Durable, quick-drying, reduces plastic waste',
    harmfulEffects: 'Still synthetic - may release microplastics',
    sustainabilityScore: 6,
    alternatives: ['Organic Cotton', 'Hemp', 'Bamboo Fiber'],
    category: 'recycled'
  },
  'Recycled Denim': {
    name: 'Recycled Denim',
    description: 'Denim fabric made from recycled cotton and polyester',
    usefulness: 'Durable, familiar feel, reduces textile waste',
    harmfulEffects: 'May contain synthetic fibers, dye residues',
    sustainabilityScore: 7,
    alternatives: ['Organic Cotton', 'Hemp', 'Bamboo Fiber'],
    category: 'recycled'
  },
  'Recycled Electronics': {
    name: 'Recycled Electronics',
    description: 'Electronic components from recycled devices',
    usefulness: 'Reduces e-waste, conserves rare earth metals',
    harmfulEffects: 'May contain hazardous materials if not properly processed',
    sustainabilityScore: 7,
    alternatives: ['New Electronics', 'Refurbished Electronics'],
    category: 'recycled'
  },
  'Recycled EVA Foam': {
    name: 'Recycled EVA Foam',
    description: 'Recycled ethylene-vinyl acetate foam',
    usefulness: 'Lightweight, cushioning, reduces waste',
    harmfulEffects: 'Still synthetic material, limited recyclability',
    sustainabilityScore: 5,
    alternatives: ['Cork', 'Natural Rubber', 'Bamboo'],
    category: 'recycled'
  },

  // Synthetic Materials
  'Stainless Steel': {
    name: 'Stainless Steel',
    description: 'Corrosion-resistant steel alloy',
    usefulness: 'Durable, hygienic, long-lasting, recyclable',
    harmfulEffects: 'Energy-intensive production, mining impacts',
    sustainabilityScore: 7,
    alternatives: ['Glass', 'Bamboo', 'Ceramic'],
    category: 'synthetic'
  },
  'Glass': {
    name: 'Glass',
    description: 'Inorganic solid material made from silica',
    usefulness: 'Inert, recyclable, transparent, long-lasting',
    harmfulEffects: 'Energy-intensive production, heavy weight increases transport emissions',
    sustainabilityScore: 8,
    alternatives: ['Bamboo', 'Stainless Steel', 'Ceramic'],
    category: 'synthetic'
  },
  'Ceramic': {
    name: 'Ceramic',
    description: 'Inorganic, non-metallic material',
    usefulness: 'Durable, heat-resistant, inert, long-lasting',
    harmfulEffects: 'Energy-intensive firing process, heavy weight',
    sustainabilityScore: 7,
    alternatives: ['Bamboo', 'Glass', 'Stainless Steel'],
    category: 'synthetic'
  },
  'Natural Fiber': {
    name: 'Natural Fiber',
    description: 'Fibers derived from plants or animals',
    usefulness: 'Biodegradable, renewable, breathable',
    harmfulEffects: 'Varies by fiber type - some require significant water or land',
    sustainabilityScore: 8,
    alternatives: ['Recycled Fibers', 'Bamboo Fiber', 'Hemp'],
    category: 'natural'
  },
  'Recycled Metal': {
    name: 'Recycled Metal',
    description: 'Metal from recycled sources',
    usefulness: 'Durable, recyclable, reduces mining impact',
    harmfulEffects: 'Energy-intensive recycling process',
    sustainabilityScore: 7,
    alternatives: ['Bamboo', 'Wood', 'Stone'],
    category: 'recycled'
  },

  // Biodegradable Materials
  'Corn Starch': {
    name: 'Corn Starch',
    description: 'Starch extracted from corn kernels',
    usefulness: 'Biodegradable, renewable, compostable',
    harmfulEffects: 'Monoculture farming impacts, may contain GMOs',
    sustainabilityScore: 7,
    alternatives: ['Bamboo', 'Hemp', 'Coconut Fiber'],
    category: 'biodegradable'
  },
  'PLA': {
    name: 'PLA (Polylactic Acid)',
    description: 'Biodegradable polymer made from plant starch',
    usefulness: 'Biodegradable, renewable, compostable',
    harmfulEffects: 'Requires industrial composting, may contain GMOs',
    sustainabilityScore: 6,
    alternatives: ['Bamboo', 'Glass', 'Stainless Steel'],
    category: 'biodegradable'
  },
  'Vegan Leather': {
    name: 'Vegan Leather',
    description: 'Plant-based leather alternative',
    usefulness: 'Cruelty-free, biodegradable, renewable',
    harmfulEffects: 'May use synthetic coatings, processing chemicals',
    sustainabilityScore: 7,
    alternatives: ['Cork', 'Bamboo', 'Recycled Materials'],
    category: 'biodegradable'
  },
  'Plant Extracts': {
    name: 'Plant Extracts',
    description: 'Concentrated compounds from plants',
    usefulness: 'Natural, biodegradable, renewable',
    harmfulEffects: 'May require significant plant material, processing impacts',
    sustainabilityScore: 8,
    alternatives: ['Synthetic Alternatives', 'Mineral-Based'],
    category: 'natural'
  }
};

// Helper function to get material info
export const getMaterialInfo = (materialName: string): MaterialInfo | null => {
  return materialDatabase[materialName] || null;
};

// Helper function to get sustainability score color
export const getSustainabilityColor = (score: number): string => {
  if (score >= 7) return 'text-green-600';
  if (score <= 4) return 'text-red-600';
  return 'text-orange-600';
};

// Helper function to get sustainability score background color
export const getSustainabilityBgColor = (score: number): string => {
  if (score >= 7) return 'bg-green-100';
  if (score <= 4) return 'bg-red-100';
  return 'bg-orange-100';
}; 