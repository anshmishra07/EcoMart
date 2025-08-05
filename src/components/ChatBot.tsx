import React, { useState, useRef, useEffect } from 'react';

const QA_PAIRS: { q: string; a: string }[] = [
  { q: 'What is the most sustainable product?', a: 'Our most sustainable products have the highest eco scores. Check the "Sustainable Products" section for details.' },
  { q: 'How do I buy a product?', a: 'Click on any product card to view details and add it to your cart.' },
  { q: 'What is eco score?', a: 'Eco score is a measure of a product’s environmental impact, rated from 0 to 100.' },
  { q: 'How do I contact support?', a: 'You can reach customer care from the menu or the Customer Care page.' },
  { q: 'Do you have circular marketplace?', a: 'Yes! You can resell or recycle old items in our Circular Marketplace.' },
];

function getBotResponse(userMsg: string): string {
  const lower = userMsg.toLowerCase();
  for (const pair of QA_PAIRS) {
    if (lower.includes(pair.q.toLowerCase())) return pair.a;
  }
  if (lower.includes('hello') || lower.includes('hi')) return 'Hello! How can I help you with our products?';
  return "Sorry, I don't know the answer to that. Try asking about products, eco score, or support.";
}

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { from: 'user', text: userMsg }]);
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { from: 'bot', text: getBotResponse(userMsg) }]);
    }, 500);
    setInput('');
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl focus:outline-none"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          💬
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-8 right-8 z-50 w-80 max-w-full bg-white rounded-2xl shadow-2xl flex flex-col border border-blue-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100 bg-blue-50 rounded-t-2xl">
            <span className="font-bold text-blue-700">AI Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 text-xl font-bold">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2" style={{ maxHeight: 320 }}>
            {messages.length === 0 && (
              <div className="text-gray-400 text-sm text-center mt-8">Ask me about products, eco score, or support!</div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`my-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-lg text-sm max-w-[75%] ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t border-blue-100">
            <input
              className="flex-1 px-4 py-2 rounded-bl-2xl focus:outline-none"
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
            />
            <button
              className="px-4 py-2 text-blue-600 font-bold hover:text-blue-800 focus:outline-none"
              onClick={sendMessage}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot; 