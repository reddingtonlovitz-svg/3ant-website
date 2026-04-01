import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { ContactForm } from './ContactForm';

/**
 * ContactModal: A global overlay containing the contact form.
 * Uses GSAP for high-fidelity animations.
 */
export const ContactModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      const ctx = gsap.context(() => {
        // Overlay fade in
        gsap.fromTo(overlayRef.current, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );
        
        // Modal content slide up and scale
        gsap.fromTo(contentRef.current, 
          { y: 50, scale: 0.95, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
        );
      });
      return () => {
        ctx.revert();
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-graphite-950/80 backdrop-blur-xl cursor-pointer overflow-y-auto"
      onClick={onClose}
    >
      <div 
        ref={contentRef}
        className="relative w-full max-w-4xl liquid-glass-card rounded-[3rem] p-8 md:p-16 border border-white/10 bg-[#0d0d0d] shadow-[0_0_100px_rgba(16,185,129,0.1)] cursor-default my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-graphite-500 hover:text-white transition-colors duration-300 z-20 group"
        >
          <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all bg-white/5">
            <X size={24} />
          </div>
        </button>

        {/* Form Content */}
        <div className="relative z-10">
          <ContactForm 
            title="Обсудить проект" 
            subtitle="Расскажите о вашей задаче, и мы предложим оптимальное решение для роста вашего бизнеса." 
          />
        </div>

        {/* Decorative ambient light */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
    </div>
  );
};
