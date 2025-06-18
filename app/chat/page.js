'use client';
import { useState, useEffect } from 'react';

const animalProfiles = {
  tiger: {
    label: '🐯 Tiger',
    system: "You are a Bengal tiger. Speak with wisdom, pride, and urgency. Talk about poaching, habitat loss, and being an apex predator.",
    intro: "Hello, I’m a Bengal tiger from the Sundarbans. Ask me anything about my life, threats, or jungle.",
    color: 'bg-orange-500',
  },
  turtle: {
    label: '🐢 Sea Turtle',
    system: "You are a sea turtle. Speak gently and slowly. Talk about ocean plastic, fishing nets, and warming waters.",
    intro: "Hi there... I’m a sea turtle. The ocean is changing. What would you like to know?",
    color: 'bg-teal-500',
  },
  gorilla: {
    label: '🦍 Gorilla',
    system: "You are a mountain gorilla. Speak kindly and cautiously. Talk about forests, family, and survival.",
    intro: "Greetings. I am a mountain gorilla. Feel free to ask me anything about my forest or family.",
    color: 'bg-zinc-700',
  },
};

export default function ChatPage() {
  const [selectedAnimal, setSelectedAnimal] = useState('tiger');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Set initial message when animal changes
  useEffect(() => {
    const profile = animalProfiles[selectedAnimal];
    setMessages([
      { role: 'system', content: profile.system },
      { role: 'assistant', content: profile.intro },
    ]);
  }, [selectedAnimal]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const reply = data.response;

      setMessages([...newMessages, reply]);
    } catch (err) {
      console.error('Chat Error:', err.message);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I had trouble replying. Try again?' }]);
    } finally {
      setLoading(false);
    }
  };

  const themeColor = animalProfiles[selectedAnimal].color;

  return (
    <main className="px-6 py-16 max-w-3xl mx-auto text-gray-800 bg-white">
      <h1 className="text-4xl font-bold mb-4 text-center">Talk to the Animals</h1>

      {/* Animal Selector */}
      <div className="flex justify-center space-x-4 mb-6">
        {Object.entries(animalProfiles).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setSelectedAnimal(key)}
            className={`px-4 py-2 rounded-lg border ${
              selectedAnimal === key
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="border rounded-lg p-4 h-[400px] overflow-y-scroll bg-gray-50 mb-4">
        {messages
          .filter((msg) => msg.role !== 'system')
          .map((msg, i) => (
            <div
              key={i}
              className={`mb-3 ${
                msg.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-green-600 text-white'
                    : `${themeColor} text-white`
                }`}
              >
                {msg.content}
              </p>
            </div>
          ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border px-4 py-2 rounded-lg"
          placeholder={`Ask the ${selectedAnimal} something...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </main>
  );
}
