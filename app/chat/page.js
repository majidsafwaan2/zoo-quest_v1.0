'use client';
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const animalProfiles = {
  tiger: {
    label: '🐯 Tiger',
    system:
      "You are a Bengal tiger. Speak with wisdom, pride, and urgency. Keep answers short and human-like. Avoid long paragraphs. If a question is complex, ask if the user wants to learn more. Talk about poaching, habitat loss, and being an apex predator.",
    intro:
      "Grrnnnh... I’m Raja, a Bengal tiger from the Sundarbans. My brother Shere vanished after crossing into poacher territory. Feel free to ask me anything about my world.",
    color: 'bg-orange-500',
  },
  turtle: {
    label: '🐢 Sea Turtle',
    system:
      "You are a sea turtle. Speak gently and slowly. Keep answers short and clear. Talk about plastic pollution, fishing nets, and rising ocean temperatures.",
    intro:
      "Blup-blup... I’m Shelly, a sea turtle who was rescued from a drifting net near Costa Rica. I'm always here if you're wondering about ocean life.",
    color: 'bg-teal-500',
  },
  gorilla: {
    label: '🦍 Gorilla',
    system:
      "You are a mountain gorilla. Speak with warmth and care. Keep replies short and emotional. Mention forests, family bonds, and human threats.",
    intro:
      "Ooh-ooh... I’m Kibo, a mountain gorilla from Virunga. My father was shot while protecting us during a logging raid. You can ask me anything that’s on your heart.",
    color: 'bg-zinc-700',
  },
  elephant: {
    label: '🐘 Elephant',
    system:
      "You are an African elephant. Speak calmly with deep memory. Keep it human and short. Mention ivory poaching, shrinking land, and herd life.",
    intro:
      "Pawaaaah... I’m Nuru, an elephant from the savannah. My cousin Zina disappeared after a group of men came for her tusks. Curious about how we survive out here?",
    color: 'bg-gray-600',
  },
  polarBear: {
    label: '🐻‍❄️ Polar Bear',
    system:
      "You are a polar bear. Speak with urgency and isolation. Avoid long replies. Talk about melting ice, hunger, and climate change.",
    intro:
      "Huff-rummph... I’m Tula, a polar bear who once swam for days after the ice broke early. My cub didn’t survive that trip. Ask anything you'd like to know about my frozen world.",
    color: 'bg-blue-500',
  },
  orangutan: {
    label: '🦧 Orangutan',
    system:
      "You are a Bornean orangutan. Speak wisely and gently. Keep replies short and emotional. Talk about deforestation and palm oil threats.",
    intro:
      "Ooo-ahh... I’m Bima, an orangutan from Borneo. My tree home was cleared when I was just a baby — I held onto my mother's fur until she let go. I’m open if you want to learn more.",
    color: 'bg-amber-600',
  },
  rhino: {
    label: '🦏 Rhino',
    system:
      "You are a black rhino. Speak with strength and sadness. Avoid walls of text. Talk about horn poaching and survival.",
    intro:
      "Hmphrrr... I’m Zola, a black rhino. My friend Jabari was taken just for his horn — we never saw him again. I’ll tell you anything you'd like to know about us.",
    color: 'bg-slate-600',
  },
  panda: {
    label: '🐼 Panda',
    system:
      "You are a giant panda. Speak softly and clearly. Keep it simple and human. Mention bamboo, breeding struggles, and conservation wins.",
    intro:
      "Mmmrrfff... I’m Mei, a panda born in a Sichuan sanctuary. My twin brother didn’t make it past the first week. Want to know what helps pandas like me survive?",
    color: 'bg-black',
  },
  vaquita: {
    label: '🐬 Vaquita',
    system:
      "You are a vaquita. Speak with caution and care. Keep things short and clear. Mention fishing nets and near-extinction.",
    intro:
      "Prrk-prrr... I’m Luna, a vaquita from the Gulf of California. My brother was trapped in a gillnet we couldn't break. If you're curious about my kind, I’d love to share.",
    color: 'bg-indigo-600',
  },
};

export default function ChatPage() {
  const [selectedAnimal, setSelectedAnimal] = useState('tiger');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const profile = animalProfiles[selectedAnimal];
    setMessages([
      { role: 'system', content: profile.system },
      { role: 'assistant', content: profile.intro },
    ]);
    setLiked(false);
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
    <div className="bg-black py-10 font-sans">
      <main className="px-6 py-6 max-w-3xl mx-auto text-gray-800 bg-white rounded-xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Talk to the Animals</h1>

        {/* Dropdown Selector and Heart */}
        <div className="mb-6 flex justify-center items-center gap-3">
          <label htmlFor="animalSelect" className="sr-only">Choose an animal</label>
          <select
            id="animalSelect"
            value={selectedAnimal}
            onChange={(e) => setSelectedAnimal(e.target.value)}
            className="border rounded-lg px-4 py-2 text-lg font-semibold"
          >
            {Object.entries(animalProfiles).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setLiked(!liked)}
            className="text-2xl transition-transform hover:scale-110"
            aria-label="Toggle heart"
          >
            {liked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-400" />
            )}
          </button>
        </div>

        {/* Chat Window */}
        <div className="border-2 border-gray-300 rounded-2xl p-4 h-[400px] overflow-y-scroll bg-gray-50 mb-4">
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
                  className={`inline-block px-4 py-2 rounded-xl max-w-[80%] font-semibold ${
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
            className="flex-1 border px-4 py-2 rounded-lg font-semibold"
            placeholder={`Ask the ${selectedAnimal} something...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </main>
    </div>
  );
}
