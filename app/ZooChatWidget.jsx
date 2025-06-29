'use client';

import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import animalProfiles from './animalData';

const getImagePath = (animal) => animalProfiles[animal]?.image || '';




export default function ZooChatWidget(props) {


  const [showChat, setShowChat] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState('tiger');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [likedStates, setLikedStates] = useState({});

  const animals = props.animals || Object.keys(animalProfiles);

  useEffect(() => {
    const random = animals[Math.floor(Math.random() * animals.length)];
    setSelectedAnimal(random);
  }, []);

  useEffect(() => {
    if (selectedAnimal && animalProfiles[selectedAnimal]) {
      const profile = animalProfiles[selectedAnimal];
      setMessages([
        { role: 'system', content: profile.system },
        { role: 'assistant', content: profile.intro },
      ]);
    }
  }, [selectedAnimal]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://your-vercel-app-url.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const reply = data.response;

      setMessages([...newMessages, reply]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Sorry, I had trouble replying. Try again?' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const themeColor = animalProfiles[selectedAnimal]?.color || '#ccc';

  return (
    <>
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #16a34a',
            boxShadow: '0 0 8px rgba(0,0,0,0.4)',
            zIndex: 9999,
            padding: 0,
          }}
        >
          <img
  src={getImagePath(selectedAnimal)}
  alt="ZooQuest Chat"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>

        </button>
      )}

      {showChat && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '360px',
            height: '500px',
            zIndex: 9999,
            backgroundColor: 'white',
            border: '2px solid black',
            borderRadius: '20px',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'sans-serif',
            padding: 0,
          }}
        >
          {/* Top bar */}
          <div
            style={{
              backgroundColor: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              borderRadius: '20px 20px 0 0',
              margin: '-1px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
            <select
  value={selectedAnimal}
  onChange={(e) => setSelectedAnimal(e.target.value)}
  style={{
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '18px',
    borderRadius: '10px',
    border: '1px solid black',
    padding: '6px 10px',
    color: 'black',
    backgroundColor: 'white',
    maxWidth: '210px',
  }}
>
  {animals.map((key) => (
    <option key={key} value={key}>
      {animalProfiles[key]?.label || key}
    </option>
  ))}
</select>

              <button
                onClick={() =>
                  setLikedStates((prev) => ({
                    ...prev,
                    [selectedAnimal]: !prev[selectedAnimal],
                  }))
                }
                aria-label="Like"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {likedStates[selectedAnimal] ? (
                  <FaHeart style={{ color: 'red', fontSize: '22px' }} />
                ) : (
                  <FaRegHeart style={{ color: 'black', fontSize: '22px' }} />
                )}
              </button>
            </div>

            <button
              onClick={() => setShowChat(false)}
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: 'black',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                top: '-3px',
                right: '6px',
              }}
            >
              ×
            </button>
          </div>

          {/* Chat */}
          <div
            style={{
              flex: 1,
              padding: '8px',
              overflowY: 'auto',
              borderBottom: '1px solid black',
              marginBottom: '20px',
            }}
          >
            {messages
              .filter((msg) => msg.role !== 'system')
              .map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '8px',
                  }}
                >
                  {msg.role === 'assistant' && (
                    <img
                    src={getImagePath(selectedAnimal)}
                    alt="Animal"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      marginRight: '6px',
                      alignSelf: 'center',
                      marginTop: '5px',
                    }}
                  />
                  
                  )}
                  <p
                    style={{
                      padding: '8px 12px',
                      marginTop: '8px',
                      borderRadius: '16px',
                      fontWeight: 'bold',
                      fontSize: '14px',

                      maxWidth: '75%',
                      backgroundColor: msg.role === 'assistant' ? themeColor : '#22c55e',
                      color: 'white',
                    }}
                  >
                    {msg.content}
                  </p>
                </div>
              ))}
          </div>

          <div style={{ padding: '0 9px 12px 9px' }}>
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '6px',
    marginTop: '-8px',
    flexWrap: 'wrap'
  }}>
    {[
      { label: 'Fun Fact', prompt: 'Tell me a fun fact about yourself.' },
      { label: 'Threats', prompt: 'What’s the biggest threat you face?' },
      { label: 'Help', prompt: 'How can I help protect you?' }
    ].map(({ label, prompt }) => (
      <button
        key={label}
        onClick={() => {
          setInput(prompt);
          setTimeout(() => document.querySelector('form').requestSubmit(), 0);
        }}
        style={{
          backgroundColor: '#a7e8bd',
          color: 'black',
          fontSize: '12px',
          border: 'none',
          borderRadius: '20px',
          padding: '6px 12px',
          cursor: 'pointer',
          transform: 'translateY(-4px)'
          
        }}
        type="button"
      >
        {label}
      </button>
    ))}
  </div>

  <form onSubmit={sendMessage} style={{ display: 'flex', gap: '6px' }}>
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Ask me anything..."
      style={{
        flex: 1,
        padding: '8px 10px',
        borderRadius: '8px',
        border: '1px solid gray',
        fontWeight: 'bold',
        color: 'black',
      }}
    />
    <button
      type="submit"
      disabled={loading}
      style={{
        backgroundColor: '#16a34a',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 14px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      {loading ? '...' : 'Send'}
    </button>
  </form>
</div>
        </div>
      )}
    </>
  );
}