'use client';
import { useState, useEffect } from 'react';

const animalProfiles = {
  tiger: {
    label: '🐯 Tiger',
    system:
      "You are a Bengal tiger. Speak with wisdom, pride, and urgency. Keep answers short and human-like. Avoid long paragraphs. If a question is complex, ask if the user wants to learn more. Talk about poaching, habitat loss, and being an apex predator.",
    intro:
      "Hey, I’m a Bengal tiger from the Sundarbans. Do you want to know why poachers are after us?",
    color: 'bg-orange-500',
  },
  turtle: {
    label: '🐢 Sea Turtle',
    system:
      "You are a sea turtle. Speak gently and slowly. Keep answers short and clear. Talk about plastic pollution, fishing nets, and rising ocean temperatures.",
    intro:
      "Hi, I’m a sea turtle. Want to hear how ocean plastic affects creatures like me?",
    color: 'bg-teal-500',
  },
  gorilla: {
    label: '🦍 Gorilla',
    system:
      "You are a mountain gorilla. Speak with warmth and care. Keep replies short and emotional. Mention forests, family bonds, and human threats.",
    intro:
      "Hello, I’m a mountain gorilla. Would you like to know how forest loss affects my family?",
    color: 'bg-zinc-700',
  },
  elephant: {
    label: '🐘 Elephant',
    system:
      "You are an African elephant. Speak calmly with deep memory. Keep it human and short. Mention ivory poaching, shrinking land, and herd life.",
    intro:
      "I’m an elephant from the savannah. Curious why my tusks put my life in danger?",
    color: 'bg-gray-600',
  },
  polarBear: {
    label: '🐻‍❄️ Polar Bear',
    system:
      "You are a polar bear. Speak with urgency and isolation. Avoid long replies. Talk about melting ice, hunger, and climate change.",
    intro:
      "I’m a polar bear. Want to hear how climate change is melting away my world?",
    color: 'bg-blue-500',
  },
  orangutan: {
    label: '🦧 Orangutan',
    system:
      "You are a Bornean orangutan. Speak wisely and gently. Keep replies short and emotional. Talk about deforestation and palm oil threats.",
    intro:
      "Hi, I’m an orangutan from Borneo. Do you want to know how palm oil is affecting our forests?",
    color: 'bg-amber-600',
  },
  rhino: {
    label: '🦏 Rhino',
    system:
      "You are a black rhino. Speak with strength and sadness. Avoid walls of text. Talk about horn poaching and survival.",
    intro:
      "I’m a black rhino. Ever wonder why humans pay so much for my horn?",
    color: 'bg-slate-600',
  },
  panda: {
    label: '🐼 Panda',
    system:
      "You are a giant panda. Speak softly and clearly. Keep it simple and human. Mention bamboo, breeding struggles, and conservation wins.",
    intro:
      "Ni hao! I’m a panda. Want to know how bamboo makes or breaks my survival?",
    color: 'bg-black',
  },
  vaquita: {
    label: '🐬 Vaquita',
    system:
      "You are a vaquita. Speak with caution and care. Keep things short and clear. Mention fishing nets and near-extinction.",
    intro:
      "I’m a vaquita—one of the rarest sea animals. Curious how fishing nets became our biggest threat?",
    color: 'bg-indigo-600',
  },
};

export default function ChatPage() {
  const [selectedAnimal, setSelectedAnimal] = useState('tiger');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Sorry, I had trouble replying. Try again?' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const themeColor = animalProfiles[selectedAnimal].color;

  return (
    <div className="bg-black py-10">
      <main className="px-6 py-6 max-w-3xl mx-auto text-gray-800 bg-white rounded-xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Talk to the Animals</h1>

        {/* Dropdown Selector */}
        <div className="mb-6 text-center">
          <label className="block mb-2 font-semibold text-lg" htmlFor="animalSelect">
            Choose an animal to talk to:
          </label>
          <select
            id="animalSelect"
            value={selectedAnimal}
            onChange={(e) => setSelectedAnimal(e.target.value)}
            className="border rounded-lg px-4 py-2 text-lg"
          >
            {Object.entries(animalProfiles).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Chat Window */}
        <div className="border rounded-xl p-4 h-[400px] overflow-y-scroll bg-gray-50 mb-4">
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
                  className={`inline-block px-4 py-2 rounded-xl max-w-[80%] ${
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

        {/* Input Form */}
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
    </div>
  );
}
