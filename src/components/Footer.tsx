import React from 'react';
import { Leaf, Recycle, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 border-t border-gray-200 mt-12">
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <Leaf className="w-7 h-7 text-green-600" />
        <span className="font-bold text-xl text-gray-700">EcoMart</span>
      </div>
      <nav className="flex flex-wrap gap-6 text-gray-600 text-base font-medium">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/sustainability-tips" className="hover:text-green-600 transition">Sustainability Tips</Link>
        <Link to="/circular-marketplace" className="hover:text-blue-600 transition">Circular Market Place</Link>
        <a href="https://www.un.org/sustainabledevelopment/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition flex items-center gap-1">
          <Globe className="w-4 h-4 inline" /> SDGs
        </a>
      </nav>
      <div className="text-gray-500 text-sm text-center md:text-right">
        <div className="mb-1">&copy; {new Date().getFullYear()} EcoMart. All rights reserved.</div>
        <div className="flex items-center gap-1 justify-center md:justify-end">
          <Recycle className="w-4 h-4 text-green-500" />
          <span>Shop. Reuse. Sustain.</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 