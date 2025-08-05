import React from 'react';

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '1234', expiry: '12/26' },
  { id: 2, type: 'UPI', last4: 'eco@upi', expiry: '' },
];
const transactions = [
  { id: 1, date: '2024-07-10', desc: 'Order #12345', amount: '-$49.99' },
  { id: 2, date: '2024-07-08', desc: 'Reward Points Credit', amount: '+$5.00' },
  { id: 3, date: '2024-07-01', desc: 'Order #12344', amount: '-$29.99' },
];

const WalletsPage: React.FC = () => (
  <div className="min-h-screen px-4 pt-20 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50">
    <h1 className="text-3xl font-bold mb-6">Wallets</h1>
    <div className="w-full max-w-xl space-y-6">
      <div className="bg-white/80 rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-700">Wallet Balance</span>
          <span className="text-2xl font-bold text-green-600">$54.00</span>
        </div>
        <div className="text-xs text-gray-400">Includes reward points and refunds</div>
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Payment Methods</h2>
        <ul className="space-y-2">
          {paymentMethods.map(pm => (
            <li key={pm.id} className="flex items-center justify-between">
              <span>{pm.type} {pm.last4 && <span className="text-gray-400 ml-1">•••• {pm.last4}</span>}</span>
              <span className="text-xs text-gray-400">{pm.expiry}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
        <ul className="space-y-2">
          {transactions.map(tx => (
            <li key={tx.id} className="flex items-center justify-between">
              <span>{tx.date} - {tx.desc}</span>
              <span className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{tx.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default WalletsPage; 