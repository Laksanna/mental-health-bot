import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebcamCapture from '../components/WebcamCapture';
import ChatWindow from '../components/ChatWindow';
import { detectEmotion, sendMessage } from '../api';

const Icons = {
  Brain: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13h4.5a2 2 0 0 1 0 4H15" /><path d="M12.5 13h-.5" /><path d="M17 17v.5a2 2 0 0 1-2 2H9.5a2 2 0 0 1-2-2v-.5" /><path d="M9 13H4.5a2 2 0 0 1 0-4H9" /><path d="M11.5 13h.5" /></svg>,
  ArrowLeft: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>,
  Shield: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  Alert: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
};

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [currentEmotion, setCurrentEmotion] = useState('Scanning...');
  const [bbox, setBbox] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef(null);

  const emotionHistory = useRef([]);
  const lastProactiveMessageTime = useRef(0);

  useEffect(() => {
    setMessages([
      {
        type: 'bot',
        text: "Hello! I'm here to listen. How are you feeling today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const captureAndDetectEmotion = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        try {
          const blob = await fetch(imageSrc).then((r) => r.blob());
          const result = await detectEmotion(blob);
          if (result.emotion !== currentEmotion) {
            setCurrentEmotion(result.emotion);
          }
          setBbox(result.bbox);
          setHeatmap(result.heatmap);

          emotionHistory.current = [...emotionHistory.current.slice(-2), result.emotion];

          const now = Date.now();
          const cooldown = 30000;
          if (now - lastProactiveMessageTime.current > cooldown) {
            const history = emotionHistory.current;
            if (history.length >= 2 && history.every(e => ['sad', 'angry', 'fear', 'disgust'].includes(e))) {
              triggerProactiveResponse(result.emotion);
              lastProactiveMessageTime.current = now;
            }
          }
        } catch (error) {
          console.error('Error detecting emotion:', error);
        }
      }
    }
  };

  const triggerProactiveResponse = async (emotion) => {
    try {
      const response = await sendMessage(`[PROACTIVE_DETECTION]`, emotion);
      const botMessage = {
        type: 'bot',
        text: response.response,
        intent: response.intent,
        timestamp: new Date(),
        isProactive: true
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Proactive reponse error:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      captureAndDetectEmotion();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentEmotion]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    try {
      const response = await sendMessage(inputMessage, currentEmotion);
      const botMessage = {
        type: 'bot',
        text: response.response,
        intent: response.intent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        type: 'bot',
        text: "I'm sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const moodColors = {
    happy: 'bg-emerald-500',
    sad: 'bg-blue-600',
    angry: 'bg-rose-600',
    fear: 'bg-violet-600',
    surprise: 'bg-amber-400',
    neutral: 'bg-teal-500',
    disgust: 'bg-lime-600',
    'Scanning...': 'bg-slate-500',
  };

  return (
    <div className="h-screen bg-[#0f172a] text-slate-200 selection:bg-teal-500/30 overflow-hidden transition-colors duration-1000 flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] ${moodColors[currentEmotion] || moodColors.neutral} rounded-full blur-[160px] opacity-10 animate-blob transition-all duration-1000`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] ${moodColors[currentEmotion] || moodColors.neutral} rounded-full blur-[160px] opacity-10 animate-blob animation-delay-2000 transition-all duration-1000`}></div>
      </div>

      <nav className="flex-shrink-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-tr from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <span className="w-6 h-6 text-white"><Icons.Brain /></span>
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase hidden sm:block">System <span className="text-teal-400">Interface</span></span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="group flex items-center space-x-3 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
              >
                <span className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"><Icons.ArrowLeft /></span>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-8 flex-1 flex flex-col min-h-0">
        {/* Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0 py-8">
          <aside className="lg:col-span-5 h-full flex flex-col min-h-0 animate-fade-in-up">
            <WebcamCapture
              webcamRef={webcamRef}
              currentEmotion={currentEmotion}
              bbox={bbox}
              heatmap={heatmap}
            />
          </aside>

          <section className="lg:col-span-7 h-full flex flex-col min-h-0 animate-fade-in shadow-2xl">
            <div className="flex-1 bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col">
              <ChatWindow
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
                handleKeyPress={handleKeyPress}
                isLoading={isLoading}
                currentEmotion={currentEmotion}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
