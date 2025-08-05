import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Leaf, Recycle, ChevronDown, Menu, Home, Bell, BarChart2, Heart, Wallet, MessageSquare, LogOut, Settings, Info } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import SearchComponent from './SearchComponent';

const defaultLocation = {
  address: 'Sacramento, 95829',
  store: 'Sacramento Supercenter',
  type: 'Pickup',
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const navigate = useNavigate();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Location state
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('user_location');
    return saved ? JSON.parse(saved) : defaultLocation;
  });
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);

  const handleLocationSave = () => {
    setLocation(tempLocation);
    localStorage.setItem('user_location', JSON.stringify(tempLocation));
    setShowLocationModal(false);
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main Walmart-style blue navbar */}
      <div className="bg-blue-600 w-full">
        <div className="flex items-center h-16 px-4 sm:px-6 lg:px-8 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group mr-6">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">EcoMart</span>
          </Link>

          {/* Location Card */}
          <div className="hidden md:flex items-center mr-4">
            <button
              className="flex items-center bg-blue-700 rounded-full px-4 py-2 shadow text-white hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={() => setShowLocationModal(true)}
            >
              {/* Simple SVG or emoji for icon */}
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <span role="img" aria-label="location" className="text-xl">📍</span>
              </span>
              <div className="text-left mr-2">
                <div className="font-bold leading-tight text-sm">Pickup or delivery?</div>
                <div className="text-xs truncate opacity-90">{location.address} • {location.store}</div>
              </div>
              <ChevronDown className="w-5 h-5 opacity-80" />
            </button>
          </div>

          {/* Search Bar Centered, shrink to fit menu */}
          <div className="flex-1 flex justify-center min-w-0">
            <div className="w-full max-w-xl min-w-0">
              <SearchComponent compact={true} />
            </div>
          </div>

          {/* Navigation Links on Right */}
          <nav className="flex items-center space-x-6 ml-6">
            <Link to="/eco-tracker" className="text-white hover:text-yellow-300 font-medium flex items-center space-x-1">
              <Leaf className="w-4 h-4" />
              <span>Eco Tracker</span>
            </Link>
            <Link to="/circular-marketplace" className="text-white hover:text-green-200 font-medium flex items-center space-x-1">
              <Recycle className="w-4 h-4 text-green-300" />
              <span>Circular Market Place</span>
            </Link>
            <Link to="/cart" className="relative text-white hover:text-yellow-300">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/profile" className="text-white hover:text-yellow-300">
              <User className="w-6 h-6" />
            </Link>
            {/* Hamburger Menu Icon */}
            <button
              className="ml-2 p-2 rounded-lg text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={() => setShowMenu(true)}
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </nav>
        </div>
      </div>
      {/* Side Drawer Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40" onClick={() => setShowMenu(false)} />
          {/* Drawer - right side */}
          <div className="relative bg-white w-72 h-full shadow-xl p-6 flex flex-col animate-slide-in-right">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-blue-600" onClick={() => setShowMenu(false)} aria-label="Close menu">✕</button>
            <div className="flex items-center mb-8">
              <Menu className="w-7 h-7 mr-2 text-blue-700" />
              <span className="text-2xl font-bold text-blue-700">EcoMart</span>
            </div>
            <nav className="flex flex-col gap-2">
              <MenuItem icon={Home} label="Dashboard" to="/account" />
              <MenuItem icon={User} label="My Profile" to="/profile" />
              <MenuItem icon={Bell} label="Notifications" to="/notifications" />
              <MenuItem icon={BarChart2} label="Analytics" to="/analytics" />
              <MenuItem icon={Heart} label="Reviews & Feedbacks" to="/reviews-feedbacks" />
              <MenuItem icon={Wallet} label="Wallets" to="/wallets" />
              <MenuItem icon={MessageSquare} label="Customer Care" to="/customer-care" />
              <MenuItem icon={Info} label="About Us" to="/about-us" />
              <div className="border-t my-2" />
              <MenuItem icon={Settings} label="Settings" to="/settings" />
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition" onClick={() => { setShowMenu(false); localStorage.clear(); window.location.href = '/'; }}><LogOut className="w-5 h-5" />Logout</button>
            </nav>
          </div>
        </div>
      )}
      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-bold mb-4 text-blue-700">Set your location</h2>
            <label className="block mb-2 text-sm font-medium">Address/Zip</label>
            <input
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={tempLocation.address}
              onChange={e => setTempLocation({ ...tempLocation, address: e.target.value })}
              placeholder="Enter address or zip code"
            />
            <label className="block mb-2 text-sm font-medium">Store Name</label>
            <input
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={tempLocation.store}
              onChange={e => setTempLocation({ ...tempLocation, store: e.target.value })}
              placeholder="Store name"
            />
            <label className="block mb-2 text-sm font-medium">Type</label>
            <select
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={tempLocation.type}
              onChange={e => setTempLocation({ ...tempLocation, type: e.target.value })}
            >
              <option value="Pickup">Pickup</option>
              <option value="Delivery">Delivery</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                onClick={() => setShowLocationModal(false)}
              >Cancel</button>
              <button
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold"
                onClick={handleLocationSave}
              >Save</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Helper component for menu items
function MenuItem({ icon: Icon, label, to }) {
  const navigate = useNavigate();
  const isActive = window.location.pathname === to;
  return (
    <button
      className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition w-full text-left ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
      onClick={() => { navigate(to); setShowMenu(false); }}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

export default Header;