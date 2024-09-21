'use client';

import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { Bot, Send, User } from 'lucide-react';

type Props = {}

interface Message {
    text: string;
    sender: 'human' | 'ai';
}

const Chatbox = (props: Props) => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<[string, string]>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'human' }]);
    setChatHistory([...chatHistory, ['human', input]]);
    setIsLoading(true);

    // TODO: send message to backend


    setInput('');
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[80vh] w-4/5 mx-auto bg-white shadow-lg">
      {/* Chat messages display area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Example messages - replace with actual message rendering logic */}
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'human' ? 'justify-end' : 'justify-start'}`}>
            <Avatar className='mr-2' style={{ backgroundColor: message.sender === 'human' ? '#E6F3FF' : '#FFF0E6' }}>
              {message.sender === 'human' ? <User className='small' style={{ color: '#3B82F6' }} /> : <Bot className='small' style={{ color: '#F97316' }} />}
            </Avatar>
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
              message.sender === 'human'
                ? 'bg-blue-500 text-white rounded-l-lg rounded-br-lg'
                : 'bg-gray-200 text-gray-800 rounded-r-lg rounded-bl-lg'
            } px-4 py-2 shadow break-words`}>
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-r-lg rounded-bl-lg px-4 py-2 shadow">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t-2 border-gray-200 px-4 py-2">
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="mr-2 w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-100 rounded-md py-2 "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <div className="right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-3 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              onClick={handleSendMessage}
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbox