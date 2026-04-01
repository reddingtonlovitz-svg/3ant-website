import React, { useRef, useState, useEffect, memo } from 'react';
import { gsap } from 'gsap';
import { Phone, Mail, User, Building2, MessageSquare, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { LiquidGlassButton } from './Shared';
import emailjs from '@emailjs/browser';
import { IMaskInput } from 'react-imask';

// --- CONFIGURATION ---
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID; 
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * SuccessModal: Animated feedback after form submission.
 */
export const SuccessModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(modalRef.current, 
          { scale: 0.95, opacity: 0, y: 10 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      });
      return () => ctx.revert();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-md liquid-glass-card rounded-[3rem] p-10 text-center border border-white/10 bg-[#121212] shadow-2xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-graphite-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-emerald-500" />
        </div>
        
        <h2 className="text-2xl font-medium text-white mb-3 tracking-tight">Спасибо!</h2>
        <p className="text-graphite-400 font-light text-sm leading-relaxed">
          Заявка отправлена. Мы скоро свяжемся с вами для обсуждения задачи.
        </p>

        <button 
          onClick={onClose}
          className="mt-8 px-8 py-2.5 rounded-full border border-white/10 text-white text-xs font-medium hover:bg-white/5 transition-colors"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

const FormInput = ({ label, name, type = "text", icon, value, onChange, required = false }) => (
  <div className="space-y-2 group/input">
    <label className="text-[10px] font-bold uppercase tracking-widest text-graphite-500 ml-4">{label}</label>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-graphite-500">{icon}</div>
      <input 
        type={type} 
        name={name} 
        required={required} 
        value={value} 
        onChange={onChange} 
        className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 pl-14 pr-6 text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-graphite-600" 
      />
    </div>
  </div>
);

export const ContactForm = ({ title = "Оставьте заявку", subtitle = "Обсудим вашу задачу и составим план работ." }) => {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneAccept = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Пожалуйста, введите ваше имя");
    const digits = formData.phone.replace(/\D/g, '');
    if (digits.length < 11) return alert("Пожалуйста, введите полный номер телефона");
    if (formData.email && !validateEmail(formData.email)) return alert("Пожалуйста, введите корректный Email");

    setIsSending(true);
    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      } else {
        await new Promise(r => setTimeout(r, 1000));
      }
      setShowSuccess(true);
      setFormData({ name: '', phone: '', email: '', company: '', comment: '' });
      formRef.current.reset();
    } catch (e) {
      alert("Ошибка при отправке.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">{title}</h2>
        <p className="text-graphite-400 font-light">{subtitle}</p>
      </div>

      <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Имя *" name="name" icon={<User size={18}/>} value={formData.name} onChange={handleChange} required />
          <div className="space-y-2 group/input">
            <label className="text-[10px] font-bold uppercase tracking-widest text-graphite-500 ml-4">Телефон *</label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-graphite-500" size={18} />
              <IMaskInput 
                mask="+{7} (000) 000-00-00" 
                lazy={false} 
                name="phone" 
                value={formData.phone} 
                onAccept={handlePhoneAccept} 
                className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 pl-14 pr-6 text-white focus:outline-none focus:border-emerald-500/50 transition-all" 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Email" name="email" type="email" icon={<Mail size={18}/>} value={formData.email} onChange={handleChange} />
          <FormInput label="Компания" name="company" icon={<Building2 size={18}/>} value={formData.company} onChange={handleChange} />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-graphite-500 ml-4">Комментарий</label>
          <div className="relative">
            <MessageSquare className="absolute left-5 top-6 text-graphite-500" size={18} />
            <textarea 
              name="comment" 
              rows="4" 
              value={formData.comment} 
              onChange={handleChange} 
              className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] py-5 pl-14 pr-6 text-white focus:outline-none focus:border-emerald-500/50 transition-all resize-none" 
              placeholder="Краткое описание задачи..." 
            />
          </div>
        </div>

        <div className="pt-6">
          <LiquidGlassButton type="submit" disabled={isSending} className="w-full py-6 text-lg font-bold tracking-widest uppercase disabled:opacity-50">
            {isSending ? "Отправка..." : "Обсудить задачу"} 
            {!isSending && <ArrowRight size={22} className="group-hover:translate-x-1" />}
          </LiquidGlassButton>
        </div>
      </form>
    </>
  );
};
