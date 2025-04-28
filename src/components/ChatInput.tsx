
import React, { useState } from 'react';

interface ChatInputProps {
  onSubmit: (theirMessage: string, myMessage?: string) => void;
  type: 'singleInput' | 'doubleInput';
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSubmit, 
  type,
  placeholder = 'Type your message...'
}) => {
  const [theirMessage, setTheirMessage] = useState('');
  const [myMessage, setMyMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (theirMessage.trim()) {
      onSubmit(theirMessage, type === 'doubleInput' ? myMessage : undefined);
      setTheirMessage('');
      setMyMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {type === 'doubleInput' ? (
        <div className="flex flex-col space-y-4 mb-4">
          <div>
            <label htmlFor="theirMessage" className="block text-lg font-medium mb-2">
              Their Reply
            </label>
            <textarea
              id="theirMessage"
              className="w-full h-24 rounded-lg bg-secondary/30 border border-white/10 p-3 text-white focus:ring-2 focus:ring-love/50 focus:outline-none"
              placeholder="Paste their message here..."
              value={theirMessage}
              onChange={(e) => setTheirMessage(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="myMessage" className="block text-lg font-medium mb-2">
              My Reply
            </label>
            <textarea
              id="myMessage"
              className="w-full h-24 rounded-lg bg-secondary/30 border border-white/10 p-3 text-white focus:ring-2 focus:ring-love/50 focus:outline-none"
              placeholder="Type your reply here (optional)"
              value={myMessage}
              onChange={(e) => setMyMessage(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <textarea
            className="w-full h-32 rounded-lg bg-secondary/30 border border-white/10 p-3 text-white focus:ring-2 focus:ring-love/50 focus:outline-none"
            placeholder={placeholder}
            value={theirMessage}
            onChange={(e) => setTheirMessage(e.target.value)}
          />
        </div>
      )}
    </form>
  );
};

export default ChatInput;
