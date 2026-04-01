import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { InteractiveBackground, MicroUIStyles } from './Shared';
import { ContactModal } from './ContactModal';
import { gsap } from 'gsap';
import { Menu, X, Phone } from 'lucide-react';

export const Header = ({ onOpenContact }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuLinksRef = useRef(null);

  const isActive = (path) => location.pathname === path ? "text-white" : "text-graphite-300 hover:text-white transition-colors duration-300";
  const isMobileActive = (path) => location.pathname === path ? "text-emerald-500" : "text-white/70";

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Animate mobile menu open/close
  useEffect(() => {
    if (!overlayRef.current) return;
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        '.mobile-menu-link',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out', delay: 0.15 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.25, ease: 'power2.in' });
    }
  }, [mobileMenuOpen]);
  
  return (
    <>
      <header className="relative z-50 w-full px-4 sm:px-6 py-5 md:py-8 max-w-[1400px] mx-auto flex justify-between items-center text-[15px] font-medium border-b border-white/5 mb-8 md:mb-12">
        <NavLink to="/" className="text-xl font-bold tracking-tight uppercase relative z-[60]">3ant</NavLink>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 lg:gap-10 text-graphite-300">
          <NavLink to="/" className={isActive("/")}>Главная</NavLink>
          <NavLink to="/services" className={isActive("/services")}>Услуги</NavLink>
          <NavLink to="/approach" className={isActive("/approach")}>Подход</NavLink>
          <NavLink to="/cases" className={isActive("/cases")}>Кейсы</NavLink>
          <NavLink to="/contacts" className={isActive("/contacts")}>Контакты</NavLink>
        </nav>
        
        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="tel:89137154800" className="hidden sm:flex items-center gap-3 bg-graphite-800/80 px-5 py-2.5 rounded-full border border-white/5 hover:border-white/20 hover:text-white transition-all duration-300">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            8 (913) 715-48-00
          </a>
          <button 
            onClick={onOpenContact}
            className="bg-white text-graphite-950 px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/10"
          >
            Обсудить проект
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="lg:hidden relative z-[60] w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Меню"
        >
          {mobileMenuOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
        </button>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[55] bg-graphite-950/98 backdrop-blur-xl flex flex-col justify-center items-center opacity-0 pointer-events-none lg:hidden"
      >
        <nav ref={menuLinksRef} className="flex flex-col items-center gap-6 mb-12">
          {[
            { to: '/', label: 'Главная' },
            { to: '/services', label: 'Услуги' },
            { to: '/approach', label: 'Подход' },
            { to: '/cases', label: 'Кейсы' },
            { to: '/contacts', label: 'Контакты' },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`mobile-menu-link text-3xl sm:text-4xl font-semibold tracking-tight transition-colors ${isMobileActive(link.to)}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mobile-menu-link flex flex-col items-center gap-4">
          <a href="tel:89137154800" className="flex items-center gap-3 text-graphite-400 text-lg">
            <Phone size={18} className="text-emerald-500" />
            8 (913) 715-48-00
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
            className="mt-4 bg-white text-graphite-950 px-10 py-4 rounded-full font-bold text-base active:scale-95 transition-transform shadow-lg shadow-emerald-500/10"
          >
            Обсудить проект
          </button>
        </div>
      </div>
    </>
  );
};

export const Footer = () => (
  <footer className="relative z-50 w-full max-w-[1400px] mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center text-graphite-500 text-sm border-t border-white/5 pb-16">
    <div className="font-medium">© 2026 3ant. Маркетинговое агентство.</div>
    <div className="flex items-center gap-8 mt-6 md:mt-0 font-medium tracking-wide">
      <NavLink to="/cases" className="hover:text-white transition-colors">Кейсы</NavLink>
      <NavLink to="/contacts" className="hover:text-white transition-colors">Контакты</NavLink>
      <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
    </div>
  </footer>
);

export const Layout = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <div className="relative min-h-screen bg-transparent text-graphite-50 font-sans selection:bg-white/20 overflow-x-hidden">
      <MicroUIStyles />
      <InteractiveBackground />
      {/* Texture Background */}
      <div className="fixed inset-0 z-50 noise-bg pointer-events-none"></div>

      <Header onOpenContact={openContactModal} />
      
      <main className="relative z-10 w-full max-w-[1400px] mx-auto">
        <Outlet context={{ openContactModal }} />
      </main>

      <Footer />

      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
};
