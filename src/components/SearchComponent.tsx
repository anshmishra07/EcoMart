import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import { Product } from '../types';
import { Leaf, Sparkles } from 'lucide-react';

function fuzzyMatch(str: string, query: string) {
  str = str.toLowerCase();
  query = query.toLowerCase();
  if (str.includes(query)) return true;
  function lev(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] = a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
      }
    }
    return matrix[a.length][b.length];
  }
  return lev(str, query) <= 2;
}

const getSuggestions = (query: string) => {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const names = mockProducts.map(p => p.name);
  const categories = Array.from(new Set(mockProducts.map(p => p.category)));
  const features = Array.from(new Set(mockProducts.flatMap(p => p.ecoFeatures)));
  const all = [...names, ...categories, ...features];
  // For short queries, use substring match; for longer, use fuzzyMatch
  return Array.from(new Set(all))
    .filter(item =>
      q.length <= 2
        ? item.toLowerCase().includes(q)
        : fuzzyMatch(item, q)
    )
    .slice(0, 7);
};

interface SearchComponentProps {
  onQueryChange?: (query: string) => void;
  compact?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onQueryChange, compact }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => getSuggestions(query), [query]);

  // Filter products by fuzzy match on name, description, or category
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return mockProducts.filter(p =>
      fuzzyMatch(p.name, query) ||
      fuzzyMatch(p.description, query) ||
      fuzzyMatch(p.category, query)
    );
  }, [query]);

  // Recommend top 3 sustainable products not in results
  const recommendations = useMemo(() => {
    if (!query.trim()) return [];
    const excludeIds = new Set(results.map(p => p.id));
    return mockProducts
      .filter(p => !excludeIds.has(p.id))
      .sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
      .slice(0, 3);
  }, [results, query]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    setShowResults(true);
    if (onQueryChange) onQueryChange(e.target.value);
  };

  const handleProductClick = (id: string) => {
    setShowSuggestions(false);
    setShowResults(false);
    setTimeout(() => {
      inputRef.current?.blur();
    }, 100);
    navigate(`/product/${id}`);
  };

  // Close dropdown/results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={compact ? "w-full bg-white rounded-lg shadow border border-gray-200 relative" : "w-full max-w-xl mx-auto bg-white/90 rounded-2xl shadow-lg p-6 mt-4 relative"}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
          placeholder="Search for products, categories, or keywords..."
          className={compact ? "w-full px-3 py-2 text-base border-none focus:ring-2 focus:ring-blue-500 rounded-lg" : "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mb-2"}
        />
        {/* Remove text suggestions dropdown */}
        {/* Results and Recommendations Dropdown (always show in both modes) */}
        {query && showResults && (
          <div className={compact ? "absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow z-10 mt-2 max-h-[60vh] overflow-auto" : "mt-2"}>
            <div className={compact ? "p-3" : "mt-2"}>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Search Results</h3>
              {results.length === 0 && <div className="text-gray-500">No products found.</div>}
              <div className="grid grid-cols-1 gap-4">
                {results.map(product => (
                  <div
                    key={product.id}
                    className="cursor-pointer hover:bg-blue-50 rounded-xl p-3 border border-gray-100 flex items-center gap-4 transition"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{product.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                      <div className="text-xs text-green-700 font-bold mt-1">Eco Score: {product.sustainabilityScore}</div>
                    </div>
                    <div className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
            {recommendations.length > 0 && (
              <div className={compact ? "p-3" : "mt-8"}>
                <h3 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2">
                  <span role="img" aria-label="sustainable">🌱</span> Sustainable Picks
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {recommendations.map(product => (
                    <div
                      key={product.id}
                      className="cursor-pointer hover:bg-green-50 rounded-xl p-3 border border-green-200 flex items-center gap-4 transition relative"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow font-bold">🌱 Sustainable Pick</span>
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                        <div className="text-xs text-green-700 font-bold mt-1">Eco Score: {product.sustainabilityScore}</div>
                      </div>
                      <div className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Remove the decorative header and subtitle block */}
    </div>
  );
};

export default SearchComponent; 