import React from 'react';

const Icons = {
  Brain: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.04-2.44 2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2-2.45V4.5A2.5 2.5 0 0 1 9.5 2z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.04-2.44 2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0-2-2.45V4.5A2.5 2.5 0 0 0 14.5 2z" /></svg>,
};

const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 px-1 animate-fade-in`}>
      <div className={`relative flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[75%]`}>

        {!isUser && (
          <div className="flex items-center space-x-3 mb-3 ml-2">
            <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center p-1 shadow-lg shadow-teal-500/20 text-white">
              <Icons.Brain />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">Neural Core Analysis</span>
          </div>
        )}

        <div
          className={`px-6 py-4 rounded-[1.8rem] shadow-2xl transition-all duration-300 ${isUser
            ? 'bg-gradient-to-tr from-teal-500 to-cyan-600 text-white rounded-tr-none border border-white/10'
            : 'bg-white/5 backdrop-blur-3xl text-slate-200 border border-white/5 rounded-tl-none'
            }`}
        >
          <p className="text-sm sm:text-base leading-relaxed font-medium">{message.text}</p>

          <div className={`flex items-center mt-4 pt-3 border-t border-white/[0.03] space-x-4`}>
            {message.intent && (
              <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest bg-teal-500/5 px-2 py-0.5 rounded-full border border-teal-500/10">
                {message.intent}
              </span>
            )}
            <p className={`text-[9px] font-bold text-slate-500 uppercase tracking-widest ${isUser ? 'text-white/40' : ''}`}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        {isUser && (
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-2 mr-2">Processed by System Engine</p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
