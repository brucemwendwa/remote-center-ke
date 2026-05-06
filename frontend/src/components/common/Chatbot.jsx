import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: 'Hi! I\'m Remi 👋 — your remote-finding assistant. What TV are you using?' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { from: 'user', text: input }, { from: 'bot', text: 'Got it! For faster help, WhatsApp us at 0757541507.' }]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full btn-gradient shadow-glow flex items-center justify-center hover:scale-110 transition"
        aria-label="Open chat"
      >
        {open ? <X /> : <MessageCircle />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-80 max-w-[90vw] glass p-0 overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20">
              <div className="font-bold">Remi · RCK Assistant</div>
              <div className="text-xs text-white/60">Typically replies instantly</div>
            </div>
            <div className="p-3 h-72 overflow-auto scrollbar-thin space-y-2">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                    m.from === 'bot' ? 'bg-white/5' : 'ml-auto bg-gradient-to-r from-brand-blue to-brand-cyan'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Type a message…"
                className="flex-1 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm focus:outline-none"
              />
              <button onClick={send} className="p-2 rounded-2xl btn-gradient">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
