import React, { useEffect, useRef } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Crosshair, ArrowRight, Layers, Database, Activity, Target, Zap, LayoutTemplate, MousePointerClick, Search, Settings, CheckCircle2, Users } from 'lucide-react';
import { TypewriterText, BentoCard, TelemetryGraph, CursorClicker, CRMFunnel, NetworkNodes, SEOScanner, TeamMemberCard } from '../components/Shared';
import { SEO } from '../components/SEO';

export default function Home() {
  const containerRef = useRef(null);
  const { openContactModal } = useOutletContext();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(".hero-text > *", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }
      );
      
      // Staggered Bento Cards Fade-Up
      const bentoItems = gsap.utils.toArray('.bento-card, .scroll-reveal');
      bentoItems.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          animation: gsap.fromTo(card, 
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }
          ),
          toggleActions: "play none none reverse"
        });
      });

      // Simple Parallax for 3D elements/icons inside cards
      const parallaxElements = gsap.utils.toArray('.parallax');
      parallaxElements.forEach((el) => {
        gsap.to(el, {
          y: -40,
          rotation: el.dataset.rotation || 0,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest('.bento-card'),
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });
      
      // Simple parallax for the background element was removed to improve performance
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-16 md:pb-24 space-y-16 md:space-y-32" ref={containerRef}>
      <SEO 
        title="Агентство ABB — Дизайн, сайты и маркетинг для бизнеса"
        description="Формируем сильный образ компании, создаём сайты под конкретные задачи и выстраиваем маркетинг как системный актив бизнеса."
      />
      {/* HERO SECTION - 100vh stages scaling */}
      <section className="flex-1 lg:min-h-[calc(100vh-160px)] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-8 items-stretch pt-4 md:pt-6">
        <div className="hero-text flex flex-col justify-between h-full pr-0 lg:pr-12">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] leading-[0.85] mb-4 md:mb-6 font-display">
              <div className="min-h-[2.1em] md:min-h-[2.1em] flex items-end mb-4">
                <TypewriterText />
              </div>
              
              <div className="text-white text-4xl sm:text-5xl md:text-6xl leading-[1] mt-2 font-display">
                Агентство ABB
              </div>
            </h1>

            <p className="text-graphite-300 text-lg md:text-xl max-w-xl mb-6 leading-relaxed font-normal font-body">
              Дизайн, сайты и маркетинг для бизнеса,<br className="hidden md:block"/> которому нужен результат.
            </p>
            
            <p className="text-graphite-400 text-base max-w-lg mb-8 leading-relaxed font-normal font-body opacity-80">
              Формируем сильный образ компании, создаём сайты под конкретные задачи и выстраиваем маркетинг как системный актив бизнеса.
            </p>
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            <div className="">
              {/* Service Tags Moved Here */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] sm:text-[11px] font-bold text-emerald-500/80 tracking-[0.2em] uppercase font-mono">
                 <span>Сайты</span> <span>•</span>
                 <span>SEO</span> <span>•</span>
                 <span>Performance</span> <span>•</span>
                 <span>CRM</span> <span>•</span>
                 <span>Автоматизация</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <button 
                onClick={openContactModal}
                className="group relative px-8 py-4 bg-white text-graphite-950 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-2xl shadow-white/5"
              >
                <div className="absolute inset-0 bg-graphite-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center gap-2">
                  Получить консультацию <span className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </span>
              </button>
              <a href="#" className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]">
                Посмотреть кейсы
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 gap-4 h-full">
          <BentoCard className="bg-white/[0.03] border-white/10">
            <div className="flex flex-col h-full justify-between">
              <h3 className="text-2xl font-medium tracking-tight text-white leading-tight">15+ лет<br/>опыта</h3>
              <p className="text-graphite-400 text-xs leading-relaxed">
                Работаем не «по шаблону», а от задачи бизнеса.
              </p>
            </div>
          </BentoCard>
          <BentoCard className="bg-white/[0.03] border-white/10">
            <div className="flex flex-col h-full justify-between">
              <h3 className="text-2xl font-medium tracking-tight text-white leading-tight">CRM и<br/>аналитика</h3>
              <p className="text-graphite-400 text-xs leading-relaxed">
                Прозрачная воронка и контроль на каждом этапе.
              </p>
            </div>
          </BentoCard>
          <BentoCard colSpan={2} className="bg-white/[0.03] border-white/10 lg:row-span-1">
            <div className="flex h-full items-end justify-between relative z-10 w-full">
              <div className="max-w-[70%]">
                <h3 className="text-3xl font-bold tracking-tight mb-2 text-white font-display">SEO как актив</h3>
                <p className="text-graphite-400 text-xs leading-relaxed max-w-sm font-body">
                  Строим устойчивый поисковый трафик, который работает годами без постоянных вливаний.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-graphite-700/50 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-500">
                  <ArrowRight className="text-white opacity-60 group-hover:opacity-100" />
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 right-[-10%] w-[340px] h-[340px] bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-[100px] pointer-events-none group-hover:opacity-60 transition-opacity duration-1000"></div>
          </BentoCard>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="relative liquid-glass-card rounded-[1.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-16 flex flex-col items-center gap-10 md:gap-16 scroll-reveal overflow-hidden transform-gpu text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
          <div className="max-w-4xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.15] mb-8">
              Мы подходим бизнесу, которому нужен не просто исполнитель, а понятный результат
            </h2>
            <p className="text-graphite-400 leading-relaxed text-xl md:text-2xl font-light">
              Когда компании нужен не просто красивый макет, не просто сайт и не просто реклама, а понятная система, которая помогает продавать, вызывать доверие и расти.
            </p>
          </div>
      </section>

      {/* THREE PILLARS */}
      <section className="scroll-reveal">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-xs font-black tracking-widest text-graphite-500 uppercase mb-4 font-mono">Направления работы</h2>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight font-display leading-[1.2]">Что мы делаем для бизнеса</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BentoCard className="bg-white/[0.03] border-white/10 group">
              <div className="flex flex-col h-full">
                <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl text-emerald-400 flex items-center justify-center mb-6 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-500">
                  <LayoutTemplate size={28} />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-white">Дизайн</h4>
                <p className="text-graphite-400 leading-relaxed text-sm md:text-base mb-6">
                  Помогает бизнесу выглядеть сильнее и убедительнее. Формирует доверие и создает цельный визуальный образ компании.
                </p>
                <ul className="space-y-2 text-xs font-bold tracking-wider text-graphite-500 uppercase font-mono mt-auto">
                  <li>• Фирменный стиль</li>
                  <li>• Визуальная система</li>
                  <li>• Рекламные материалы</li>
                  <li>• Digital-дизайн</li>
                </ul>
              </div>
          </BentoCard>
          <BentoCard className="bg-white/[0.03] border-white/10 group">
              <div className="flex flex-col h-full">
                <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl text-emerald-400 flex items-center justify-center mb-6 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-500">
                  <Database size={28} />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-white">Сайты</h4>
                <p className="text-graphite-400 leading-relaxed text-sm md:text-base mb-6">
                  Превращают внимание в обращения и продажи. Создаются под конкретные задачи бизнеса на оптимальных платформах.
                </p>
                <ul className="space-y-2 text-xs font-bold tracking-wider text-graphite-500 uppercase font-mono mt-auto">
                  <li>• Лендинги и корпоративные сайты</li>
                  <li>• Решения на Bitrix / WordPress</li>
                  <li>• Проекты на React</li>
                  <li>• Высокая конверсия</li>
                </ul>
              </div>
          </BentoCard>
          <BentoCard className="bg-white/[0.03] border-white/10 group">
              <div className="flex flex-col h-full">
                <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl text-emerald-400 flex items-center justify-center mb-6 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-500">
                  <Target size={28} />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-white">Маркетинг</h4>
                <p className="text-graphite-400 leading-relaxed text-sm md:text-base mb-6">
                  Помогает привлекать спрос и управлять ростом. Маркетинг как системный, прозрачный и измеримый актив бизнеса.
                </p>
                <ul className="space-y-2 text-xs font-bold tracking-wider text-graphite-500 uppercase font-mono mt-auto">
                  <li>• SEO-продвижение</li>
                  <li>• Источники трафика</li>
                  <li>• Аналитика и отчетность</li>
                  <li>• Системный подход</li>
                </ul>
              </div>
          </BentoCard>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="scroll-reveal relative liquid-glass-card rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/[0.03] to-transparent pointer-events-none"></div>
        <div className="max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 font-display leading-tight">
            Когда дизайн, сайт и маркетинг работают вместе
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <p className="text-graphite-400 text-lg leading-relaxed font-body">
              Дизайн создает образ и доверие. Сайт превращает интерес в действие. Маркетинг приводит спрос и усиливает рост. 
              <br/><br/>
              Вместе они дают бизнесу более сильный результат, чем по отдельности. Это база, на которой мы строим развитие наших клиентов.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-white font-medium">Единая визуальная стратегия</span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-white font-medium">Бесшовная воронка продаж</span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-white font-medium">Прозрачная аналитика на всех этапах</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEMA */}
      <section className="relative scroll-reveal mt-32 mb-32">
        <div className="bg-[#050505] backdrop-blur-3xl border border-white/[0.05] rounded-[3.5rem] md:rounded-[5rem] py-14 md:py-20 px-8 sm:px-12 lg:px-20 relative overflow-hidden transform-gpu flex flex-col items-center">
          {/* Ambient Glow - Centered on steps, very soft */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[40%] bg-emerald-500/[0.05] blur-[140px] rounded-full pointer-events-none"></div>
          
          <div className="text-center mb-10 md:mb-16 relative z-10 w-full">
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">Как выглядит система роста</h2>
          </div>
          
          {/* Desktop Sequence - Exactly matching the screenshot pill layout */}
          <div className="relative w-full max-w-7xl mx-auto hidden lg:block overflow-visible px-4">
            <div className="flex justify-between items-center relative z-10 w-full gap-2">
              {[
                { name: 'Сайт' },
                { name: 'Заявка' },
                { name: 'CRM' },
                { name: 'Воронка продаж' },
                { name: 'Аналитика' },
                { name: 'Оптимизация' },
                { name: 'Рост', highlight: true }
              ].map((step, i, arr) => (
                <React.Fragment key={step.name}>
                  <div className={`
                    relative px-9 py-4 rounded-full font-bold text-[15px] shrink-0 
                    transition-all duration-700 cursor-default group/pill font-mono
                    ${step.highlight 
                      ? 'bg-[#0A100C] border border-emerald-500/70 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20' 
                      : 'bg-[#111111] border border-white/[0.05] text-white/70 shadow-xl'
                    }
                  `}>
                    <div className={`absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover/pill:opacity-100 ${step.highlight ? 'bg-emerald-500/5' : 'bg-white/5'}`}></div>
                    <span className="relative z-10 tracking-[0.05em] uppercase text-[12px]">{step.name}</span>
                  </div>
                  
                  {i < arr.length - 1 && (
                    <div className="flex-1 flex justify-center px-1 min-w-[20px]">
                      <svg width="40" height="8" viewBox="0 0 40 8" fill="none" className="overflow-visible opacity-50 group-hover:opacity-100 transition-all duration-700">
                        <path 
                          d="M0 4H36" 
                          stroke="#10B981" 
                          strokeWidth="1" 
                          strokeDasharray="2 3" 
                          className="animate-flow-dash" 
                        />
                        <path 
                          d="M32 0L36 4L32 8" 
                          stroke="#10B981" 
                          strokeWidth="1" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Mobile Sequence - Vertical stacked with refined paths */}
          <div className="lg:hidden flex flex-col items-center gap-4 relative z-10 w-full max-w-[280px]">
              {[
                { name: 'Сайт' },
                { name: 'Заявка' },
                { name: 'CRM' },
                { name: 'Воронка продаж' },
                { name: 'Аналитика' },
                { name: 'Оптимизация' },
                { name: 'Рост', highlight: true }
              ].map((step, i, arr) => (
                <React.Fragment key={step.name}>
                  <div className={`px-10 py-4 rounded-full font-medium text-base text-center w-full transition-all duration-500 ${
                    step.highlight 
                    ? 'bg-[#0A100C] border border-emerald-500/70 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                    : 'bg-[#111111] border border-white/[0.05] text-white/70 shadow-lg'
                  }`}>
                    {step.name}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="py-2">
                      <svg width="8" height="24" viewBox="0 0 8 24" fill="none" className="overflow-visible opacity-40">
                        <path 
                          d="M4 0V20" 
                          stroke="#10B981" 
                          strokeWidth="1" 
                          strokeDasharray="2 3" 
                          className="animate-flow-dash-vertical" 
                        />
                        <path d="M0 16L4 20L8 16" stroke="#10B981" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
          
          {/* Quote Section - Pill-like box mirroring the screenshot's shape and spacing */}
          <div className="w-full max-w-5xl mx-auto mt-12 md:mt-16 relative z-10">
             <div className="bg-gradient-to-b from-emerald-500/10 to-[#111111]/40 border border-white/[0.05] rounded-[3.5rem] md:rounded-[4.5rem] p-10 md:p-12 backdrop-blur-sm relative overflow-hidden group">
                <p className="text-xl md:text-2xl lg:text-[28px] font-normal leading-tight text-white/80 text-center tracking-tight">
                  Если вы не можете описать то, что вы делаете, как процесс — вы не знаете, что вы делаете.
                </p>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <div className="text-emerald-500 font-medium text-sm md:text-base tracking-wide opacity-80">
                    — Уильям Эдвардс Деминг
                  </div>
                </div>
             </div>
          </div>
        </div>

        <style>{`
          @keyframes flow-dash {
            from { stroke-dashoffset: 5; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes flow-dash-vertical {
            from { stroke-dashoffset: 5; }
            to { stroke-dashoffset: 0; }
          }
          .animate-flow-dash {
            animation: flow-dash 1.2s linear infinite;
          }
          .animate-flow-dash-vertical {
            animation: flow-dash-vertical 1.2s linear infinite;
          }
        `}</style>
      </section>



      {/* CASES */}
      <section className="scroll-reveal mt-32">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-graphite-500 uppercase mb-4">Наши работы</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight mb-4">Проекты, в которых важен результат, а не только картинка</h3>
            <p className="text-graphite-400 max-w-xl text-lg">
              Мы показываем не «красивые макеты», а результат и логику работы: что было, что сделали, как считали и что изменилось.
            </p>
          </div>
          <Link 
            to="/cases"
            className="hidden md:flex items-center gap-2 text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-graphite-950 transition-colors"
          >
            Все кейсы <ArrowRight size={18}/>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/cases#volkhonka"
            className="group relative h-[320px] md:h-[420px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 bg-graphite-800 flex flex-col justify-end p-6 md:p-8 cursor-pointer"
          >
            <div className="absolute inset-0 bg-[url('/images/cases/volkhonka/site.png')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-screen"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/80 to-transparent"></div>
            <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="text-sm font-bold text-emerald-500 mb-3 tracking-wide uppercase">Металлопрокат</div>
              <h4 className="text-2xl font-medium text-white mb-2 leading-snug">Металлобаза Волхонка</h4>
              <p className="text-graphite-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Перестроили структуру сайта и внедрили Bitrix24 для контроля лидов.</p>
              <div className="h-[2px] w-12 bg-emerald-500 mt-6 md:scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </Link>
          
          <Link 
            to="/cases#oboron"
            className="group relative h-[420px] rounded-[2rem] overflow-hidden border border-white/5 bg-graphite-800 flex flex-col justify-end p-8 cursor-pointer"
          >
            <div className="absolute inset-0 bg-[url('/images/cases/oboron/catalog.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-screen"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/80 to-transparent"></div>
            <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="text-sm font-bold text-emerald-500 mb-3 tracking-wide uppercase">Спецстали</div>
              <h4 className="text-2xl font-medium text-white mb-2 leading-snug">ОборонСпецСплав</h4>
              <p className="text-graphite-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">B2B-система для работы со спецсталями и каталогом на 800k позиций.</p>
              <div className="h-[2px] w-12 bg-emerald-500 mt-6 md:scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </Link>
          
          <Link 
            to="/cases#profline"
            className="group relative h-[420px] rounded-[2rem] overflow-hidden border border-white/5 bg-graphite-800 flex flex-col justify-end p-8 cursor-pointer"
          >
            <div className="absolute inset-0 bg-[url('/images/cases/profline/site.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-screen"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/80 to-transparent"></div>
            <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="text-sm font-bold text-emerald-500 mb-3 tracking-wide uppercase">Производство</div>
              <h4 className="text-2xl font-medium text-white mb-2 leading-snug">ПрофЛайн</h4>
              <p className="text-graphite-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Запуск канала продаж с нуля: от разработки до SEO и аналитики.</p>
              <div className="h-[2px] w-12 bg-emerald-500 mt-6 md:scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </Link>
        </div>
        <Link 
          to="/cases"
          className="md:hidden mt-8 w-full flex justify-center items-center gap-2 text-white border border-white/20 px-6 py-4 rounded-full hover:bg-white hover:text-graphite-950 transition-colors"
        >
          Все кейсы <ArrowRight size={18}/>
        </Link>
      </section>

      {/* PROCESS */}
      <section className="scroll-reveal mt-32">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold tracking-widest text-graphite-500 uppercase mb-4">Процесс</h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight">Как мы работаем</h3>
        </div>
        
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {[
            { n: "1", title: "Погружаемся в задачу бизнеса", text: "Изучаем продукт, цели, экономику и текущую логику продаж." },
            { n: "2", title: "Определяем нужный инструмент", text: "Решаем, что именно нужно: дизайн, сайт, маркетинг или комплексная связка из всех трех направлений." },
            { n: "3", title: "Собираем решение под задачу", text: "Проектируем архитектуру, создаем контент и функционал, нацеленный на конкретный бизнес-результат." },
            { n: "4", title: "Запускаем и внедряем", text: "Проводим техническую интеграцию, настраиваем аналитику и выводим проект в рабочую среду." },
            { n: "5", title: "Анализируем и усиливаем", text: "Следим за показателями, находим узкие места и масштабируем то, что дает реальный рост." }
          ].map((step, idx) => (
            <div key={idx} className="group relative flex gap-6 md:gap-10 bg-graphite-800/40 p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:bg-graphite-800/80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="text-4xl md:text-5xl font-bold text-graphite-700 group-hover:text-emerald-500/80 transition-colors shrink-0 font-mono flex items-center">
                0{step.n}
              </div>
              <div className="relative z-10 flex flex-col justify-center">
                <h4 className="text-xl md:text-2xl font-medium text-white mb-2">{step.title}</h4>
                <p className="text-graphite-400 text-base leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}

          <div className="mt-8 relative bg-graphite-800 p-8 md:p-10 rounded-[2rem] border border-white/5 overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-500"></div>
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-lg md:text-xl font-medium text-white pl-4 leading-relaxed">
              Мы не берём проекты, где нельзя измерить результат и выстроить процесс обработки заявок.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM & PRINCIPLES */}
      <section className="scroll-reveal mt-32">
        <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-500/[0.02] blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start relative z-10">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-6 flex items-center gap-3">
                <Users size={16} /> Команда и ценности
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8 leading-tight font-display">
                Люди и принципы, на которых строится работа ABB
              </h3>
              <p className="text-graphite-400 text-lg md:text-xl mb-12 leading-relaxed font-body">
                Работа с бизнесом требует не только экспертизы, но и понятной логики: прозрачного процесса, сильной команды и решений, которые можно обосновать.
              </p>
              
              <div className="space-y-6">
                {[
                  "Работаем прозрачно",
                  "Объясняем решения",
                  "Подбираем формат под задачу",
                  "Не продаем лишнего",
                  "Показываем реальные проекты",
                  "Считаем результат"
                ].map((principle, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-white font-medium">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TeamMemberCard 
                name="Егор Афанасьев"
                role="Программист / сайты и структура"
                description="Отвечает за архитектуру, функциональность и реализацию сайтов под задачи бизнеса."
              />
              <TeamMemberCard 
                name="Ирина Боброва"
                role="Арт-директор / дизайн"
                description="Формирует визуальный образ проектов и отвечает за цельную дизайн-систему."
              />
              <TeamMemberCard 
                name="Александр Бобров"
                role="Проджект / аналитика"
                description="Выстраивает логику продвижения, координирует процессы и держит фокус на результате."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
  <section className="mt-16 md:mt-32 bg-graphite-800 rounded-[1.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-24 text-center flex flex-col items-center relative overflow-hidden border border-white/10 scroll-reveal">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[80%] h-full bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mb-6 md:mb-8 relative z-10 font-display">
          Поможем понять, что именно даст результат: отдельная услуга или связка из нескольких направлений
        </h2>
        <p className="text-graphite-300 text-lg md:text-xl mb-12 max-w-2xl relative z-10 font-normal font-body leading-relaxed">
          Коротко опишите продукт и цель — мы предложим логику системы и первые шаги.<br/>
          Без “пакетов” и лишних обещаний.
        </p>
        <button 
          onClick={openContactModal}
          className="relative z-10 px-10 py-5 bg-white text-graphite-950 text-xl font-bold rounded-full overflow-hidden transition-transform duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(16,185,129,0.2)] active:scale-[0.98] font-display"
        >
          <span className="flex items-center gap-3">
            Получить консультацию <ArrowRight size={22} />
          </span>
        </button>
      </section>

    </main>
  );
}
