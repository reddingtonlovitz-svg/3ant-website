import React, { useEffect, useRef } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, Calendar, User, Tag, ChevronRight, Share2, MessageSquare } from 'lucide-react';
import { SEO } from '../components/SEO';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const [post, setPost] = React.useState(null);
  const [otherPosts, setOtherPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const res = await fetch('/api/articles');
        const allPosts = await res.json();
        
        const currentPost = allPosts.find(p => p.slug === slug);
        if (!currentPost) {
          navigate('/blog');
          return;
        }
        
        setPost(currentPost);
        setOtherPosts(allPosts.filter(p => p.slug !== slug).slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch article:", err);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

  useEffect(() => {
    if (post) {
      let ctx = gsap.context(() => {
        // Content Reveal
        gsap.fromTo(".post-header > *", 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
        );
        
        gsap.fromTo(".post-content", 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: "power2.out" }
        );

        gsap.fromTo(".post-sidebar", 
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power2.out" }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [post]);

  if (!post) return null;

  return (
    <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-24" ref={containerRef}>
      <SEO 
        title={post.title}
        description={post.excerpt}
        ogImage={post.image}
        ogType="article"
      />

      {/* Navigation Breadcrumbs */}
      <nav className="pt-8 pb-12 flex items-center gap-3 text-sm text-graphite-500 font-medium tracking-tight">
        <NavLink to="/blog" className="hover:text-emerald-500 transition-colors flex items-center gap-2">
          <ArrowLeft size={16} /> Назад в блог
        </NavLink>
        <ChevronRight size={14} className="opacity-30" />
        <span className="text-white/40 truncate max-w-[200px]">{post.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-24">
        {/* Main Content Area */}
        <article className="space-y-12">
          {/* Header */}
          <header className="post-header space-y-8">
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
               <span className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">{post.category}</span>
               <div className="flex items-center gap-2 text-graphite-400">
                  <Calendar size={14} />
                  <span>{new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
               </div>
               <div className="flex items-center gap-2 text-graphite-400">
                  <User size={14} />
                  <span>{post.author}</span>
               </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] leading-[1.1] text-white font-display">
              {post.title}
            </h1>

            <p className="text-xl md:text-2xl text-graphite-300 font-normal leading-relaxed italic border-l-4 border-emerald-500/30 pl-8">
              {post.excerpt}
            </p>

            <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </header>

          {/* Body Content */}
          <div 
            className="post-content prose prose-invert prose-emerald max-w-none text-graphite-300 text-lg leading-relaxed font-body
              prose-h3:text-3xl prose-h3:font-bold prose-h3:text-white prose-h3:mt-12 prose-h3:mb-6
              prose-p:mb-8 prose-p:font-normal
              prose-li:text-graphite-400 prose-li:mb-2
              prose-strong:text-white prose-strong:font-bold
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Social Share (Placeholder UX) */}
          <footer className="pt-16 border-t border-white/5 flex flex-wrap items-center justify-between gap-8">
             <div className="flex flex-wrap gap-4">
                {post.tags.map(tag => (
                   <span key={tag} className="flex items-center gap-2 text-[10px] font-bold text-graphite-500 bg-white/5 px-4 py-2 rounded-full border border-white/5 uppercase tracking-widest transition-colors hover:border-emerald-500/30">
                      <Tag size={12} className="text-emerald-500/50" /> {tag}
                   </span>
                ))}
             </div>
             <div className="flex items-center gap-4">
               <span className="text-xs font-bold text-graphite-500 uppercase tracking-widest mr-2">Поделиться:</span>
               <button className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:bg-emerald-500 hover:text-white transition-all">
                  <Share2 size={18} />
               </button>
               <button className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:bg-emerald-500 hover:text-white transition-all">
                  <Share2 size={18} />
               </button>
               <button className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:bg-emerald-500 hover:text-white transition-all">
                  <Share2 size={18} />
               </button>
             </div>
          </footer>
        </article>

        {/* Sidebar / More Content */}
        <aside className="post-sidebar space-y-12">
            <div className="liquid-glass-card rounded-[2.5rem] p-8 border border-white/5 bg-emerald-500/[0.02]">
                <h4 className="text-xl font-bold text-white mb-6">Нужна консультация?</h4>
                <p className="text-graphite-400 text-sm leading-relaxed mb-8">
                   Разберем вашу ситуацию и предложим конкретную стратегию роста. Бесплатно.
                </p>
                <button className="w-full bg-emerald-500 text-white font-bold py-4 rounded-full text-sm hover:scale-[1.03] transition-transform shadow-lg shadow-emerald-500/20">
                   Оставить заявку
                </button>
            </div>

            <div className="space-y-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-graphite-500 flex items-center gap-2">
                   <ChevronRight size={14} className="text-emerald-500" /> Другие статьи
                </h4>
                <div className="space-y-6">
                   {otherPosts.map(p => (
                      <NavLink key={p.id} to={`/blog/${p.slug}`} className="group block space-y-3">
                         <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                         </div>
                         <h5 className="text-white font-bold text-sm leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {p.title}
                         </h5>
                      </NavLink>
                   ))}
                </div>
            </div>
        </aside>
      </div>
    </main>
  );
}
