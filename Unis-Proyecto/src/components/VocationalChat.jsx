// VocationalChat.jsx
import React, { useState } from 'react';
import './VocationalChat.css';

export function VocationalChat() {
  const [messages, setMessages] = useState([
    { from: 'ia', text: '¡Hola! Soy tu asistente vocacional. Para empezar, ¿qué cosas te gustan hacer?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages([...messages, userMessage]);

    // respuesta simple de la "IA" según palabras clave
    let iaResponse = 'Interesante, contame más.';
    const lower = input.toLowerCase();
    if (lower.includes('arte')) iaResponse = '¡Genial! Podrías explorar carreras en diseño, música o artes plásticas.';
    if (lower.includes('ciencia')) iaResponse = '¡Perfecto! Las ciencias te podrían llevar a ingeniería, biología o física.';
    if (lower.includes('programación')) iaResponse = '¡Ah, programar es lo tuyo! Podrías estudiar desarrollo de software o ingeniería informática.';

    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'ia', text: iaResponse }]);
    }, 500);

    setInput('');
  };

  return (
    <div className="vocational-chat">
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'ia' ? 'msg ia' : 'msg user'}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Escribí tu respuesta..." 
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}
