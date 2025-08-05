import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [privacy, setPrivacy] = useState('public');

  return (
    <div className="min-h-screen px-4 pt-20 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="w-full max-w-xl space-y-6">
        <div className="bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
          <div className="mb-2">Change your password, update your email, or manage your account.</div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">Change Password</button>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Notification Preferences</h2>
          <label className="flex items-center mb-2">
            <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} className="mr-2" />
            Email Notifications
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={smsNotif} onChange={() => setSmsNotif(!smsNotif)} className="mr-2" />
            SMS Notifications
          </label>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Privacy Options</h2>
          <select value={privacy} onChange={e => setPrivacy(e.target.value)} className="border rounded p-2">
            <option value="public">Public Profile</option>
            <option value="private">Private Profile</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 