import React, { useEffect, useRef } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Crosshair, ArrowRight, Layers, Database, Activity, Target, Zap, LayoutTemplate, MousePointerClick, Search, Settings } from 'lucide-react';
import { TypewriterText, BentoCard, TelemetryGraph, CursorClicker, CRMFunnel, NetworkNodes, SEOScanner } from '../components/Shared';
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
        title="Агентство системного маркетинга | Продажи, CRM, Рост"
        description="Строим рабочие связки маркетинга и продаж. Сайт, SEO, CRM и аналитика в единой системе для вашего бизнеса."
      />
      {/* HERO SECTION - 100vh stages scaling */}
      <section className="flex-1 lg:min-h-[calc(100vh-160px)] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-8 items-stretch pt-4 md:pt-6">
        <div className="hero-text flex flex-col justify-between h-full pr-0 lg:pr-12">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[0.9] mb-4 md:mb-6">
              <div className="min-h-[2.1em] md:min-h-[2.1em] flex items-end mb-4">
                <TypewriterText />
              </div>
              
              <div className="text-white text-4xl sm:text-5xl md:text-6xl leading-[1] mt-2">
                для роста<br/>Вашего Бизнеса
              </div>
            </h1>

            <p className="text-graphite-300 text-base md:text-lg max-w-xl mb-6 leading-relaxed font-light">
              Мы строим сайты и продвижение как единую систему роста: 
              от первого клика до заявки в CRM, прозрачной воронки и измеримого результата.
            </p>
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            <div className="">
              {/* Service Tags Moved Here */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] sm:text-[11px] font-bold text-emerald-500/80 tracking-[0.2em] uppercase">
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
                  Обсудить проект <span className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
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
                <h3 className="text-3xl font-medium tracking-tight mb-2 text-white">SEO как актив</h3>
                <p className="text-graphite-400 text-xs leading-relaxed max-w-sm">
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
      <section className="relative liquid-glass-card rounded-[1.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-16 flex flex-col lg:flex-row gap-10 md:gap-16 scroll-reveal overflow-hidden transform-gpu">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
          <div className="lg:w-1/3 relative z-10">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.15] mb-6">Мы подходим<br/>не всем</h2>
            <p className="text-graphite-400 leading-relaxed text-lg">
              Мы работаем с бизнесом, где сайт и маркетинг — это инструмент продаж, а не витрина. Нам важны прозрачные цифры и управляемость.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-emerald-400">
                <div className="bg-emerald-500/10 p-3 rounded-2xl"><ShieldCheck size={28} /></div>
                <h4 className="font-semibold text-xl text-white">Вам к нам, если:</h4>
              </div>
              <ul className="space-y-5 text-graphite-300">
                <li className="flex gap-4 items-start"><span className="text-emerald-500/60 mt-0.5">•</span> Нужны готовые заявки и рост, а не просто картинка</li>
                <li className="flex gap-4 items-start"><span className="text-emerald-500/60 mt-0.5">•</span> У вас есть или строится настоящий отдел продаж</li>
                <li className="flex gap-4 items-start"><span className="text-emerald-500/60 mt-0.5">•</span> Хотите видеть сквозной результат в своей CRM</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-rose-400">
                <div className="bg-rose-500/10 p-3 rounded-2xl"><Crosshair size={28} /></div>
                <h4 className="font-semibold text-xl text-white">Нам не по пути, если:</h4>
              </div>
              <ul className="space-y-5 text-graphite-300">
                <li className="flex gap-4 items-start"><span className="text-rose-400/50 mt-0.5">✕</span> Нужен сайт-визитка просто для галочки</li>
                <li className="flex gap-4 items-start"><span className="text-rose-400/50 mt-0.5">✕</span> Решения по маркетингу принимаются без цифр</li>
                <li className="flex gap-4 items-start"><span className="text-rose-400/50 mt-0.5">✕</span> Важнее пыльный креатив, чем бизнес-результат</li>
              </ul>
            </div>
          </div>
      </section>

      {/* PRINCIPLES */}
      <section className="scroll-reveal -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-sm font-bold tracking-widest text-graphite-500 uppercase mb-4">В чём наша разница</h2>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight">Мы не просто агентство.<br className="hidden md:block"/> Мы выстраиваем систему.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BentoCard>
              <div className="flex items-start gap-5">
                <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-400 shrink-0"><Target size={26} /></div>
                <div>
                  <h4 className="text-xl md:text-2xl font-medium mb-3 text-white">До сделки, а не до заявки</h4>
                  <p className="text-graphite-400 leading-relaxed text-sm md:text-base">Мы проектируем путь клиента так, чтобы заявки не терялись и доводились до результата в воронке.</p>
                </div>
              </div>
          </BentoCard>
          <BentoCard>
              <div className="flex items-start gap-5">
                <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-400 shrink-0"><Database size={26} /></div>
                <div>
                  <h4 className="text-xl md:text-2xl font-medium mb-3 text-white">CRM как центр управления</h4>
                  <p className="text-graphite-400 leading-relaxed text-sm md:text-base">Заявки фиксируются и считаются в CRM: источник, статус, ответственность, конверсия, скорость обработки.</p>
                </div>
              </div>
          </BentoCard>
          <BentoCard>
              <div className="flex items-start gap-5">
                <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-400 shrink-0"><LayoutTemplate size={26} /></div>
                <div>
                  <h4 className="text-xl md:text-2xl font-medium mb-3 text-white">Сайт — часть бизнеса</h4>
                  <p className="text-graphite-400 leading-relaxed text-sm md:text-base">Структура, страницы и контент создаются под спрос и реальные сценарии продаж, а не под шаблон.</p>
                </div>
              </div>
          </BentoCard>
          <BentoCard>
              <div className="flex items-start gap-5">
                <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-400 shrink-0"><Zap size={26} /></div>
                <div>
                  <h4 className="text-xl md:text-2xl font-medium mb-3 text-white">Автоматизация вместо хаоса</h4>
                  <p className="text-graphite-400 leading-relaxed text-sm md:text-base">Используем интеграции и автоматизацию процессов, чтобы снизить ручной труд и ускорить развитие.</p>
                </div>
              </div>
          </BentoCard>
        </div>
      </section>

      {/* SCHEMA */}
      <section className="relative scroll-reveal mt-32 mb-32">
        <div className="liquid-glass-card rounded-[1.5rem] md:rounded-[3rem] py-12 md:py-20 px-4 sm:px-6 lg:px-16 relative overflow-hidden transform-gpu">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Как выглядит система роста</h2>
          </div>
          
          <div className="relative max-w-5xl mx-auto hidden lg:block">
            <div className="absolute top-[50%] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent -translate-y-1/2"></div>
            <div className="flex justify-between items-center relative z-10 w-full px-4">
              {['Сайт', 'Заявка', 'CRM', 'Воронка продаж', 'Аналитика', 'Оптимизация'].map((step, i) => (
                <React.Fragment key={step}>
                  <div className="bg-graphite-950/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded-full text-graphite-300 font-medium text-sm lg:text-base shrink-0 shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:-translate-y-1 hover:border-white/20 hover:text-white transition-all">
                    {step}
                  </div>
                  <ArrowRight className="text-emerald-500/50 shrink-0" size={18} />
                </React.Fragment>
              ))}
              <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 px-8 py-4 rounded-full text-emerald-400 font-semibold text-sm lg:text-base shrink-0 shadow-[0_0_30px_rgba(16,185,129,0.15)] glow-pulse">
                Рост
              </div>
            </div>
          </div>
          
          <div className="lg:hidden flex flex-col items-center gap-4 relative z-10">
              {['Сайт', 'Заявка', 'CRM', 'Воронка продаж', 'Аналитика', 'Оптимизация'].map((step, i) => (
                <React.Fragment key={step}>
                  <div className="bg-graphite-950/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full text-graphite-300 font-medium text-base w-[80%] text-center shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                    {step}
                  </div>
                  <ArrowRight className="text-emerald-500/50 rotate-90" size={20} />
                </React.Fragment>
              ))}
              <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 px-8 py-4 rounded-full text-emerald-400 font-semibold text-lg w-[80%] text-center shadow-[0_0_30px_rgba(16,185,129,0.15)] glow-pulse">
                Рост
              </div>
          </div>
          
          <div className="text-center mt-16 max-w-2xl mx-auto px-4 relative z-10">
            <p className="text-graphite-400 text-lg md:text-xl leading-relaxed font-light">
              Он измеряется не трафиком, а управляемыми заявками и конверсией.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mt-12 liquid-glass-card rounded-3xl p-8 lg:p-12 relative z-10 text-center font-light text-graphite-400">
              <div className="text-6xl text-emerald-500/20 absolute top-2 left-6 leading-none">"</div>
              <p className="text-lg md:text-xl italic leading-relaxed relative z-10">
                Если вы не можете описать то, что вы делаете, как процесс, вы не знаете, что вы делаете.
              </p>
              <div className="mt-6 text-emerald-500 font-medium text-sm md:text-base">— Уильям Эдвардс Деминг</div>
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section className="scroll-reveal">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-sm font-bold tracking-widest text-graphite-500 uppercase mb-4">Направления</h2>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight">Что мы строим для бизнеса</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[280px]">
          <BentoCard className="md:col-span-3">
            <div className="h-full flex flex-col justify-between relative z-10">
              <CursorClicker />
              <div className="bg-graphite-700/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]">
                <MousePointerClick className="text-white" size={28}/>
              </div>
              <div>
                <h4 className="text-2xl font-medium mb-3">Сайты под лидогенерацию</h4>
                <p className="text-graphite-400 leading-relaxed group-hover:text-graphite-300 transition-colors">
                  Проектируем структуру, логику и интерфейсы, которые доводят посетителя до обращения.
                </p>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-3">
            <div className="h-full flex flex-col justify-between relative z-10">
              <SEOScanner />
              <div className="bg-graphite-700/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]">
                <Search className="text-white" size={28}/>
              </div>
              <div>
                <h4 className="text-2xl font-medium mb-3">SEO как актив</h4>
                <p className="text-graphite-400 leading-relaxed group-hover:text-graphite-300 transition-colors">
                  Делаем поисковое продвижение системно: архитектура, контент, внутренняя оптимизация, рост спроса.
                </p>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-2">
              <div className="h-full flex flex-col justify-between relative z-10">
                <TelemetryGraph />
                <div className="bg-graphite-700/50 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]">
                  <Activity className="text-white" size={24}/>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-3">Performance-маркетинг</h4>
                  <p className="text-graphite-400 text-sm leading-relaxed">
                    Запускаем и оптимизируем платный трафик там, где он усиливает систему: Директ, Avito, VK.
                  </p>
                </div>
              </div>
          </BentoCard>

          <BentoCard className="md:col-span-2">
              <div className="h-full flex flex-col justify-between relative z-10">
                <CRMFunnel />
                <div className="bg-graphite-700/50 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]">
                  <Database className="text-white" size={24}/>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-3">CRM и аналитика</h4>
                  <p className="text-graphite-400 text-sm leading-relaxed">
                    Интеграции, воронки, источники лидов, контроль обработки, отчётность и прозрачность.
                  </p>
                </div>
              </div>
          </BentoCard>
          
          <BentoCard className="md:col-span-2">
              <div className="h-full flex flex-col justify-between relative z-10">
                <NetworkNodes />
                <div className="bg-graphite-700/50 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]">
                  <Settings className="text-white" size={24}/>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-3">Автоматизация процессов</h4>
                  <p className="text-graphite-400 text-sm leading-relaxed">
                    Интеграции и сценарии автоматизации, которые ускоряют маркетинг и разгружают команду.
                  </p>
                </div>
              </div>
          </BentoCard>
        </div>
      </section>

      {/* CASES */}
      <section className="scroll-reveal mt-32">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-graphite-500 uppercase mb-4">Наши работы</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight mb-4">Опыт, который можно проверить</h3>
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
            { n: "1", title: "Диагностика", text: "Цели, продукт, экономика, логика продаж, текущие источники заявок." },
            { n: "2", title: "Проектирование системы", text: "Структура сайта, воронка, точки конверсии, требования к CRM." },
            { n: "3", title: "Внедрение", text: "Сайт, посадочные страницы, необходимые интеграции, сквозная аналитика." },
            { n: "4", title: "Запуск продвижения", text: "SEO и/или перформанс (платный трафик) как инструмент усиления." },
            { n: "5", title: "Оптимизация и рост", text: "Анализ данных, улучшения интерфейсов, масштабирование связок." }
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

      {/* FOOTER CTA */}
      <section className="mt-16 md:mt-32 bg-graphite-800 rounded-[1.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-24 text-center flex flex-col items-center relative overflow-hidden border border-white/10 scroll-reveal">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[80%] h-full bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] max-w-3xl mb-6 md:mb-8 relative z-10">
          Если вам нужен маркетинг, который работает — давайте обсудим задачу
        </h2>
        <p className="text-graphite-300 text-lg md:text-xl mb-12 max-w-2xl relative z-10 font-light">
          Коротко опишите продукт и цель — мы предложим логику системы и первые шаги.<br/>
          Без “пакетов” и лишних обещаний.
        </p>
        <button 
          onClick={openContactModal}
          className="relative z-10 px-10 py-5 bg-white text-graphite-950 text-xl font-semibold rounded-full overflow-hidden transition-transform duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(16,185,129,0.2)] active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            Обсудить задачу <ArrowRight size={22} />
          </span>
        </button>
      </section>

    </main>
  );
}
