import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

const Icons = {
  Chat: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  Send: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="22" y1="2" x2="11" y2="13" /><polyline points="22 2 15 22 11 13 2 9 22 2" /></svg>,
};

const ChatWindow = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleKeyPress,
  isLoading,
  currentEmotion
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const moodSuggestions = {
    happy: ["Feeling great today!", "Share a win", "Spread positivity"],
    sad: ["I'm feeling down", "I need someone to talk to", "Can we do a breathing exercise?"],
    angry: ["I'm really frustrated", "Need to vent", "How to calm down?"],
    fear: ["Help me with my anxiety", "I'm feeling scared", "Grounding exercise"],
    surprise: ["That was unexpected!", "I'm shocked"],
    neutral: ["How are you?", "Just wanted to chat", "Mental wellness tips"],
    disgust: ["This is bothering me", "Feeling unsettled"],
  };

  const currentSuggestions = moodSuggestions[currentEmotion] || moodSuggestions.neutral;

  return (
    <div className="bg-transparent flex flex-col h-full animate-fade-in group/window">
      {/* Standard Header */}
      <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-t-[2.5rem] border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center p-3 shadow-inner border border-white/5 text-teal-400">
                <Icons.Chat />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-4 border-[#0f172a] shadow-lg shadow-teal-500/20"></div>
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center">
                Emotion-Aware Well-Being System
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest">Session Active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(20,184,166,0.3)]"></span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Processing</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8 scroll-smooth scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in pl-2">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl">
              <div className="flex space-x-2">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-8 bg-white/[0.01] border-t border-white/5 space-y-6">
        {/* Smart Suggestions Bar with Fade-in */}
        <div className="flex flex-wrap gap-2 animate-fade-in-up">
          {currentSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputMessage(suggestion);
              }}
              className="px-5 py-2.5 bg-white/5 hover:bg-teal-500/10 border border-white/5 hover:border-teal-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-teal-300 transition-all transform active:scale-95 whitespace-nowrap"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="flex space-x-4 items-end bg-slate-800/10 p-2 rounded-[2.5rem] border border-white/5 group-focus-within:border-teal-500/20 transition-all shadow-inner">
          <div className="flex-1 relative group/input">
            <textarea
              rows="1"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What's on your mind?..."
              className="w-full bg-transparent px-6 py-4 text-white placeholder-slate-600 focus:outline-none transition-all resize-none text-sm leading-relaxed"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="flex items-center justify-center w-14 h-14 bg-teal-500 text-slate-900 rounded-full hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed transition-all transform active:scale-95 group/send"
          >
            <div className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <Icons.Send />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
