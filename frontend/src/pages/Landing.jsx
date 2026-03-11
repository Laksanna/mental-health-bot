import React from 'react';
import { useNavigate } from 'react-router-dom';

const Icons = {
  Brain: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.04-2.44 2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2-2.45V4.5A2.5 2.5 0 0 1 9.5 2z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.04-2.44 2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0-2-2.45V4.5A2.5 2.5 0 0 0 14.5 2z" /></svg>,
  User: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  Camera: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
  Chat: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  Shield: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-teal-500/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-500/5 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/5 rounded-full blur-[160px] animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="w-12 h-12 bg-gradient-to-tr from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center p-2.5 shadow-lg shadow-teal-500/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <span className="w-full h-full text-white"><Icons.Brain /></span>
              </div>
              <span className="text-xl font-black tracking-[0.1em] text-white uppercase">MindCare <span className="text-teal-400">AI</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <button onClick={() => navigate('/signin')} className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-teal-400 transition-colors">Portal Login</button>
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-3.5 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-teal-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl active:scale-95"
              >
                Join System
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={() => navigate('/signin')} className="text-[9px] font-black uppercase tracking-widest bg-teal-500/10 text-teal-400 px-6 py-2.5 rounded-full border border-teal-500/20 active:scale-95 transition-all">Portal</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-44 pb-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-teal-500/5 border border-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-12 animate-fade-in shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span>Neural Empathy Engine v2.0</span>
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black text-white tracking-tighter mb-10 leading-[0.85] animate-fade-in-up">
            TRUE HUMAN <br />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              CONNECTION
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 mb-16 leading-relaxed font-medium animate-fade-in-up delay-200">
            Engineered for deep emotional recognition. MindCare AI bridges the gap between machine intelligence and genuine human clinical support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
            <button
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto px-12 py-6 bg-gradient-to-tr from-teal-500 to-cyan-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-[0_25px_60px_rgba(20,184,166,0.3)] transition-all transform hover:-translate-y-2 active:scale-95"
            >
              Initialize Session
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="w-full sm:w-auto px-12 py-6 bg-white/5 backdrop-blur-xl border border-white/5 text-slate-400 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Access Portal
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-28 flex flex-col items-center justify-center space-y-6 animate-fade-in delay-500">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0f172a] bg-slate-800 flex items-center justify-center p-3 text-slate-500 group">
                  <Icons.User />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-[#0f172a] bg-teal-500 flex items-center justify-center text-[10px] font-black text-white shadow-xl z-10">
                +10K
              </div>
            </div>
            <p className="text-[10px] text-slate-600 font-black tracking-[0.3em] uppercase opacity-60">Verified Global Network Engagement</p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-56">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-teal-500/20 transition-all group hover:shadow-2xl">
              <div className="w-16 h-16 bg-teal-500/5 rounded-2xl flex items-center justify-center p-4 text-teal-400 mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                <Icons.Camera />
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">Vision Recognition</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">Neural facial analysis that captures micro-expressions with sub-millisecond latency.</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all group hover:shadow-2xl">
              <div className="w-16 h-16 bg-cyan-500/5 rounded-2xl flex items-center justify-center p-4 text-cyan-400 mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                <Icons.Chat />
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">Contextual NLP</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">Advanced language modeling optimized for high-empathy clinical conversation support.</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all group hover:shadow-2xl">
              <div className="w-16 h-16 bg-emerald-500/5 rounded-2xl flex items-center justify-center p-4 text-emerald-400 mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                <Icons.Shield />
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">Secure Perimeter</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">Encrypted memory architecture where your biometric and session data never hits the cloud.</p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-64 mb-32">
          <div className="relative overflow-hidden rounded-[4rem] bg-gradient-to-tr from-teal-600 to-cyan-700 p-12 sm:p-28 text-center shadow-[0_40px_100px_rgba(20,184,166,0.2)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tighter leading-none">START REGAINING <br /> YOUR BALANCE.</h2>
            <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto font-bold italic">Bypassing waitlists and bureaucracy. Immediate empathy is a single click away.</p>
            <button
              onClick={() => navigate('/signup')}
              className="px-14 py-6 bg-white text-slate-900 rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:shadow-3xl hover:-translate-y-2 transition-all active:scale-95"
            >
              Download Core Interface
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 pt-28 pb-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center p-2 text-white shadow-lg">
                  <Icons.Brain />
                </div>
                <span className="text-xl font-black tracking-widest text-white uppercase">MindCare AI</span>
              </div>
              <p className="text-slate-500 max-w-sm text-sm leading-relaxed font-bold italic">The world's leading localized emotional intelligence platform. Dedicated to the preservation of human wellness through ethical AI development.</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">Neural Hub</h4>
              <ul className="space-y-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                <li className="hover:text-teal-400 cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-teal-400 cursor-pointer transition-colors">Architecture</li>
                <li className="hover:text-teal-400 cursor-pointer transition-colors">Privacy Lexicon</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">Urgent Support</h4>
              <ul className="space-y-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                <li><span className="text-teal-500 mr-2">988</span> Crisis Lifeline</li>
                <li><span className="text-teal-400 mr-2">741741</span> Text Portal</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">Compliance</h4>
              <p className="text-[9px] text-slate-600 leading-relaxed uppercase tracking-tighter font-bold">
                NON-CLINICAL INTERFACE. NOT A REPLACEMENT FOR MEDICAL ADVICE. SESSION END TERMINATES ALL VOLATILE DATA STORAGE.
              </p>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">&copy; 2026 MindCare AI Research Laboratory</p>
            <div className="flex space-x-8 text-[9px] font-black text-slate-700 uppercase tracking-widest">
              <span>System Status: Optimal</span>
              <span>v2.0.4 r7</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
