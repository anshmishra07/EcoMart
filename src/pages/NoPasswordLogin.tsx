import React, { useState } from 'react';

interface NoPasswordLoginProps {
  onSuccess?: () => void;
}

// Helper: Calculate mean and std deviation
function mean(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function std(arr: number[]) {
  const m = mean(arr);
  return Math.sqrt(arr.reduce((a, b) => a + (b - m) ** 2, 0) / arr.length);
}

const NoPasswordLogin: React.FC<NoPasswordLoginProps> = ({ onSuccess }) => {
  const [phase, setPhase] = useState<'enroll' | 'auth' | 'success' | 'fail'>('enroll');
  const [samples, setSamples] = useState<number[][]>([]);
  const [current, setCurrent] = useState<number[]>([]);
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');

  // Enrollment: collect 3 samples
  const handleKeyDown = () => {
    const now = Date.now();
    if (lastTime) setCurrent(c => [...c, now - lastTime]);
    setLastTime(now);
  };
  const handleEnrollSubmit = () => {
    if (current.length < 5) {
      setMessage('Type a bit more for a good sample.');
      return;
    }
    setSamples(s => [...s, current]);
    setCurrent([]);
    setLastTime(null);
    setMessage('');
    if (samples.length + 1 >= 3) {
      // Save mean/std to localStorage (encrypted in real app)
      const all = [...samples, current];
      const flat = all.flat();
      localStorage.setItem('biometric_mean', mean(flat).toString());
      localStorage.setItem('biometric_std', std(flat).toString());
      setPhase('auth');
    }
  };

  // Authentication: compare sample to enrolled mean/std
  const handleAuthSubmit = () => {
    if (current.length < 5) {
      setMessage('Type a bit more for a good sample.');
      return;
    }
    const m = parseFloat(localStorage.getItem('biometric_mean') || '0');
    const s = parseFloat(localStorage.getItem('biometric_std') || '1');
    const cm = mean(current);
    const cs = std(current);
    // Accept if within 30% of mean/std
    if (Math.abs(cm - m) / m < 0.3 && Math.abs(cs - s) / s < 0.3) {
      setPhase('success');
      if (onSuccess) onSuccess();
    } else {
      setAttempts(a => a + 1);
      setMessage('Pattern not recognized. Try again.');
      if (attempts + 1 >= 3) setPhase('fail');
    }
    setCurrent([]);
    setLastTime(null);
  };

  // Fallback: reset
  const handleReset = () => {
    setSamples([]);
    setCurrent([]);
    setLastTime(null);
    setPhase('enroll');
    setAttempts(0);
    setMessage('');
    localStorage.removeItem('biometric_mean');
    localStorage.removeItem('biometric_std');
  };

  return (
    <div className="min-h-screen px-4 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">No-Password Login</h2>
        {phase === 'enroll' && (
          <>
            <p className="mb-4">Type your username or a phrase 3 times to enroll your typing pattern.</p>
            <input
              type="text"
              onKeyDown={handleKeyDown}
              value={current.map(() => '*').join('')}
              onChange={() => {}}
              className="w-full border rounded p-2 mb-2"
              placeholder="Type here..."
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition mb-2" onClick={handleEnrollSubmit}>Submit Sample</button>
            <div className="text-xs text-gray-500 mb-2">Samples collected: {samples.length}/3</div>
            {message && <div className="text-red-500 text-sm mb-2">{message}</div>}
          </>
        )}
        {phase === 'auth' && (
          <>
            <p className="mb-4">Type your username or phrase to login (pattern will be checked).</p>
            <input
              type="text"
              onKeyDown={handleKeyDown}
              value={current.map(() => '*').join('')}
              onChange={() => {}}
              className="w-full border rounded p-2 mb-2"
              placeholder="Type here..."
            />
            <button className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition mb-2" onClick={handleAuthSubmit}>Login</button>
            {message && <div className="text-red-500 text-sm mb-2">{message}</div>}
          </>
        )}
        {phase === 'success' && (
          <>
            <div className="text-green-600 font-bold mb-4">Login successful! Welcome back.</div>
            <button className="w-full bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition" onClick={handleReset}>Logout</button>
          </>
        )}
        {phase === 'fail' && (
          <>
            <div className="text-red-600 font-bold mb-4">Authentication failed. Please try again or use fallback.</div>
            <button className="w-full bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition" onClick={handleReset}>Restart</button>
          </>
        )}
        <div className="text-xs text-gray-400 mt-4">
          <b>How it works:</b> Your typing rhythm is used as a behavioral biometric. No passwords are stored or required. All data stays on your device.
        </div>
      </div>
    </div>
  );
};

export default NoPasswordLogin; 