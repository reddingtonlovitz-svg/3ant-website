import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { InteractiveBackground, MicroUIStyles } from './Shared';
import { ContactModal } from './ContactModal';

export const Header = ({ onOpenContact }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "text-white" : "text-graphite-300 hover:text-white transition-colors duration-300";
  
  return (
    <header className="relative z-50 w-full px-6 py-6 md:py-8 max-w-[1400px] mx-auto flex justify-between items-center text-[15px] font-medium border-b border-white/5 mb-12">
      <NavLink to="/" className="text-xl font-bold tracking-tight uppercase">3ant</NavLink>
      <nav className="hidden lg:flex gap-8 lg:gap-10 text-graphite-300">
        <NavLink to="/" className={isActive("/")}>Главная</NavLink>
        <NavLink to="/services" className={isActive("/services")}>Услуги</NavLink>
        <NavLink to="/approach" className={isActive("/approach")}>Подход</NavLink>
        <NavLink to="/cases" className={isActive("/cases")}>Кейсы</NavLink>
        <NavLink to="/contacts" className={isActive("/contacts")}>Контакты</NavLink>
      </nav>
      <div className="flex items-center gap-6">
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
    </header>
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
