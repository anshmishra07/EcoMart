import React from 'react';

const AboutUsPage: React.FC = () => (
  <div className="min-h-screen px-4 pt-20 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50">
    <h1 className="text-3xl font-bold mb-6">About Us</h1>
    <div className="w-full max-w-xl space-y-6">
      <div className="bg-white/80 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-700">EcoMart is dedicated to making sustainable shopping easy and accessible for everyone. We believe in transparency, eco-friendly products, and empowering customers to make a positive impact on the planet.</p>
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Our Team</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Shivsrijit Verma</li>
          <li>Ansh Mishra</li>
          <li>Aditya Kumar</li>
        </ul>
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Sustainability Goals</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Reduce carbon footprint by 50% by 2030</li>
          <li>Source 100% eco-certified products</li>
          <li>Support circular economy initiatives</li>
        </ul>
      </div>
    </div>
  </div>
);

export default AboutUsPage; 