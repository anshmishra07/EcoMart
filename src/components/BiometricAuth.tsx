import React, { useState } from 'react';
import { BiometricProfile } from '../types';

interface BiometricAuthProps {
  onSuccess: () => void;
}

const BiometricAuth: React.FC<BiometricAuthProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate biometric data collection and verification
  const handleAuthenticate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate delay and mock biometric data
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const mockBiometricProfile: BiometricProfile = {
        keystrokeDynamics: [0.12, 0.15, 0.11, 0.13],
        mouseMovements: [
          { x: 10, y: 20, timestamp: Date.now() },
          { x: 15, y: 25, timestamp: Date.now() + 100 },
        ],
        touchPressure: [0.8, 0.7, 0.9],
        scrollingBehavior: [0.5, 0.6, 0.55],
        deviceFingerprint: 'device-12345',
      };
      // In a real app, you would send this to the backend for verification
      // For now, just call onSuccess
      onSuccess();
    } catch (e) {
      setError('Biometric authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Biometric Authentication</h2>
        <p className="mb-6 text-gray-600">For your security, please complete biometric authentication to continue.</p>
        <button
          onClick={handleAuthenticate}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Authenticating...' : 'Authenticate'}
        </button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default BiometricAuth;