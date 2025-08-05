import React from 'react';

const SupplierProfile: React.FC = () => {
  return (
    <div className="min-h-screen px-4 pt-20 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mt-12">
          <div className="mb-6">
            <div className="text-xs font-bold text-purple-600 uppercase mb-1">For Suppliers</div>
            <h2 className="text-3xl font-bold mb-2">Generative AI for Sustainable Design</h2>
            <p className="text-gray-600 text-lg">AI-powered tools to help suppliers create more sustainable products and packaging.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Eco Packaging Generator */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Eco Packaging Generator</h3>
                <p className="text-gray-500 mb-4">Our AI suggests sustainable packaging options based on your product specifications.</p>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                    <select className="w-full border rounded p-2">
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Home Goods</option>
                      <option>Food</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (grams)</label>
                    <input type="number" className="w-full border rounded p-2" placeholder="" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fragility</label>
                    <select className="w-full border rounded p-2">
                      <option>Not Fragile</option>
                      <option>Fragile</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Average Shipping Distance</label>
                    <select className="w-full border rounded p-2">
                      <option>Local (under 100 miles)</option>
                      <option>Regional (100-500 miles)</option>
                      <option>National (500+ miles)</option>
                      <option>International</option>
                    </select>
                  </div>
                  <button type="button" className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition">Generate Packaging Ideas</button>
                </form>
              </div>
            </div>
            {/* AI-Generated Design Concepts */}
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center min-h-[300px]">
              <h3 className="text-xl font-bold mb-2">AI-Generated Design Concepts</h3>
              <p className="text-gray-500 mb-4 text-center">View and refine AI-generated sustainable packaging designs for your product.</p>
              <div className="flex flex-col items-center justify-center flex-1">
                <span className="text-6xl mb-2">📦</span>
                <span className="text-gray-400">Submit product details to see AI-generated packaging concepts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile; 