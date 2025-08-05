import React, { useState } from 'react';

const faqs = [
  { q: 'How do I track my order?', a: 'Go to your profile > orders, or check notifications for updates.' },
  { q: 'How do I return a product?', a: 'Visit your order details and click on "Request Return".' },
  { q: 'How do I contact support?', a: 'Use the form below or email support@ecomart.com.' },
];

const CustomerCarePage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-20 px-4 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50">
      <h1 className="text-3xl font-bold mb-6">Customer Care</h1>
      <div className="w-full max-w-xl space-y-6 mb-8">
        <div className="bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <div className="mb-2 text-gray-700">Email: <a href="mailto:shivsrijit@gmail.com" className="text-blue-600 underline">shivsrijit@gmail.com</a></div>
          <div className="mb-2 text-gray-700">Phone: <a href="tel:+91 6392437478" className="text-blue-600 underline">+91 6392437478</a></div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Support Form</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" placeholder="Your Name" required />
            <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" placeholder="Your Email" required />
            <textarea name="message" value={form.message} onChange={handleChange} className="w-full border rounded p-2" rows={3} placeholder="How can we help you?" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">Send</button>
            {submitted && <div className="text-green-600 mt-2">Thank you! Our team will get back to you soon.</div>}
          </form>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">FAQs</h2>
          <ul className="space-y-2">
            {faqs.map((f, i) => (
              <li key={i}>
                <span className="font-semibold text-blue-700">Q: {f.q}</span>
                <div className="ml-2 text-gray-700">A: {f.a}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerCarePage; 