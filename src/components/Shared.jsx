import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Settings } from 'lucide-react';

export const InteractiveBackground = () => {
  const bgRef = React.useRef(null);
  
  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e) => {
      if (!ticking && bgRef.current) {
        window.requestAnimationFrame(() => {
          const x = e.clientX;
          const y = e.clientY;
          
          const isOverElement = e.target.closest('.bento-card') !== null;
          
          bgRef.current.style.setProperty('--mouse-x', `${x}px`);
          bgRef.current.style.setProperty('--mouse-y', `${y}px`);
          bgRef.current.style.setProperty('--glow-opacity', isOverElement ? '0' : '1');
          
          const xOrigin = window.innerWidth / 2;
          const yOrigin = window.innerHeight / 2;
          const xOffset = (x - xOrigin) / xOrigin;
          const yOffset = (y - yOrigin) / yOrigin;
          bgRef.current.style.setProperty('--bg-x', `${xOffset * -20}px`);
          bgRef.current.style.setProperty('--bg-y', `${yOffset * -20}px`);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={bgRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-20 bg-black">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16,185,129,0.15), transparent 40%)`,
          opacity: 'var(--glow-opacity, 1)',
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      ></div>
    </div>
  );
};

export const MicroUIStyles = () => (
  <style>{`
    @keyframes cursorMove {
      0%, 100% { transform: translate(40px, 40px); }
      40% { transform: translate(12px, 24px); }
      50% { transform: translate(12px, 24px) scale(0.85); }
      60% { transform: translate(12px, 24px) scale(1.05); }
    }
    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes pulse-glow {
      0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
      }
      50% { 
        transform: scale(1.05);
        box-shadow: 0 0 40px rgba(16, 185, 129, 0.6);
      }
    }
    .liquid-glass-card {
      position: relative;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.015), rgba(255, 255, 255, 0.005));
      background-color: rgba(8, 8, 8, 0.4);
      backdrop-filter: blur(32px);
      -webkit-backdrop-filter: blur(32px);
      contain: layout style paint;
      
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-right-color: rgba(255, 255, 255, 0.03);
      border-bottom-color: rgba(255, 255, 255, 0.03);
    }
  `}</style>
);

export const BentoCard = ({ children, className, colSpan = 1, rowSpan = 1 }) => {
  return (
    <div 
      className={clsx(
        "group bento-card relative liquid-glass-card rounded-[2.5rem] p-8 flex flex-col justify-between hover:-translate-y-1 overflow-hidden transform-gpu will-change-transform backface-visibility-hidden",
        className,
        {
          'md:col-span-2': colSpan === 2,
          'lg:col-span-2': colSpan === 2,
          'md:col-span-3': colSpan === 3,
          'md:row-span-2': rowSpan === 2,
        }
      )}
    >
      {children}
    </div>
  );
};

export const TypewriterText = () => {
  const phrases = [
    "Системный\nмаркетинг",
    "SEO\nпродвижение",
    "Сайты\nпод заявки",
    "CRM\nинтеграции",
    "Performance\nмаркетинг",
    "Маркетинг\nв цифрах"
  ];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (isWaiting) return;

    const currentPhrase = phrases[index];
    const timeoutToWait = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length === currentPhrase.length) {
          setIsWaiting(true);
          setTimeout(() => {
            setIsWaiting(false);
            setIsDeleting(true);
          }, 2000);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, timeoutToWait + Math.random() * 20);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, isWaiting]);

  return (
    <span className="text-emerald-500 whitespace-pre-line">
      {text}
      <span className="inline-block w-[2px] md:w-[4px] h-[0.8em] bg-emerald-500 ml-1 sm:ml-2 opacity-80 animate-[pulse_1s_step-end_infinite] translate-y-[0.1em]"></span>
    </span>
  );
};

export const TelemetryGraph = React.memo(() => (
  <div className="absolute top-8 right-8 flex items-end gap-[3px] h-12 w-20 opacity-30 group-hover:opacity-80 transition-opacity duration-500 overflow-hidden">
     <div className="w-3 rounded-t-[2px] bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" style={{ height: '30%' }}></div>
     <div className="w-3 rounded-t-[2px] bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite_0.2s]" style={{ height: '50%' }}></div>
     <div className="w-3 rounded-t-[2px] bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite_0.4s]" style={{ height: '40%' }}></div>
     <div className="w-3 rounded-t-[2px] bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite_0.6s]" style={{ height: '70%' }}></div>
     <div className="w-3 rounded-t-[2px] bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite_0.8s]" style={{ height: '100%' }}></div>
  </div>
));

export const CursorClicker = React.memo(() => (
  <div className="absolute top-8 right-8 w-24 h-20 border border-white/10 rounded-lg bg-white/5 overflow-hidden opacity-30 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md">
    <div className="absolute inset-x-2 top-2 h-2 bg-white/20 rounded-full"></div>
    <div className="absolute top-6 left-2 w-10 h-6 bg-emerald-500/20 rounded border border-emerald-500/50"></div>
    {/* Animated Cursor */}
    <div className="absolute text-white animate-[cursorMove_3s_ease-in-out_infinite] z-10" style={{ filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.5))' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
    </div>
  </div>
));

export const CRMFunnel = React.memo(() => (
  <div className="absolute top-8 right-8 flex flex-col items-center gap-[6px] opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
    <div className="w-20 h-2 bg-white/20 rounded-full relative overflow-hidden">
      <div className="absolute inset-0 bg-white/40 w-1/2 animate-[pulse_1s_ease-in-out_infinite]"></div>
    </div>
    <div className="w-14 h-2 bg-white/30 rounded-full relative overflow-hidden">
      <div className="absolute inset-0 bg-white/50 w-2/3 animate-[pulse_1.5s_ease-in-out_infinite_0.2s]"></div>
    </div>
    <div className="w-8 h-2 bg-emerald-500/60 rounded-full"></div>
    <div className="w-4 h-2 bg-emerald-500 shadow-[0_0_10px_#10B981] animate-pulse rounded-full mt-1"></div>
    <div className="w-1.5 h-1.5 bg-white rounded-full mt-1 shadow-[0_0_8px_white]"></div>
  </div>
));

export const NetworkNodes = React.memo(() => (
  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-70 transition-opacity duration-500 animate-[spinSlow_20s_linear_infinite] pointer-events-none">
    <Settings size={64} className="text-emerald-500" />
    <Settings size={32} className="text-white absolute top-[-5px] right-[-5px] animate-[spinSlow_10s_linear_infinite_reverse]" />
  </div>
));

export const SEOScanner = React.memo(() => (
   <div className="absolute top-8 right-8 w-[100px] h-16 border-b border-white/20 opacity-30 group-hover:opacity-80 transition-opacity duration-500 overflow-hidden pointer-events-none">
     <div className="w-full h-[1px] bg-emerald-400 shadow-[0_0_12px_#10B981] animate-[pulse_1.5s_linear_infinite] absolute z-10 translate-y-6"></div>
     <div className="flex gap-[2px] h-full items-end pb-1 px-1 opacity-50">
       {[30, 50, 40, 70, 60, 90, 80, 100].map((h, i) => (
         <div key={i} className="flex-1 bg-white/50 rounded-t-[1px]" style={{height: `${h}%`}}></div>
       ))}
     </div>
   </div>
));

// NEW: Liquid Glass Tag (Non-clickable)
export const LiquidGlassTag = ({ children, className }) => (
  <div className={clsx(
    "relative px-6 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm font-medium tracking-wide transition-all duration-300 group ring-1 ring-emerald-500/0 hover:ring-emerald-500/40 hover:bg-emerald-500/10 cursor-default select-none",
    className
  )}>
    <div className="absolute inset-0 bg-emerald-500/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <span className="relative z-10">{children}</span>
  </div>
);

// NEW: Liquid Glass Button (Clickable CTA)
export const LiquidGlassButton = ({ children, className, ...props }) => (
  <button 
    className={clsx(
      "group relative px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-medium rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_30px_rgba(0,0,0,0.5)]",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
    <span className="relative z-10 flex items-center justify-center gap-3">
      {children}
    </span>
  </button>
);
