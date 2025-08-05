import React, { useState } from 'react';

const mockReviews = [
  { id: 1, user: 'Priya S.', rating: 5, text: 'Loved the eco-friendly packaging and fast delivery!' },
  { id: 2, user: 'Amit K.', rating: 4, text: 'Great selection of sustainable products.' },
  { id: 3, user: 'Sara M.', rating: 5, text: 'Customer care was very helpful with my return.' },
  { id: 4, user: 'Ravi T.', rating: 3, text: 'Would like to see more options in electronics.' },
];

const ReviewsFeedbacksPage: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFeedback('');
  };

  return (
    <div className="min-h-screen pt-20 px-4 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50">
      <h1 className="text-3xl font-bold mb-6">Reviews & Feedbacks</h1>
      <div className="w-full max-w-xl space-y-4 mb-8">
        {mockReviews.map(r => (
          <div key={r.id} className="bg-white/80 rounded-xl shadow p-4">
            <div className="flex items-center mb-2">
              <span className="font-bold text-blue-700 mr-2">{r.user}</span>
              <span className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            </div>
            <div className="text-gray-700">{r.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white/80 rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Leave Feedback</h2>
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={3}
          placeholder="Your feedback..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">Submit</button>
        {submitted && <div className="text-green-600 mt-2">Thank you for your feedback!</div>}
      </form>
    </div>
  );
};

export default ReviewsFeedbacksPage; 