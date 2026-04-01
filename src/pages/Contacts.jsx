import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { Phone, Mail } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { SEO } from '../components/SEO';

// --- SUB-COMPONENTS ---

/**
 * ContactInfo: Pure information column, memoized to prevent re-renders.
 */
const ContactInfo = memo(() => {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-[1px] bg-emerald-500/50"></span>
          <span className="text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase">Связь с нами</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
          Контакты
        </h1>
        <p className="text-graphite-300 text-lg md:text-xl max-w-md leading-relaxed font-light">
          Свяжитесь с нами, если вам нужен сайт, SEO, CRM, аналитика или выстроенная система привлечения заявок.
        </p>
        <p className="text-graphite-400 text-base leading-relaxed opacity-80">
          Коротко разберём задачу и предложим понятную логику работы.
        </p>
      </div>

      <div className="space-y-8 pt-8 border-t border-white/5">
        <a href="tel:89137154800" className="group flex items-center gap-4 md:gap-6 text-lg sm:text-xl md:text-3xl font-medium text-white hover:text-emerald-500 transition-colors duration-300">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all">
            <Phone size={28} className="text-emerald-500" />
          </div>
          8 (913) 715-48-00
        </a>
        <a href="mailto:ab4800@yandex.ru" className="group flex items-center gap-4 md:gap-6 text-lg sm:text-xl md:text-3xl font-medium text-white hover:text-emerald-500 transition-colors duration-300">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all">
            <Mail size={28} className="text-emerald-500" />
          </div>
          ab4800@yandex.ru
        </a>
      </div>
    </div>
  );
});

// --- MAIN COMPONENT ---

export default function Contacts() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-text", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(".reveal-card", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-16 md:pb-24 pt-8 md:pt-16 overflow-x-hidden" ref={containerRef}>
      <SEO 
        title="Контакты агентства 3ant | Обсудить проект"
        description="Свяжитесь с нами для аудита вашего маркетинга или начала разработки проекта. Поможем выстроить систему роста для вашего бизнеса."
      />
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-stretch">
        <div className="reveal-text flex flex-col h-full">
          <ContactInfo />
          <div className="hidden lg:block mt-auto pt-12">
             <div className="relative p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] overflow-hidden">
                <p className="text-graphite-400 text-sm leading-relaxed italic">
                  Можно написать даже в двух строках:<br/>
                  какой у вас бизнес, что уже работает и что хотите улучшить.
                </p>
             </div>
          </div>
        </div>

        <div className="reveal-card">
          <div className="liquid-glass-card rounded-[1.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-16 border border-white/10 bg-white/[0.02] shadow-2xl relative overflow-hidden group">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
