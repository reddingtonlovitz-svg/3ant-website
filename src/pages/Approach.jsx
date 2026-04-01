import React, { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ArrowRight, Target, Layout, Database, Zap, Search, Activity, BarChart3, Globe, ShieldCheck } from 'lucide-react';
import { LiquidGlassTag, LiquidGlassButton, BentoCard, TelemetryGraph, CursorClicker, CRMFunnel, SEOScanner } from '../components/Shared';
import { SEO } from '../components/SEO';

export default function Approach() {
  const containerRef = useRef(null);
  const { openContactModal } = useOutletContext();

  useEffect(() => {
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      // 1. Hero Entrance
      gsap.fromTo(".hero-reveal > *", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }
      );

      // 2. Staggered Bento Cards & Sections Fade-Up
      const revealItems = gsap.utils.toArray('.bento-card, .reveal-section');
      revealItems.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          animation: gsap.fromTo(item, 
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }
          ),
          toggleActions: "play none none reverse"
        });
      });

      // 3. Simple Parallax for elements inside cards
      const parallaxElements = gsap.utils.toArray('.parallax');
      parallaxElements.forEach((el) => {
        gsap.to(el, {
          y: -40,
          rotation: el.dataset.rotation || 0,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest('.bento-card, .reveal-section'),
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

      // 4. Particle Flow in Schema Section
      const particles = gsap.utils.toArray('.flow-particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          motionPath: {
            path: "#schema-flow-path",
            align: "#schema-flow-path",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
          },
          duration: 6,
          repeat: -1,
          ease: "none",
          delay: i * 1.5
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pb-24 space-y-32" ref={containerRef}>
      <SEO 
        title="Наш подход к маркетингу | 3ant Agency"
        description="Данные вместо интуиции. Системный взгляд на воронку продаж и прозрачность каждого шага от клика до сделки в CRM."
      />
      {/* HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center pt-12 hero-reveal">
        <div className="hero-text flex flex-col pr-0 lg:pr-12">
          <div className="mb-8 flex items-center gap-3">
            <span className="w-10 h-[1px] bg-emerald-500/50"></span>
            <span className="text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase">Наш подход</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] mb-8 text-white">
            Маркетинг как <br/>
            <span className="text-emerald-500 italic block my-2">единую систему</span>
            <span className="text-graphite-400">сильного бизнеса</span>
          </h1>
          <p className="text-graphite-300 text-lg md:text-xl max-w-lg mb-12 leading-relaxed font-light">
            Сайт, трафик, CRM, аналитика и обработка заявок должны работать вместе. 
            Мы строим именно такие связки для измеримого результата.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={openContactModal}
              className="group relative px-10 py-5 bg-white text-graphite-950 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-2xl shadow-emerald-500/10"
            >
              <div className="absolute inset-0 bg-graphite-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3">
                Обсудить проект <ArrowRight size={22} className="rotate-[-45deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr">
          <div className="bento-card relative overflow-hidden liquid-glass-card rounded-[2.5rem] p-8 border border-white/10 bg-white/[0.02] flex flex-col group hover:bg-white/[0.04] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent pointer-events-none"></div>
            <div className="relative z-10">
               <div className="mb-6 w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)] group-hover:scale-110 group-hover:shadow-emerald-500/20 transition-all duration-500">
                  <ShieldCheck size={30} />
               </div>
               <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">Безопасный рост</h3>
               <p className="text-graphite-400 text-sm leading-relaxed font-light">Прозрачность каждого шага и контроль рисков.</p>
            </div>
          </div>

          <div className="bento-card relative overflow-hidden liquid-glass-card rounded-[2.5rem] p-8 border border-white/10 bg-white/[0.02] flex flex-col group hover:bg-white/[0.04] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent pointer-events-none"></div>
            <div className="relative z-10">
               <div className="mb-6 w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)] group-hover:scale-110 group-hover:shadow-emerald-500/20 transition-all duration-500">
                  <Activity size={30} />
               </div>
               <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">Data-driven</h3>
               <p className="text-graphite-400 text-sm leading-relaxed font-light">Принимаем решения на основе цифр, а не интуиции.</p>
            </div>
          </div>

          <div className="bento-card col-span-1 sm:col-span-2 relative overflow-hidden liquid-glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/10 bg-white/[0.02] flex flex-col md:flex-row md:items-center gap-8 group hover:bg-white/[0.04] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-10 w-full">
               <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.15)] group-hover:scale-110 group-hover:shadow-emerald-500/25 transition-all duration-500">
                  <Target size={36} />
               </div>
               <div className="flex-1">
                  <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">Системный взгляд</h3>
                  <p className="text-graphite-400 text-base md:text-lg leading-relaxed font-light max-w-2xl">
                    Видим всю воронку целиком: от первого касания в поиске до продажи в CRM и LTV клиента.
                  </p>
               </div>
            </div>
            {/* Pulsing decoration */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* BLOCK 2: MEANING - CLEAN 3-COLUMN LAYOUT */}
      <section className="reveal-section relative liquid-glass-card rounded-[3.5rem] p-10 md:p-16 overflow-hidden border border-white/5 bg-graphite-950/40 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1.1fr] gap-12 lg:gap-16 items-start relative z-10">
            {/* COLUMN 1: TITLE */}
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-white">
              Мы начинаем <br/>
              <span className="text-emerald-500">не с инструментов,</span> <br/>
              а с задачи бизнеса
            </h2>

            {/* COLUMN 2: PRIMARY TEXT */}
            <p className="text-graphite-300 text-lg md:text-xl leading-relaxed font-light">
              Не каждый запрос <strong className="text-white font-medium">«нужен сайт»</strong> действительно про сайт. Иногда это запрос на системные продажи.
            </p>

            {/* COLUMN 3: SECONDARY TEXT */}
            <p className="text-graphite-400 text-base md:text-lg leading-relaxed font-light">
              Иногда проблема в структуре предложения. Иногда — в обработке лидов. Иногда — в том, что маркетинг и продажи существуют отдельно друг от друга.
            </p>
          </div>
      </section>

      {/* BLOCK 3: PILLARS - CLEANED UP ICONS */}
      <section className="reveal-section">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-sm font-bold tracking-widest text-graphite-500 uppercase mb-4">На чём строится наш подход</h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-2">На чём строится наш подход</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BentoCard>
            <div className="relative z-10 h-full flex flex-col">
              <div className="bg-emerald-500/10 p-4 rounded-3xl w-fit mb-8">
                <Target className="text-emerald-500" size={32} />
              </div>
              <h4 className="text-2xl font-medium text-white mb-4 leading-tight">Не активность, а управляемость</h4>
              <p className="text-graphite-400 text-base leading-relaxed font-light">Важно не просто что-то делать, а понимать, что именно даёт результат на каждом этапе воронки.</p>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="relative z-10 h-full flex flex-col">
              <div className="bg-emerald-500/10 p-4 rounded-3xl w-fit mb-8">
                <Layout className="text-emerald-500" size={32} />
              </div>
              <h4 className="text-2xl font-medium text-white mb-4 leading-tight">Не сайт сам по себе</h4>
              <p className="text-graphite-400 text-base leading-relaxed font-light">Сайт должен быть встроен в логику продаж, а не существовать отдельно от маркетинговой стратегии.</p>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="relative z-10 h-full flex flex-col">
              <div className="bg-emerald-500/10 p-4 rounded-3xl w-fit mb-8">
                <Database className="text-emerald-500" size={32} />
              </div>
              <h4 className="text-2xl font-medium text-white mb-4 leading-tight">Не лид ради лида</h4>
              <p className="text-graphite-400 text-base leading-relaxed font-light">Нас интересует путь обращения дальше: фиксация, корректная обработка и движение по воронке.</p>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="relative z-10 h-full flex flex-col">
              <div className="bg-emerald-500/10 p-4 rounded-3xl w-fit mb-8">
                <Globe className="text-emerald-500" size={32} />
              </div>
              <h4 className="text-2xl font-medium text-white mb-4 leading-tight">Не хаос, а система</h4>
              <p className="text-graphite-400 text-base leading-relaxed font-light">Маркетинг должен быть жестко связан с CRM, аналитикой и внутренними бизнес-процессами.</p>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* BLOCK 4: VISUAL SCHEMA - REDESIGNED WITH GLASS WRAPPER */}
      <section className="reveal-section relative">
        <div className="liquid-glass-card rounded-[3rem] py-16 px-6 lg:px-16 relative overflow-hidden transform-gpu flex flex-col items-center">
          <div className="text-center mb-12 relative z-10">
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">Как мы видим сильный маркетинг</h3>
          </div>

          <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden">
            {/* Path for particles */}
            <svg className="w-full h-32 mb-8" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path id="schema-flow-path" d="M 0 50 Q 250 10, 500 50 T 1000 50" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="4" />
              <circle className="flow-particle" r="6" fill="#10b981" filter="blur(4px)" />
              <circle className="flow-particle" r="3" fill="#ffffff" />
              <circle className="flow-particle" r="5" fill="#10b981" filter="blur(2px)" />
              <circle className="flow-particle" r="2" fill="#ffffff" />
            </svg>

            {/* EQUALLY SPACED NODES */}
            <div className="flex justify-between items-start w-full gap-2 md:gap-4">
              {['Спрос', 'Точка входа', 'Сайт', 'Заявка', 'CRM', 'Обработка', 'Аналитика', 'Решения', 'Рост'].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-graphite-950 border-2 border-emerald-500/40 flex items-center justify-center text-sm md:text-base font-bold text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/20 shrink-0">
                    {idx + 1}
                  </div>
                  <div className="text-graphite-400 font-medium text-[8px] md:text-sm text-center uppercase tracking-[0.1em] leading-tight break-words h-8 flex items-center justify-center">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 5: ACCENT BLOCK - OPTIMIZED */}
      <section className="reveal-section">
          <div className="relative liquid-glass-card rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-white/10 bg-white/[0.01] flex flex-col lg:flex-row gap-8 items-center">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
            <div className="lg:w-1/2 relative z-10">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.15] text-white">
                Рост начинается <span className="text-emerald-500">не только там,</span> <br/>
                где привлекают больше
              </h2>
              <div className="w-16 h-1 bg-emerald-500/30 rounded-full"></div>
            </div>
            <div className="lg:w-1/2 relative z-10">
              <p className="text-lg md:text-xl text-graphite-300 font-light leading-relaxed border-l-2 border-emerald-500/20 pl-8">
                Очень часто рост начинается там, где бизнес перестаёт терять уже пришедшие обращения: 
                <span className="text-white font-normal block mt-6">на сайте, в форме заявки, в CRM, в скорости ответа, в логике работы менеджеров.</span>
              </p>
            </div>
          </div>
      </section>

      {/* BLOCK 6: BELIEFS - REDESIGNED TO BENTOCARD GRID */}
      <section className="reveal-section">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-sm font-bold tracking-widest text-graphite-500 uppercase mb-4">Во что мы верим</h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white">Фундамент нашей работы</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BentoCard>
            <div className="flex flex-col h-full">
              <div className="text-5xl font-mono text-emerald-500/20 mb-8">01</div>
              <h4 className="text-2xl font-medium text-white mb-4 leading-tight">Маркетинг должен быть понятным</h4>
              <p className="text-graphite-400 text-base leading-relaxed font-light">Бизнес должен видеть, что работает, а что нет, на основе объективных данных, а не догадок.</p>
              <div className="mt-auto pt-8">
                <Search className="text-emerald-500 opacity-20" size={32} />
              </div>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex flex-col h-full">
              <div className="text-5xl font-mono text-emerald-500/20 mb-8">02</div>
              <h4 className="text-2xl font-medium text-white mb-4 leading-tight">Решения на основе данных</h4>
              <p className="text-graphite-400 text-base leading-relaxed font-light">Каждый шаг в системе должен опираться на реальные показатели и точки контроля в CRM.</p>
              <div className="mt-auto pt-8">
                <BarChart3 className="text-emerald-500 opacity-20" size={32} />
              </div>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex flex-col h-full">
              <div className="text-5xl font-mono text-emerald-500/20 mb-8">03</div>
              <h4 className="text-2xl font-medium text-white mb-4 leading-tight">Рабочая система</h4>
              <p className="text-graphite-400 text-base leading-relaxed font-light">Без лишней сложности, декоративных отчётов и имитации деятельности. Только то, что даёт результат.</p>
              <div className="mt-auto pt-8">
                <Activity className="text-emerald-500 opacity-20" size={32} />
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* BLOCK 7: FINAL CTA - MATCHED WITH HOME */}
      <section className="bg-graphite-800 rounded-[3rem] p-12 md:p-24 text-center flex flex-col items-center relative overflow-hidden border border-white/10 reveal-section">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[80%] h-full bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tight leading-[1.1] max-w-4xl mb-8 relative z-10 text-white">
          Нам интересны проекты, где нужен не просто подрядчик, а <span className="text-emerald-500">внятная система роста</span>
        </h2>
        <p className="text-graphite-300 text-lg md:text-xl mb-12 max-w-3xl relative z-10 font-light text-center">
          Если вам важно не просто привлекать трафик, а выстроить связку между маркетингом, продажами и цифрами — давайте обсудим задачу.
        </p>
        <button 
          onClick={openContactModal}
          className="relative z-10 px-10 py-5 bg-white text-graphite-950 text-xl font-semibold rounded-full overflow-hidden transition-transform duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(16,185,129,0.2)] active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            Обсудить задачу <ArrowRight size={22} className="text-emerald-500" />
          </span>
        </button>
      </section>

    </main>
  );
}
