import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, User, Tag, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';

export default function Blog() {
  const containerRef = useRef(null);

  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/articles');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    let ctx = gsap.context(() => {
      if (!loading && posts.length > 0) {
        // Hero Reveal
        gsap.fromTo(".blog-hero > *", 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }
        );

        // Cards Reveal
        gsap.fromTo(".blog-card", 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".blog-grid",
              start: "top 85%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [loading, posts.length]);

  return (
    <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-24" ref={containerRef}>
      <SEO 
        title="Блог о маркетинге и автоматизации | 3ant Agency"
        description="Полезные статьи о B2B маркетинге, SEO продвижении, внедрении CRM и автоматизации бизнес-процессов. Делимся опытом и кейсами."
      />

      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 blog-hero">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-8 flex items-center gap-3 justify-center">
            <span className="w-10 h-[1px] bg-emerald-500/50"></span>
            <span className="text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase">База знаний</span>
            <span className="w-10 h-[1px] bg-emerald-500/50"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-[-0.04em] leading-[1.05] mb-8 text-white font-display">
            Мысли о <span className="text-emerald-500 italic">маркетинге</span>, <br />
            технологиях и росте
          </h1>
          <p className="text-graphite-300 text-lg md:text-xl leading-relaxed font-normal font-body">
            Разбираем сложные инструменты простыми словами. Делимся внутренними процессами и результатами экспериментов в B2B сегменте.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center text-graphite-500">Загрузка статей...</div>
        ) : posts.length === 0 ? (
          <div className="col-span-full py-20 text-center text-graphite-500">Статей пока нет.</div>
        ) : (
          posts.map((post) => (
            <article 
              key={post.id} 
              className="blog-card group relative liquid-glass-card rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500"
            >
              <NavLink to={`/blog/${post.slug}`} className="block">
                {/* Image Header */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-emerald-500 text-graphite-950 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 pb-10">
                  <div className="flex items-center gap-4 mb-6 text-graphite-500 text-[11px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-emerald-500/60" />
                      <span>{new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-emerald-500/60" />
                      <span>5 мин</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-graphite-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 text-[10px] font-bold">
                        {post.author.split(' ')[0][0]}
                      </div>
                      <span className="text-xs text-graphite-300 font-medium">{post.author}</span>
                    </div>
                    <div className="text-emerald-500 group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </NavLink>
            </article>
          ))
        )}
      </section>

      {/* Load More (Future) */}
      <div className="mt-20 flex justify-center">
        <button className="px-12 py-5 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all text-sm tracking-widest uppercase">
          Показать еще статьи
        </button>
      </div>
    </main>
  );
}
