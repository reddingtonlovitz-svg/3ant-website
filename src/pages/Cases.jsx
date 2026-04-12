import React, { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, Target, Layout, Database, Zap, Search, 
  BarChart3, Globe, ChevronRight, ExternalLink,
  MessageSquare, Briefcase, TrendingUp, CheckCircle2
} from 'lucide-react';
import { SEO } from '../components/SEO';

export default function Cases() {
  const containerRef = useRef(null);
  const { openContactModal } = useOutletContext();

  useEffect(() => {
    // 0. Smooth scroll to hash on load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500); // Delay for GSAP transitions
    } else {
      window.scrollTo(0, 0);
    }

    let ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo(".hero-reveal > *", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }
      );

      // 2. Sections Reveal
      const revealSections = gsap.utils.toArray('.reveal-section');
      revealSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          animation: gsap.fromTo(section, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
          ),
          toggleActions: "play none none reverse"
        });
      });

      // 3. Staggered Bento Cards Inside Grid
      ScrollTrigger.create({
        trigger: ".cases-grid",
        start: "top 80%",
        animation: gsap.fromTo(".cases-grid > *", 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
        )
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-16 md:pb-24 space-y-16 md:space-y-32" ref={containerRef}>
      <SEO 
        title="Кейсы и результаты проектов | 3ant Agency"
        description="Портфолио реализованных проектов: Металлобаза Волхонка, ОборонСпецСплав, ПрофЛайн. Оцифрованные результаты и системный маркетинг."
      />
      
      {/* SECTION 1: HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-12 items-center pt-16 hero-reveal">
        <div className="flex flex-col">
          <div className="mb-8 flex items-center gap-3">
            <span className="w-10 h-[1px] bg-emerald-500/50"></span>
            <span className="text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase">Портфолио проектов</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[1.05] mb-6 md:mb-8 text-white font-display">
            Кейсы, в которых <br/>
            маркетинг связан с <br/>
            <span className="text-emerald-500 italic">продажами, CRM и результатом</span>
          </h1>
          <p className="text-graphite-300 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-normal font-body">
            Мы показываем не просто сайты, а реальные проекты, где выстроены точки входа, настроены источники заявок, подключена CRM, оцифрована воронка и запущено продвижение.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={openContactModal}
              className="group relative px-10 py-5 bg-white text-graphite-950 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-2xl shadow-emerald-500/10"
            >
              <div className="absolute inset-0 bg-graphite-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3">
                Обсудить задачу <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="group px-10 py-5 border border-white/10 text-white font-medium rounded-full hover:bg-white/5 transition-all flex items-center gap-3">
              Посмотреть услуги <ChevronRight size={20} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block relative h-[650px] group/prism">
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative z-20 w-32 h-32 flex items-center justify-center">
                 <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                 <div className="relative w-24 h-24 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-[3rem] flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.2)] group-hover/prism:scale-110 transition-transform duration-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-transparent"></div>
                    <Target className="text-emerald-500 relative z-10" size={36} />
                 </div>
              </div>

              <div className="absolute w-[360px] h-[360px] rounded-full border border-white/5 animate-orbit-cw">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 p-5 liquid-glass-card rounded-[2rem] border border-white/10 flex flex-col items-center justify-center gap-1 group/node animate-counter-cw">
                       <TrendingUp className="text-emerald-500 opacity-60 group-hover/node:opacity-100 transition-opacity" size={24} />
                       <span className="text-[9px] font-bold tracking-widest text-graphite-500 uppercase">ROI</span>
                    </div>
                 </div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="w-24 h-24 p-5 liquid-glass-card rounded-[2rem] border border-white/10 flex flex-col items-center justify-center gap-1 group/node animate-counter-cw">
                       <Globe className="text-emerald-400 opacity-60 group-hover/node:opacity-100 transition-opacity" size={24} />
                       <span className="text-[9px] font-bold tracking-widest text-graphite-500 uppercase">SEO</span>
                    </div>
                 </div>
              </div>

              <div className="absolute w-[520px] h-[520px] rounded-full border border-emerald-500/5 animate-orbit-ccw">
                 <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 p-5 liquid-glass-card rounded-[2rem] border border-white/10 flex flex-col items-center justify-center gap-1 group/node animate-counter-ccw">
                       <Database className="text-blue-500 opacity-60 group-hover/node:opacity-100 transition-opacity" size={24} />
                       <span className="text-[9px] font-bold tracking-widest text-graphite-500 uppercase">CRM</span>
                    </div>
                 </div>
                 <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 p-5 liquid-glass-card rounded-[2rem] border border-white/10 flex flex-col items-center justify-center gap-1 group/node animate-counter-ccw">
                       <Zap className="text-orange-500 opacity-60 group-hover/node:opacity-100 transition-opacity" size={24} />
                       <span className="text-[9px] font-bold tracking-widest text-graphite-500 uppercase">LEADS</span>
                    </div>
                 </div>
              </div>

              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                 <circle cx="50%" cy="50%" r="220" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
              </svg>
           </div>
        </div>
      </section>

      {/* SECTION 2: INTRO BLOCK */}
      <section className="reveal-section relative liquid-glass-card rounded-[1.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-24 overflow-hidden border border-white/10 bg-white/[0.01]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight font-display">Что входит в наши кейсы</h2>
            <p className="text-graphite-400 text-lg font-normal leading-relaxed mb-10 font-body">
              Каждый проект — это не только сайт. <br/><br/>
              Это связка из структуры, SEO, источников заявок, CRM, аналитики, работы с отделом продаж и дальнейшего развития по регионам и направлениям.
            </p>
            <div className="grid grid-cols-2 gap-4">
               {['Сайт и Структура', 'SEO Продвижение', 'Интеграция CRM', 'Сквозная Аналитика'].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-white/60 text-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   {item}
                 </div>
               ))}
            </div>
          </div>
          <div className="relative">
             <div className="aspect-[4/3] rounded-[2rem] border border-white/10 bg-graphite-950/50 backdrop-blur-xl overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-3/4 h-3/4 border border-emerald-500/10 rounded-2xl flex flex-col p-6 relative bg-white/[0.02]">
                      <div className="w-full h-8 bg-white/5 rounded-lg mb-6 flex items-center px-4 justify-between">
                         <div className="flex gap-1.5 font-mono text-[8px] text-white/30 uppercase tracking-tighter">
                            <span>marketing.os</span>
                         </div>
                         <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-white/10"></div>
                            <div className="w-2 h-2 rounded-full bg-white/10"></div>
                            <div className="w-2 h-2 rounded-full bg-white/10"></div>
                         </div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                         <div className="w-full h-24 bg-emerald-500/5 rounded-xl border border-emerald-500/10 flex items-center justify-center p-4">
                            <div className="flex items-center gap-4 w-full opacity-60">
                               <Search className="text-emerald-500 shrink-0" size={20} />
                               <div className="space-y-1.5 flex-1">
                                  <div className="h-1.5 w-full bg-white/10 rounded-full"></div>
                                  <div className="h-1.5 w-2/3 bg-white/10 rounded-full"></div>
                                </div>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="h-20 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center p-3">
                               <Database className="text-blue-500/60 mb-2" size={18} />
                               <span className="text-[8px] font-bold text-graphite-500 uppercase tracking-widest">CRM Sync</span>
                            </div>
                            <div className="h-20 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center p-3">
                               <BarChart3 className="text-orange-500/60 mb-2" size={18} />
                               <span className="text-[8px] font-bold text-graphite-500 uppercase tracking-widest">Analytics</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="absolute top-10 right-10 bg-emerald-500 text-graphite-950 text-[10px] font-bold px-3 py-1 rounded-full rotate-3 shadow-lg shadow-emerald-500/20">LEAD GEN</div>
                <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full -rotate-2 border border-white/10">BITRIX24</div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CASES GRID */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal-section">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight font-display">Реализованные проекты</h2>
            <p className="text-graphite-400 text-lg font-normal leading-relaxed font-body">
              В каждом кейсе — не отдельный инструмент, а рабочая система привлечения и обработки обращений.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="px-6 py-3 rounded-full border border-white/5 text-graphite-400 text-sm">Industrial</div>
             <div className="px-6 py-3 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-emerald-500 text-sm">B2B System</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-24 cases-grid">
          {/* CASE 1: Волхонка СПб */}
          <section id="volkhonka" className="reveal-section group">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
                <div className="sticky top-32 space-y-8">
                   <div className="space-y-6">
                       <div className="w-56 h-28 mb-4 flex items-center justify-start reveal-section">
                          <img src="/images/cases/volkhonka/logo.png" alt="Металлобаза Волхонка" className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
                       </div>
                       <div className="space-y-4">
                          <div className="flex items-center gap-4 text-emerald-500 text-sm font-mono tracking-widest uppercase">
                             <span>CASE #01</span>
                             <span className="w-8 h-[1px] bg-emerald-500/30"></span>
                             <span>SPB REGION</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight underline decoration-emerald-500/30 decoration-2 underline-offset-8 font-display">
                            Металлобаза Волхонка
                          </h3>
                          <a href="https://metallobazav.ru" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-graphite-400 hover:text-emerald-500 transition-colors text-lg font-mono">
                            metallobazav.ru <ExternalLink size={16} />
                          </a>
                       </div>
                    </div>
                   
                   <p className="text-graphite-300 text-lg font-normal leading-relaxed font-body">
                     Комплексная цифровая система для металлобазы: сайт, SEO, Bitrix24, источники заявок, воронки продаж и работа с отделом продаж.
                   </p>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2 font-mono">
                           <Layout size={14} /> Что было сделано
                         </h4>
                         <ul className="space-y-2 text-sm text-graphite-400 leading-relaxed list-inside">
                            <li>• доработан сайт под лидогенерацию</li>
                            <li>• выстроена логика точек входа</li>
                            <li>• настроена Bitrix24 CRM и воронки</li>
                            <li>• оцифрованы источники (звонки, email, чаты)</li>
                            <li>• автоматизация падения всех лидов в CRM</li>
                            <li>• запущено SEO-продвижение в СПб</li>
                         </ul>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2 font-mono">
                           <TrendingUp size={14} /> Результат
                         </h4>
                         <ul className="space-y-2 text-sm text-graphite-400 leading-relaxed">
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Все лиды в Bitrix24 без потерь</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Прозрачность источников обращений</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Топ позиций в по высокочастотным запросам</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Управляемость на уровне воронки</span>
                            </li>
                         </ul>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col h-full space-y-8">
                   <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl group/img">
                      <img src="/images/cases/volkhonka/site.png" alt="Сайт Металлобаза Волхонка" className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" />
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] group/crm">
                         <img src="/images/cases/volkhonka/crm.png" alt="Bitrix24 CRM Flow" className="absolute inset-0 w-full h-full object-cover group-hover/crm:scale-110 transition-transform duration-700" />
                         <div className="absolute bottom-6 left-6 text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">Bitrix24 CRM Система</div>
                      </div>
                      <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] group/seo">
                         <img src="/images/cases/volkhonka/seo.png" alt="SEO Visibility" className="absolute inset-0 w-full h-full object-cover group-hover/seo:scale-110 transition-transform duration-700" />
                         <div className="absolute bottom-6 left-6 text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">SEO Видимость</div>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* CASE 2: Волхонка МСК */}
          <section className="reveal-section group border-t border-white/5 pt-24">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
                <div className="lg:order-2 sticky top-32 space-y-8">
                   <div className="space-y-4">
                      <div className="w-56 h-28 mb-4 flex items-center justify-start reveal-section">
                         <img 
                           src="/images/cases/volkhonka-msk/logo.png" 
                           alt="Металлобаза Волхонка" 
                           className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                         />
                      </div>
                      <div className="flex items-center gap-4 text-emerald-500 text-sm font-mono tracking-widest uppercase">
                         <span>CASE #02</span>
                         <span className="w-8 h-[1px] bg-emerald-500/30"></span>
                         <span>MOSCOW EXPANSION</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-display">
                         Металлобаза Волхонка — МСК
                      </h3>
                      <a href="https://msk.metallobazav.ru" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-graphite-400 hover:text-emerald-500 transition-colors text-lg font-mono">
                        msk.metallobazav.ru <ExternalLink size={16} />
                      </a>
                   </div>
                   
                   <p className="text-graphite-300 text-lg font-normal leading-relaxed font-body">
                     Запуск отдельного регионального проекта под Москву: новый сайт, CRM-интеграции, источники заявок и развитие SEO по региону.
                   </p>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2 font-mono">
                           <Layout size={14} /> Что было сделано
                         </h4>
                         <ul className="space-y-2 text-sm text-graphite-400 leading-relaxed list-inside">
                            <li>• создан отдельный сайт под регион МСК</li>
                            <li>• структура сайта под конкретный спрос</li>
                            <li>• внедрена нейросеть в онлайн-чате</li>
                            <li>• подключены и разнесены каналы заявок</li>
                            <li>• настройка логики обработки в CRM</li>
                            <li>• системное SEO-продвижение в МСК</li>
                         </ul>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
                           <TrendingUp size={14} /> Результат
                         </h4>
                         <ul className="space-y-2 text-sm text-graphite-400 leading-relaxed">
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Отдельная точка входа в продажи</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Автоматизация чатов с AI</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Готовность к масштабированию SEO</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Полная оцифровка источников</span>
                            </li>
                         </ul>
                      </div>
                   </div>
                </div>

                <div className="lg:order-1 flex flex-col h-full space-y-8">
                   <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl group/img">
                      <img src="/images/cases/volkhonka-msk/site.png" alt="Сайт МСК Металлобаза" className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" />
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] group/chat">
                         <img src="/images/cases/volkhonka-msk/ai_chat.png" alt="AI Neural Chat" className="absolute inset-0 w-full h-full object-cover group-hover/chat:scale-110 transition-transform duration-700" />
                         <div className="absolute bottom-6 left-6 text-[10px] font-bold text-blue-400 uppercase tracking-widest">AI Чат Нейросети</div>
                      </div>
                      <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] group/bitrix">
                         <img src="/images/cases/volkhonka-msk/bitrix.png" alt="Bitrix24 CRM" className="absolute inset-0 w-full h-full object-cover group-hover/bitrix:scale-110 transition-transform duration-700" />
                         <div className="absolute bottom-6 left-6 text-[10px] font-bold text-orange-400 uppercase tracking-widest">Bitrix24 CRM</div>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* CASE 3: ОборонСпецСплав */}
          <section id="oboron" className="reveal-section group border-t border-white/5 pt-24">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
                <div className="sticky top-32 space-y-8">
                   <div className="space-y-4">
                      <div className="w-56 h-28 mb-4 flex items-center justify-start reveal-section">
                         <img 
                           src="/images/cases/oboron/logo.png" 
                           alt="ОборонСпецСплав" 
                           className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                         />
                      </div>
                      <div className="flex items-center gap-4 text-emerald-500 text-sm font-mono tracking-widest uppercase">
                         <span>CASE #03</span>
                         <span className="w-8 h-[1px] bg-emerald-500/30"></span>
                         <span>COMPLEX B2B</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-display">
                         ОборонСпецСплав
                      </h3>
                      <a href="https://oboronspecsplav.ru" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-graphite-400 hover:text-emerald-500 transition-colors text-lg">
                        oboronspecsplav.ru <ExternalLink size={16} />
                      </a>
                   </div>
                   
                   <p className="text-graphite-300 text-lg font-light leading-relaxed">
                     Сложный B2B-проект в нише специальных сталей: большой каталог (800k поз.), SEO-продвижение, Bitrix24 и развитие по регионам.
                   </p>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                           <Layout size={14} /> Что было сделано
                         </h4>
                         <ul className="space-y-2 text-sm text-graphite-400 leading-relaxed list-inside">
                            <li>• сайт под сложную B2B нишу</li>
                            <li>• каталог на 800 000 позиций</li>
                            <li>• структура под SEO для спецсталей</li>
                            <li>• подключена Bitrix24 CRM (лиды)</li>
                            <li>• полная оцифровка источников</li>
                            <li>• масштабирование на РФ</li>
                         </ul>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
                           <TrendingUp size={14} /> Результат
                         </h4>
                         <ul className="space-y-2 text-sm text-graphite-400 leading-relaxed">
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Топ по запросам в Москве</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Каталог как точка входа в продажи</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Прозрачность движения лидов</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Готовая база для новых регионов</span>
                            </li>
                         </ul>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col h-full space-y-8">
                   <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl group/img">
                      <img src="/images/cases/oboron/catalog.jpg" alt="Mega Catalog" className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" />
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] group/system">
                         <img src="/images/cases/oboron/seo.jpg" alt="SEO Analytics" className="absolute inset-0 w-full h-full object-cover group-hover/system:scale-110 transition-transform duration-700" />
                         <div className="absolute bottom-6 left-6 text-[10px] font-bold text-blue-400 uppercase tracking-widest">SEO Аналитика Запросов</div>
                      </div>
                      <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] group/sales">
                         <img src="/images/cases/oboron/metrica.jpg" alt="Yandex Metrica" className="absolute inset-0 w-full h-full object-cover group-hover/sales:scale-110 transition-transform duration-700" />
                         <div className="absolute bottom-6 left-6 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Яндекс Метрика</div>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* CASE 4: ПрофЛайн */}
          <section id="profline" className="reveal-section group border-t border-white/5 pt-24">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
                <div className="lg:order-2 sticky top-32 space-y-8">
                   <div className="space-y-4">
                      <div className="w-56 h-28 mb-4 flex items-center justify-start reveal-section">
                         <img 
                           src="/images/cases/profline/logo.png" 
                           alt="ПрофЛайн Logo" 
                           className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                         />
                      </div>
                      <div className="flex items-center gap-4 text-emerald-500 text-sm font-mono tracking-widest uppercase">
                         <span>CASE #04</span>
                         <span className="w-8 h-[1px] bg-emerald-500/30"></span>
                         <span>FROM ZERO TO FLOW</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-display">
                         ПрофЛайн
                      </h3>
                      <a href="https://profnastils.ru" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-graphite-400 hover:text-emerald-500 transition-colors text-lg">
                        profnastils.ru <ExternalLink size={16} />
                      </a>
                   </div>
                   
                   <p className="text-graphite-300 text-lg font-light leading-relaxed">
                     Создание сайта с нуля для направления профнастила: дальнейшее SEO-продвижение, CRM-интеграция и сквозная аналитика.
                   </p>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                           <Layout size={14} /> Что было сделано
                         </h4>
                         <ul className="space-y-2 text-sm text-graphite-400 leading-relaxed list-inside">
                            <li>• разработка сайта с нуля</li>
                            <li>• структура под кровельные материалы</li>
                            <li>• подготовка SEO-посадочных страниц</li>
                            <li>• внедрение Bitrix24 CRM</li>
                            <li>• подключена сквозная аналитика</li>
                            <li>• комплексное продвижение в поиске</li>
                         </ul>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
                           <TrendingUp size={14} /> Результат
                         </h4>
                         <ul className="space-y-2 text-sm text-graphite-400 leading-relaxed">
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Первые лиды из поиска сразу после запуска</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Сбор всех заявок в единую CRM</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Полная прозрачность воронки</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Полноценный цифровой канал продаж</span>
                            </li>
                         </ul>
                      </div>
                   </div>
                </div>

                <div className="lg:order-1 flex flex-col h-full space-y-8">
                   <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl group/img">
                      <img src="/images/cases/profline/site.jpg" alt="ProfLine Live Site" className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" />
                   </div>
                </div>
             </div>
          </section>

          {/* CASE 5: БЛТ Абразив */}
          <section className="reveal-section group border-t border-white/5 pt-24">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
                <div className="sticky top-32 space-y-8">
                   <div className="space-y-4">
                      <div className="w-56 h-28 mb-4 flex items-center justify-start reveal-section">
                         <img 
                           src="/images/cases/blt/logo.jpg" 
                           alt="БЛТ Абразив" 
                           className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                         />
                      </div>
                      <div className="flex items-center gap-4 text-emerald-500 text-sm font-mono tracking-widest uppercase">
                         <span>CASE #05</span>
                         <span className="w-8 h-[1px] bg-emerald-500/30"></span>
                         <span>INDUSTRIAL STARTUP</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-display">
                         БЛТ Абразив
                      </h3>
                      <a href="https://blt-abraziv.ru" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-graphite-400 hover:text-emerald-500 transition-colors text-lg">
                        blt-abraziv.ru <ExternalLink size={16} />
                      </a>
                   </div>
                   
                   <p className="text-graphite-300 text-lg font-light leading-relaxed">
                     Создание сайта с нуля для абразивного направления: разработка посадочных, заполнение структуры 800 поз. и SEO в Челябинск.
                   </p>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                           <Layout size={14} /> Что было сделано
                         </h4>
                         <ul className="space-y-2 text-sm text-graphite-400 leading-relaxed list-inside">
                            <li>• разработка сайта с нуля</li>
                            <li>• посадочные под ассортимент и спрос</li>
                            <li>• создание товарной структуры с нуля</li>
                            <li>• SEO-архитектура под промышленность</li>
                            <li>• выход в топ регион Челябинск</li>
                            <li>• масштабируемая база данных</li>
                         </ul>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
                           <TrendingUp size={14} /> Результат
                         </h4>
                         <ul className="space-y-2 text-sm text-graphite-400 leading-relaxed">
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Цифровая основа для продвижения</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>Уникальная товарная структура</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>SEO-инструмент в промышленной нише</span>
                            </li>
                            <li className="flex gap-2">
                               <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                               <span>База для экспансии по РФ</span>
                            </li>
                         </ul>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col h-full space-y-8">
                   <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl group/img">
                      <img src="/images/cases/blt/site.jpg" alt="Сайт БЛТ Абразив" className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" />
                      <div className="absolute bottom-8 left-8">
                         <span className="text-sm font-bold tracking-widest text-emerald-500 uppercase bg-graphite-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-500/20">Industrial Product Landing</span>
                      </div>
                   </div>
                </div>
             </div>
          </section>
        </div>
      </section>

      {/* SECTION 4: SUMMARY BLOCK */}
      <section className="reveal-section relative liquid-glass-card rounded-[1.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-24 overflow-hidden border border-white/10 bg-white/[0.01]">
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-500/[0.03] to-transparent pointer-events-none"></div>
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight text-center font-display">Что объединяет все проекты</h2>
            <p className="text-graphite-300 text-xl font-normal leading-relaxed mb-16 text-center font-body">
               Во всех кейсах мы строим не просто сайт, а рабочую систему:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: 'Сайт', desc: 'как точка входа', icon: <Layout /> },
                 { title: 'SEO', desc: 'как канал спроса', icon: <Search /> },
                 { title: 'CRM', desc: 'как центр обработки заявок', icon: <Database /> },
                 { title: 'Аналитика', desc: 'как инструмент контроля', icon: <BarChart3 /> },
                 { title: 'Отдел продаж', desc: 'как часть результата', icon: <Briefcase /> },
                 { title: 'Масштабирование', desc: 'как следующий этап роста', icon: <Globe /> }
               ].map((item, i) => (
                 <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group">
                    <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                       {item.icon}
                    </div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-graphite-500 text-sm">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="reveal-section py-24">
        <div className="liquid-glass-card rounded-[1.5rem] md:rounded-[4rem] p-6 sm:p-8 md:p-12 lg:p-24 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-8 tracking-tight max-w-4xl mx-auto font-display">
            Если вам нужен не просто сайт, а рабочая система привлечения заявок — <span className="text-emerald-500 italic">обсудим задачу</span>
          </h2>
          <p className="text-graphite-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-normal leading-relaxed font-body">
            Разберем, что нужно именно вашему бизнесу: создание сайта, SEO, Bitrix24, настройка источников, аналитика, автоматизация или выстраивание всей связки целиком.
          </p>
          <button 
            onClick={openContactModal}
            className="group relative px-12 py-6 bg-white text-graphite-950 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-2xl shadow-emerald-500/20"
          >
            <div className="absolute inset-0 bg-graphite-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-3 text-xl uppercase tracking-widest">
              Обсудить задачу <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

    </main>
  );
}
