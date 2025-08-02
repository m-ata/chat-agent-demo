'use client';
import { Message, UserType } from '@/types/chat';
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';
import { useState, useRef, useEffect } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<BaseMessage[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = new HumanMessage(input);
    const newMessagesArray = [...messages, userMessage];
    setMessages(newMessagesArray);
    setInput('');

    const botReply = await getBotReply(newMessagesArray);
    setMessages((prev) => [...prev, botReply]);
  };

  const getBotReply = async (messagesArray: BaseMessage[]) => {
    const serialized = messagesArray.map((msg) => msg.toDict());

    const res = await fetch('/api/lang-graph', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: serialized }),
    });

    const data = await res.json();
    return new AIMessage(data.reply);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <header className="p-4 border-b border-zinc-700 flex justify-between">
        <h1 className='text-xl font-semibold'>Open AI Agent</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl px-4 py-2 rounded-lg ${
              msg.getType() === 'human' ? 'bg-blue-600 ml-auto' : 'bg-zinc-800'
            }`}
          >
            {msg.content as string}
          </div>
        ))}
        <div ref={bottomRef} />
      </main>

      <footer className="p-4 border-t border-zinc-700">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex space-x-2"
        >
          <input
            className="flex-1 bg-zinc-800 text-white p-2 rounded-lg outline-none border border-zinc-700"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
