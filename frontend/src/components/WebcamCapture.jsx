import React from 'react';
import Webcam from 'react-webcam';

const Icons = {
  Happy: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
  Sad: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
  Angry: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 14s-1.5 2-4 2-4-2-4-2" /><line x1="9" y1="10" x2="9.01" y2="10" /><line x1="15" y1="10" x2="15.01" y2="10" /><path d="M10 8l-2 1" /><path d="M14 8l2 1" /></svg>,
  Fear: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
  Surprise: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="14.5" r="2.5" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
  Neutral: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="8" y1="15" x2="16" y2="15" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
  Disgust: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-1-4-1-4 1-4 1" /><path d="M9 9c.5.5 1.5.5 2 0" /><path d="M15 9c.5.5 1.5.5 2 0" /></svg>,
  Vision: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></svg>,
  Alert: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
};

const WebcamCapture = ({ webcamRef, currentEmotion, bbox, heatmap }) => {
  const [cameraError, setCameraError] = React.useState(null);
  const [isCameraReady, setIsCameraReady] = React.useState(false);

  const emotionComponents = {
    happy: Icons.Happy,
    sad: Icons.Sad,
    angry: Icons.Angry,
    fear: Icons.Fear,
    surprise: Icons.Surprise,
    neutral: Icons.Neutral,
    disgust: Icons.Disgust,
    'Scanning...': Icons.Vision,
  };

  const getBboxStyle = () => {
    if (!bbox) return { display: 'none' };
    const [x, y, w, h] = bbox;
    return {
      left: `${(x / 640) * 100}%`,
      top: `${(y / 480) * 100}%`,
      width: `${(w / 640) * 100}%`,
      height: `${(h / 480) * 100}%`,
      borderColor: '#14b8a6',
      borderWidth: '2.5px',
      borderStyle: 'solid',
      position: 'absolute',
      pointerEvents: 'none',
      transition: 'all 0.1s ease-out',
      zIndex: 50
    };
  };

  const handleUserMedia = () => {
    setIsCameraReady(true);
    setCameraError(null);
  };

  const handleUserMediaError = (error) => {
    console.error('Webcam error:', error);
    if (error.name === 'NotAllowedError') {
      setCameraError('Permission denied.');
    } else if (error.name === 'NotFoundError') {
      setCameraError('No camera found.');
    } else {
      setCameraError('Access error.');
    }
    setIsCameraReady(false);
  };

  const CurrentIcon = emotionComponents[currentEmotion] || Icons.Neutral;

  return (
    <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-6 sm:p-7 shadow-2xl animate-fade-in-up h-full flex flex-col">
      <div className="flex flex-shrink-0 items-center justify-between mb-6 px-1">
        <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center">
          <span className="mr-3 w-5 h-5 text-teal-400 opacity-80"><Icons.Vision /></span>
          Facial Analysis
        </h2>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-teal-500/5 rounded-full border border-teal-500/10">
          <div className={`w-1.5 h-1.5 rounded-full ${isCameraReady ? 'bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)] animate-pulse' : 'bg-rose-500'}`}></div>
          <span className="text-[9px] font-black text-teal-500 uppercase tracking-widest">{isCameraReady ? 'Live' : 'Off'}</span>
        </div>
      </div>

      <div className="group relative rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl border border-white/5 flex-1 min-h-0">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className={`w-full h-full object-cover transition-all duration-1000 ${isCameraReady ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: 'user',
          }}
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
        />

        {isCameraReady && bbox && (
          <div style={getBboxStyle()} className="rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all overflow-hidden flex items-center justify-center">
            {heatmap && (
              <img
                src={`data:image/jpeg;base64,${heatmap}`}
                alt="AI Analysis Heatmap"
                className="w-full h-full object-cover opacity-70 mix-blend-screen pointer-events-none"
              />
            )}
            <div className="absolute -top-7 left-[-2.5px] bg-teal-500 text-white text-[9px] font-black px-3 py-1.5 rounded-t-xl flex items-center shadow-xl uppercase tracking-widest border border-teal-400">
              <span className="mr-2 w-3.5 h-3.5"><CurrentIcon /></span>
              {currentEmotion}
            </div>
          </div>
        )}

        {!isCameraReady && !cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d121f] text-slate-600 p-8 text-center space-y-6">
            <div className="w-16 h-16 border-4 border-teal-500/10 border-t-teal-500 rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Syncing Sensors...</p>
          </div>
        )}

        {cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 text-rose-400 p-8 text-center">
            <span className="w-12 h-12 mb-6 text-rose-500/50"><Icons.Alert /></span>
            <p className="text-xs font-black uppercase tracking-widest mb-2">Sync Library Error</p>
            <p className="text-[10px] text-slate-500 max-w-[200px] mb-8 leading-relaxed italic">{cameraError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all active:scale-95"
            >
              Reconnect
            </button>
          </div>
        )}

        {isCameraReady && !bbox && (
          <div className="absolute top-6 left-6 flex items-center space-x-3 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl animate-fade-in shadow-2xl">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
            <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">Targeting Face...</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex-shrink-0">
        <div className={`relative overflow-hidden group/card bg-white/5 p-5 rounded-[2rem] border border-white/5 hover:border-teal-500/30 transition-all duration-700`}>
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Predicted Emotion</p>
              <p className="text-2xl font-black text-white capitalize tracking-tighter group-hover/card:text-teal-400 transition-colors">{currentEmotion}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400 shadow-inner group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-700">
              <div className="w-7 h-7"><CurrentIcon /></div>
            </div>
          </div>
          <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${currentEmotion === 'neutral' || currentEmotion === 'Scanning...' ? 'bg-slate-500/5' : 'bg-teal-500/10'} rounded-full blur-3xl group-hover/card:scale-150 transition-transform duration-1000`}></div>
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
