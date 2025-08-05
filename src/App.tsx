
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import EcoTracker from './pages/EcoTracker';
import CircularMarketplace from './pages/CircularMarketplace';
import AuthProvider from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SustainabilityProvider } from './contexts/SustainabilityContext';
import BiometricAuth from './components/BiometricAuth';
import './styles/animations.css';
import SupplierProfile from './pages/SupplierProfile';
import NoPasswordLogin from './pages/NoPasswordLogin';
import SustainabilityTips from './pages/SustainabilityTips';
import AccountPage from './pages/AccountPage';
import ReviewsFeedbacksPage from './pages/ReviewsFeedbacksPage';
import HelpPage from './pages/HelpPage';
import CustomerCarePage from './pages/CustomerCarePage';
import NotificationsPage from './pages/NotificationsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import WalletsPage from './pages/WalletsPage';
import AboutUsPage from './pages/AboutUsPage';
import SettingsPage from './pages/SettingsPage';
import ChatBot from './components/ChatBot';

// Dummy supplier login page
function SupplierLogin({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy check: user = supplier, pass = password123
    if (userId === 'supplier' && password === 'password123') {
      onLogin();
      navigate('/supplier');
    } else {
      setError('Invalid credentials. Try user: supplier, pass: password123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Supplier Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">User ID</label>
          <input value={userId} onChange={e => setUserId(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded p-2" />
        </div>
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition">Login</button>
        <div className="text-xs text-gray-400 mt-2">Try user: <b>supplier</b>, pass: <b>password123</b></div>
      </form>
    </div>
  );
}

function App() {
  const [supplierLoggedIn, setSupplierLoggedIn] = useState(false);
  // Remove userLoggedIn and biometric login logic

  return (
    <AuthProvider>
      <CartProvider>
        <SustainabilityProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
              <Header />
              <main className="pt-16 px-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/eco-tracker" element={<EcoTracker />} />
                  <Route path="/circular-marketplace" element={<CircularMarketplace />} />
                  <Route path="/sustainability-tips" element={<SustainabilityTips />} />
                  <Route path="/supplier-login" element={<SupplierLogin onLogin={() => setSupplierLoggedIn(true)} />} />
                  <Route path="/supplier" element={supplierLoggedIn ? <SupplierProfile /> : <Navigate to="/supplier-login" />} />
                  <Route path="/no-password-login" element={<NoPasswordLogin />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/reviews-feedbacks" element={<ReviewsFeedbacksPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/customer-care" element={<CustomerCarePage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/wallets" element={<WalletsPage />} />
                  <Route path="/about-us" element={<AboutUsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </main>
              <ChatBot />
            </div>
          </Router>
        </SustainabilityProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;