import React, { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, Target, Layout, Database, Zap, Search, 
  Activity, BarChart3, Globe, MousePointerClick, 
  ShieldCheck, Cpu, ChevronRight
} from 'lucide-react';
import { 
  BentoCard
} from '../components/Shared';
import { SEO } from '../components/SEO';

export default function Services() {
  const containerRef = useRef(null);
  const { openContactModal } = useOutletContext();

  useEffect(() => {
    window.scrollTo(0, 0);

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
        trigger: ".services-grid",
        start: "top 80%",
        animation: gsap.fromTo(".services-grid > *", 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
        )
      });

      // 4. Growth Circuit Pulse
      gsap.to(".circuit-pulse", {
        strokeDashoffset: 0,
        duration: 3,
        repeat: -1,
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pb-24 space-y-32" ref={containerRef}>
      <SEO 
        title="Услуги маркетинга и разработки | 3ant Agency"
        description="Комплексное сопровождение: от создания сайтов и SEO до внедрения Bitrix24 и сквозной аналитики. Системные решения для роста бизнеса."
      />
      
      {/* БЛОК 1: HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-12 items-center pt-16 hero-reveal">
        <div className="flex flex-col">
          <div className="mb-8 flex items-center gap-3">
            <span className="w-10 h-[1px] bg-emerald-500/50"></span>
            <span className="text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase">Системные решения</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] mb-8 text-white">
            Услуги, которые <br/>
            помогают бизнесу <br/>
            <span className="text-emerald-500 italic">получать заявки и расти</span>
          </h1>
          <p className="text-graphite-300 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light">
            Мы создаём для бизнеса понятную и рабочую систему привлечения: 
            сайт, SEO, платный трафик, CRM, аналитика и автоматизация. 
            Подбираем и выстраиваем именно те решения, которые помогают получать обращения, видеть результат и усиливать рост.
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
              Посмотреть кейсы <ChevronRight size={20} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block relative h-[600px]">
           {/* Система: Центр и орбиты */}
           <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Фоновое свечение */}
              <div className="absolute w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>

              <div className="relative w-full h-full flex items-center justify-center">
                 
                 {/* Центральное ядро (Система) */}
                 <div className="relative z-20 w-32 h-32 bg-graphite-950 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] animate-pulse">
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-pulse opacity-50"></div>
                    <Cpu className="text-emerald-500" size={40} />
                    <div className="absolute -bottom-10 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500">Система 3ANT</div>
                 </div>

                 {/* Орбитальные узлы */}
                 <div className="absolute inset-0 animate-spin-slow">
                    {/* Узел 1: Сайт */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-10 w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-xl -rotate-45">
                       <Layout className="text-emerald-400 mb-2" size={20} />
                       <span className="text-[8px] font-bold uppercase tracking-widest text-graphite-400">Сайт</span>
                    </div>
                    {/* Узел 2: Трафик */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-10 w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-xl rotate-12">
                       <Target className="text-emerald-400 mb-2" size={20} />
                       <span className="text-[8px] font-bold uppercase tracking-widest text-graphite-400">Трафик</span>
                    </div>
                    {/* Узел 3: Конверсия */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-10 w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-xl -rotate-12">
                       <Activity className="text-emerald-400 mb-2" size={20} />
                       <span className="text-[8px] font-bold uppercase tracking-widest text-graphite-400">Рост</span>
                    </div>
                    {/* Узел 4: CRM */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-10 w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-xl rotate-45">
                       <Database className="text-emerald-400 mb-2" size={20} />
                       <span className="text-[8px] font-bold uppercase tracking-widest text-graphite-400">CRM</span>
                    </div>
                 </div>

                 {/* Линии связи (SVG) */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <circle cx="50%" cy="50%" r="200" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="50%" y1="50%" x2="50%" y2="0" stroke="white" strokeWidth="0.5" />
                    <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="white" strokeWidth="0.5" />
                    <line x1="50%" y1="50%" x2="0" y2="50%" stroke="white" strokeWidth="0.5" />
                    <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="0.5" />
                 </svg>

                 {/* Плавающие частицы данных */}
                 <div className="absolute top-20 right-20 w-2 h-2 bg-emerald-500 rounded-full animate-float-slow"></div>
                 <div className="absolute bottom-32 left-10 w-1.5 h-1.5 bg-white/40 rounded-full animate-float-medium"></div>
                 <div className="absolute top-1/2 right-10 w-1 h-1 bg-emerald-400 rounded-full animate-float-fast"></div>
              </div>
           </div>
        </div>
      </section>

      {/* BLOCK 2: INTRO */}
      <section className="reveal-section max-w-5xl mx-auto py-12">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-sm font-bold tracking-[0.3em] text-graphite-500 uppercase">Что мы делаем</h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
            У каждого бизнеса <br/>
            <span className="text-emerald-500 italic">своя точка роста</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-graphite-300">
           <div className="text-xl font-light leading-relaxed space-y-6">
             <p>У каждого бизнеса своя точка роста. Кому-то нужен сильный сайт, который будет приводить обращения.</p>
             <p>Кому-то — SEO, чтобы получать стабильный спрос из поиска. Кому-то — платный трафик для быстрого запуска.</p>
           </div>
           <div className="text-lg leading-relaxed text-graphite-400 border-l border-emerald-500/20 pl-8 flex flex-col justify-center">
             <p className="mb-6">Кому-то — CRM, аналитика и автоматизация, чтобы не терять входящие заявки и видеть реальную картину.</p>
             <p className="text-white font-medium text-xl">
               Наша задача — понять, что действительно даст результат, и реализовать это так, чтобы маркетинг работал на бизнес.
             </p>
           </div>
        </div>
      </section>

      {/* BLOCK 3: SERVICES GRID */}
      <section className="reveal-section">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-2">Основные направления</h2>
        </div>
        
        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto]">
          
          {/* CARD 1: SITES */}
          <BentoCard className="md:col-span-3 overflow-hidden group min-h-[500px]">
            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row gap-8">
              <div className="lg:w-[40%] flex flex-col justify-between">
                <div>
                  <div className="bg-emerald-500/10 p-4 rounded-3xl w-fit mb-8">
                    <Layout className="text-emerald-500" size={32} />
                  </div>
                  <h3 className="text-3xl font-medium text-white mb-4">Сайты под лидогенерацию</h3>
                  <p className="text-graphite-300 text-base leading-relaxed mb-6">
                    Создаём сайты, которые помогают превращать интерес в обращения.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-500">Что делаем</h4>
                    <ul className="grid grid-cols-1 gap-2 text-sm text-graphite-400">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full"></div> проектируем структуру сайта</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full"></div> продумываем логику страниц и блоков</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full"></div> усиливаем сценарии обращения</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full"></div> делаем посадочные страницы</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full"></div> подготавливаем к аналитике и CRM</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 block mb-2">Результат</span>
                    <p className="text-sm text-graphite-300">Сайт становится рабочим инструментом привлечения, а не просто присутствием в интернете.</p>
                  </div>
                </div>
                <button className="flex items-center gap-3 text-emerald-500 font-semibold tracking-wide hover:gap-5 transition-all">
                  Подробнее <ArrowRight size={20} />
                </button>
              </div>
              
              <div className="lg:w-[60%] relative bg-white/[0.02] rounded-[3rem] border border-white/5 p-4 flex flex-col gap-3 overflow-hidden shadow-inner group/mockup">
                 {/* Full-width Mockup Visual */}
                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                 
                 {/* Browser Header */}
                 <div className="w-full h-10 bg-white/5 rounded-t-[1.5rem] border-x border-t border-white/10 flex items-center justify-between px-6">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/10"></div>
                      <div className="w-2 h-2 rounded-full bg-white/10"></div>
                      <div className="w-2 h-2 rounded-full bg-white/10"></div>
                    </div>
                    <div className="w-[200px] h-3 bg-white/5 rounded-full"></div>
                    <div className="w-6 h-6 rounded-full bg-white/5"></div>
                 </div>

                 {/* Mockup Content */}
                 <div className="flex-1 bg-white/[0.02] rounded-b-[1.5rem] p-8 space-y-6 overflow-hidden">
                    {/* Hero area */}
                    <div className="flex justify-between gap-8 mb-12">
                       <div className="w-2/3 space-y-4">
                          <div className="h-4 w-1/3 bg-emerald-500/20 rounded-full"></div>
                          <div className="h-10 w-full bg-white/10 rounded-2xl"></div>
                          <div className="h-10 w-4/5 bg-white/10 rounded-2xl"></div>
                       </div>
                       <div className="w-1/3 h-24 bg-emerald-500/10 rounded-[2rem] border border-emerald-500/20"></div>
                    </div>
                    
                    {/* Bento blocks */}
                    <div className="grid grid-cols-3 gap-4">
                       <div className="h-32 bg-white/5 rounded-[2rem] border border-white/5"></div>
                       <div className="h-32 bg-emerald-500/10 rounded-[2rem] border border-emerald-500/20"></div>
                       <div className="h-32 bg-white/5 rounded-[2rem] border border-white/5"></div>
                    </div>

                    {/* CTA area */}
                    <div className="w-full h-24 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-center">
                       <div className="w-48 h-10 bg-emerald-500/30 rounded-full border border-emerald-500/50 flex items-center justify-center text-[10px] text-emerald-500 font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                          Contact CTA Primary
                       </div>
                    </div>
                 </div>

                 {/* Floating elements */}
                 <div className="absolute top-1/4 right-8 w-24 h-24 bg-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)] rounded-3xl -rotate-12 flex items-center justify-center group-hover/mockup:scale-110 group-hover/mockup:rotate-0 transition-transform duration-700">
                    <MousePointerClick className="text-graphite-950" size={32} />
                 </div>
              </div>
            </div>
          </BentoCard>

          {/* CARD 2: SEO */}
          <BentoCard className="flex flex-col justify-between group min-h-[500px]">
             <div>
                <div className="bg-emerald-500/10 p-4 rounded-2xl w-fit mb-8">
                  <Globe className="text-emerald-500" size={28} />
                </div>
                <h3 className="text-2xl font-medium text-white mb-4">SEO-продвижение</h3>
                <p className="text-graphite-400 text-sm leading-relaxed mb-6">
                  Развиваем поисковое направление так, чтобы бизнес получал стабильный поток целевых обращений.
                </p>
                <div className="space-y-4 mb-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Что делаем</h4>
                  <ul className="space-y-1.5 text-xs text-graphite-400">
                    <li>— собираем структуру под спрос</li>
                    <li>— развиваем семантику</li>
                    <li>— оптимизируем страницы</li>
                    <li>— усиливаем контент</li>
                    <li>— рост поисковой видимости</li>
                  </ul>
                </div>
             </div>
             <div>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 block mb-1">Результат</span>
                  <p className="text-[11px] text-graphite-300">Бизнес получает канал, который работает в долгую и накапливает ценность.</p>
                </div>
                <button className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                  Подробнее <ArrowRight size={14} />
                </button>
             </div>
          </BentoCard>

          {/* CARD 3: PERFORMANCE */}
          <BentoCard className="flex flex-col justify-between group min-h-[500px]">
             <div>
                <div className="bg-emerald-500/10 p-4 rounded-2xl w-fit mb-8">
                  <Target className="text-emerald-500" size={28} />
                </div>
                <h3 className="text-2xl font-medium text-white mb-4">Performance-маркетинг</h3>
                <p className="text-graphite-400 text-sm leading-relaxed mb-6">
                  Запускаем платное привлечение там, где нужен быстрый поток обращений и управляемый результат.
                </p>
                <div className="space-y-4 mb-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-4">Платформы</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 group/platform">
                      <div className="w-10 h-10 rounded-xl bg-[#fc3f1d] border border-white/10 flex items-center justify-center group-hover/platform:scale-110 transition-all duration-300 shadow-xl overflow-hidden relative">
                        <span className="text-white text-2xl font-bold font-sans">Я</span>
                      </div>
                      <span className="text-sm text-graphite-300 group-hover/platform:text-white transition-colors">Яндекс Директ</span>
                    </div>

                    <div className="flex items-center gap-4 group/platform">
                      <div className="w-10 h-10 rounded-xl bg-white border border-white/5 flex items-center justify-center group-hover/platform:scale-110 transition-all duration-300 shadow-lg">
                         <div className="relative w-7 h-7">
                            {/* Blue dot */}
                            <div className="absolute top-0 right-0 w-[14px] h-[14px] rounded-full bg-[#00AAFF]"></div>
                            {/* Green dot */}
                            <div className="absolute bottom-0 left-0 w-[16px] h-[16px] rounded-full bg-[#00D639]"></div>
                            {/* Red dot */}
                            <div className="absolute bottom-[2px] right-0 w-[10px] h-[10px] rounded-full bg-[#FF3B30]"></div>
                            {/* Purple dot */}
                            <div className="absolute top-[3px] left-[4px] w-[8px] h-[8px] rounded-full bg-[#8E44AD]"></div>
                         </div>
                      </div>
                      <span className="text-sm text-graphite-300 group-hover/platform:text-white transition-colors">Avito</span>
                    </div>

                    <div className="flex items-center gap-4 group/platform">
                      <div className="w-10 h-10 rounded-xl bg-[#0077FF] border border-white/5 flex items-center justify-center group-hover/platform:scale-110 transition-all duration-300 shadow-lg">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white font-serif">
                          <path d="M13.162 18.994c-6.098 0-9.57-4.172-9.714-11.11H6.6c.1 5.1 2.335 7.258 4.12 7.705V7.884h3.152v4.4c1.927-.207 3.754-2.236 4.432-4.4h3.152a9.554 9.554 0 0 1-4.032 5.61 9.761 9.761 0 0 1 4.793 5.49h-3.464c-.676-2.115-2.353-3.754-4.882-4.004v4.004h-.709z"/>
                        </svg>
                      </div>
                      <span className="text-sm text-graphite-300 group-hover/platform:text-white transition-colors">VK Реклама</span>
                    </div>
                  </div>
                </div>
             </div>
             <div>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 block mb-1">Результат</span>
                  <p className="text-[11px] text-graphite-300">Бизнес получает быстрый доступ к спросу и понятный инструмент масштабирования.</p>
                </div>
                <button className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                  Подробнее <ArrowRight size={14} />
                </button>
             </div>
          </BentoCard>

          {/* CARD 4: CRM */}
          <BentoCard className="flex flex-col justify-between group min-h-[500px]">
             <div>
                <div className="bg-emerald-500/10 p-4 rounded-2xl w-fit mb-8">
                  <Database className="text-emerald-500" size={28} />
                </div>
                <h3 className="text-2xl font-medium text-white mb-4">CRM и аналитика</h3>
                <p className="text-graphite-400 text-sm leading-relaxed mb-6">
                  Настраиваем систему, в которой видно, откуда приходят заявки и что с ними происходит дальше.
                </p>
                <div className="space-y-4 mb-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Что делаем</h4>
                  <ul className="space-y-1.5 text-xs text-graphite-400">
                    <li>— внедряем и дорабатываем CRM</li>
                    <li>— настраиваем воронки</li>
                    <li>— источники обращений</li>
                    <li>— контроль обработки</li>
                    <li>— понятная отчётность</li>
                  </ul>
                </div>
             </div>
             <div>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 block mb-1">Результат</span>
                  <p className="text-[11px] text-graphite-300">У бизнеса появляется прозрачность: движение лидов до результата.</p>
                </div>
                <button className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                  Подробнее <ArrowRight size={14} />
                </button>
             </div>
          </BentoCard>

          {/* CARD 5: AUTOMATION */}
          <BentoCard className="flex flex-col justify-between group min-h-[500px]">
             <div>
                <div className="bg-emerald-500/10 p-4 rounded-2xl w-fit mb-8">
                  <Zap className="text-emerald-500" size={28} />
                </div>
                <h3 className="text-2xl font-medium text-white mb-4">Автоматизация</h3>
                <p className="text-graphite-400 text-sm leading-relaxed mb-6">
                  Внедряем автоматизацию там, где она экономит время и ускоряет результат.
                </p>
                <div className="space-y-4 mb-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Сценарии</h4>
                  <ul className="space-y-1.5 text-xs text-graphite-400">
                    <li>— интеграция сайта и CRM</li>
                    <li>— автораспределение задач</li>
                    <li>— нейросети в процессах</li>
                    <li>— отмена ручного труда</li>
                  </ul>
                </div>
             </div>
             <div>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 block mb-1">Результат</span>
                  <p className="text-[11px] text-graphite-300">Маркетинг работает предсказуемо, команда не тратит время на рутину.</p>
                </div>
                <button className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                  Подробнее <ArrowRight size={14} />
                </button>
             </div>
          </BentoCard>

          {/* НОВОЕ: ВИЗУАЛИЗАЦИЯ АВТОМАТИЗАЦИИ */}
          <BentoCard className="md:col-span-2 min-h-[500px] overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
             <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-12">
                <div className="text-center mb-12">
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500 mb-2">Логика процессов</h4>
                   <p className="text-graphite-500 text-xs font-light max-w-xs mx-auto">Сигналы распределяются автоматически по заданным сценариям</p>
                </div>

                <div className="relative w-full max-w-[500px] h-[200px]">
                   {/* Логические шлюзы */}
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-8">
                      {[1, 2, 3].map(i => (
                         <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                         </div>
                      ))}
                   </div>

                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                      <Zap size={24} className="text-emerald-500" />
                   </div>

                   {/* Линии и частицы */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path d="M 40 50 L 250 50 L 450 100" stroke="white" strokeWidth="0.5" fill="none" className="opacity-10" />
                      <circle r="2" fill="#10b981">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M 40 50 L 250 50 L 450 100" />
                      </circle>
                      <path d="M 40 100 L 250 100 L 450 100" stroke="white" strokeWidth="0.5" fill="none" className="opacity-10" />
                      <circle r="2" fill="#10b981">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M 40 100 L 250 100 L 450 100" />
                      </circle>
                      <path d="M 40 150 L 250 150 L 450 100" stroke="white" strokeWidth="0.5" fill="none" className="opacity-10" />
                      <circle r="2" fill="#10b981">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M 40 150 L 250 150 L 450 100" />
                      </circle>
                   </svg>

                   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <Cpu size={20} className="text-graphite-400" />
                   </div>
                </div>
                
                <div className="mt-12 flex items-center gap-10">
                   <div className="flex flex-col items-center">
                      <span className="text-white font-mono text-lg tracking-tighter">99.9%</span>
                      <span className="text-[8px] uppercase tracking-widest text-graphite-500">Точность</span>
                   </div>
                   <div className="w-[1px] h-8 bg-white/10"></div>
                   <div className="flex flex-col items-center">
                      <span className="text-emerald-500 font-mono text-lg tracking-tighter">&lt; 100ms</span>
                      <span className="text-[8px] uppercase tracking-widest text-graphite-500">Отклик</span>
                   </div>
                </div>
             </div>
          </BentoCard>

        </div>
      </section>

      {/* BLOCK 4: FLOWCHART */}
      <section className="reveal-section relative liquid-glass-card rounded-[3rem] py-16 lg:py-20 px-8 lg:px-24 overflow-hidden border border-white/10 bg-white/[0.01]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent pointer-events-none"></div>
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight">Как это работает</h2>
          <p className="text-graphite-400 text-lg font-light leading-relaxed">
            Мы выстраиваем эту связку так, чтобы бизнес получал не просто трафик, 
            а понятный поток обращений и основу для дальнейшего роста.
          </p>
        </div>

        <div className="relative w-full max-w-[1100px] mx-auto pt-8 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 relative z-10">
                {[
                  { icon: <Search size={22}/>, label: "Привлечение спроса" },
                  { icon: <Layout size={22}/>, label: "Сайт и точки входа" },
                  { icon: <Activity size={22}/>, label: "Заявки" },
                  { icon: <Database size={22}/>, label: "CRM" },
                  { icon: <BarChart3 size={22}/>, label: "Аналитика" },
                  { icon: <Zap size={22}/>, label: "Рост" }
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-6 group">
                      <div className="w-16 h-16 rounded-3xl bg-graphite-950 border border-white/5 flex items-center justify-center text-emerald-500 shadow-xl group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10 transition-all duration-500 rotate-45 group-hover:rotate-0">
                        <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">
                          {item.icon}
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-graphite-500 group-hover:text-white transition-colors text-center max-w-[100px]">{item.label}</span>
                    </div>
                    {i < 5 && (
                      <div className="hidden md:flex flex-1 h-[1px] bg-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent w-full h-full -translate-x-full animate-flow-horizontal"></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </div>
        </div>
      </section>

      {/* BLOCK 5: TRUST */}
      <section className="reveal-section flex flex-col lg:flex-row gap-20 items-center">
         <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-medium text-white mb-8 leading-[1.1] tracking-tight">
              Вам не нужно <br/>
              разбираться во всех <br/>
              инструментах <span className="text-emerald-500 italic">самостоятельно</span>
            </h2>
            <div className="w-32 h-1 bg-emerald-500/30 rounded-full"></div>
         </div>
         <div className="lg:w-1/2 space-y-8">
            <p className="text-xl md:text-2xl font-light text-graphite-300 leading-relaxed italic border-l-2 border-emerald-500/20 pl-10">
              Необязательно заранее понимать, что именно вам нужно: новый сайт, SEO, реклама, CRM или автоматизация.
            </p>
            <p className="text-lg text-graphite-400 font-light leading-relaxed pl-10">
              Наша задача — разобраться в ситуации, определить сильные и слабые места и предложить решения, которые реально помогут бизнесу расти.
            </p>
         </div>
      </section>

      {/* БЛОК 6: ЗАДАЧИ */}
      <section className="reveal-section">
         <div className="mb-20 text-center">
            <h2 className="text-sm font-bold tracking-[0.4em] text-graphite-500 uppercase mb-4 font-mono">задачи</h2>
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white underline decoration-emerald-500/30 underline-offset-[12px]">С какими задачами к нам обращаются</h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Нужен сайт, который будет приводить заявки",
              "Нужно усилить SEO и увеличить поток обращений из поиска",
              "Нужно быстро запустить платное привлечение",
              "Нужно внедрить CRM и навести порядок в заявках",
              "Нужно связать маркетинг, продажи и аналитику в систему"
            ].map((task, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-white/[0.02] border-none shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:bg-emerald-500/[0.03] transition-all duration-700 flex flex-col justify-between overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full translate-x-12 -translate-y-12"></div>
                <h4 className="text-2xl font-medium text-white leading-tight italic relative z-10">{task}</h4>
                <div className="mt-8 flex items-center justify-between relative z-10">
                   <div className="w-8 h-0.5 bg-emerald-500/30 group-hover:w-full transition-all duration-700"></div>
                </div>
              </div>
            ))}
            <div 
              onClick={openContactModal}
              className="p-10 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-emerald-500/20 transition-all border-dashed"
            >
              <h4 className="text-2xl font-bold text-white mb-6">Ваша задача?</h4>
              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-graphite-950 bg-white px-8 py-4 rounded-full transition-transform hover:scale-110">
                Связаться
              </button>
            </div>
         </div>
      </section>

      {/* BLOCK 7: FINAL CTA */}
      <section className="reveal-section relative bg-graphite-900 rounded-[4rem] p-12 md:p-32 text-center flex flex-col items-center overflow-hidden border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/15 via-transparent to-transparent pointer-events-none"></div>
        
        <h2 className="text-4xl md:text-7xl font-semibold tracking-tight leading-[1.05] max-w-5xl mb-12 relative z-10 text-white">
          Подберём решения под вашу задачу <br/>
          и соберём <span className="text-emerald-500">рабочую систему роста</span>
        </h2>
        <p className="text-graphite-400 text-lg md:text-2xl mb-16 max-w-3xl relative z-10 font-light leading-relaxed">
          Расскажите, какой у вас бизнес, что уже работает и какой результат вы хотите получить. 
          Мы предложим понятную логику действий и поможем выстроить маркетинг так, чтобы он давал опору для роста.
        </p>
        <button 
          onClick={openContactModal}
          className="group relative z-10 px-14 py-7 bg-white text-graphite-950 text-xl font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] shadow-[0_0_80px_rgba(16,185,129,0.3)] active:scale-[0.98]"
        >
           <span className="relative flex items-center gap-4">
              Обсудить задачу <ArrowRight size={28} className="text-emerald-500 group-hover:translate-x-2 transition-transform" />
           </span>
        </button>
      </section>

    </main>
  );
}
