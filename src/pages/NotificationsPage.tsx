import React from 'react';

const notifications = [
  { id: 1, type: 'order', message: 'Your order #12345 has been shipped!', time: '2h ago' },
  { id: 2, type: 'eco', message: 'Eco Tip: Bundle your orders to reduce shipping emissions.', time: '5h ago' },
  { id: 3, type: 'reward', message: 'You earned 50 reward points for your last purchase!', time: '1d ago' },
  { id: 4, type: 'order', message: 'Order #12344 delivered. Rate your experience.', time: '2d ago' },
  { id: 5, type: 'eco', message: 'Eco Tip: Choose products with high eco scores.', time: '3d ago' },
];

const NotificationsPage: React.FC = () => (
  <div className="min-h-screen pt-20 px-4 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50">
    <h1 className="text-3xl font-bold mb-6">Notifications</h1>
    <div className="w-full max-w-xl space-y-4">
      {notifications.map(n => (
        <div key={n.id} className="bg-white/80 rounded-xl shadow p-4 flex items-center space-x-4">
          <span className={`text-2xl ${n.type === 'order' ? 'text-blue-500' : n.type === 'eco' ? 'text-green-500' : 'text-yellow-500'}`}>{n.type === 'order' ? '📦' : n.type === 'eco' ? '🌱' : '🏆'}</span>
          <div className="flex-1">
            <div className="text-gray-800 font-medium">{n.message}</div>
            <div className="text-xs text-gray-400">{n.time}</div>
          </div>
        </div>
      ))}
      {notifications.length === 0 && <div className="text-gray-400 text-center">No notifications yet.</div>}
    </div>
  </div>
);

export default NotificationsPage; 