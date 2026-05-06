/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Leaf, 
  Sparkles, 
  Heart,
  Droplets,
  Zap,
  Flower2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12 flex justify-between items-center",
      isScrolled ? "bg-brand-cream/90 backdrop-blur-md border-b border-brand-sand py-4" : "bg-transparent"
    )}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-brand-sage flex items-center justify-center">
          <div className="w-4 h-4 bg-brand-sage rounded-full animate-pulse" />
        </div>
        <h1 className={cn(
          "text-xl md:text-2xl font-serif tracking-tighter uppercase font-light",
          !isScrolled ? "text-white" : "text-brand-charcoal"
        )}>
          Sesame <span className="serif-italic lowercase opacity-60">Acupuncture</span>
        </h1>
      </div>

      <div className="hidden md:flex gap-10 items-center">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className={cn(
            "nav-link",
            !isScrolled && "text-white"
          )}>
            {link.name}
          </a>
        ))}
        <button className="px-6 py-2 bg-brand-charcoal text-brand-cream rounded-full text-xs uppercase tracking-widest hover:bg-brand-sage transition-colors">
          Book Session
        </button>
      </div>

      <button 
        className={cn("md:hidden", !isScrolled ? "text-white" : "text-brand-charcoal")}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-cream border-b border-brand-sand p-8 flex flex-col gap-6 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif uppercase tracking-widest text-center"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-4 bg-brand-charcoal text-brand-cream rounded-full text-xs uppercase tracking-widest">
              Book Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const slides = [
  {
    title: "Acupuncture for Modern Life.",
    desc: "Adapting thousands of years of TCM tradition to the rhythms of your modern lifestyle.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000",
    cta: "Learn More"
  },
  {
    title: "No Tox, All Lift.",
    desc: "NEW Facial Acupuncture to firm, smooth, and glow naturally.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=2000",
    cta: "Learn More"
  },
  {
    title: "Detox. Release. Restore.",
    desc: "Therapeutic cupping designed to pull tension away and invite deep systemic relaxation.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=2000",
    cta: "Learn More"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-charcoal">
      <AnimatePresence mode="wait">
        <motion.div 
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={slides[current].image} 
            alt={slides[current].title} 
            className="w-full h-full object-cover brightness-75 transition-transform duration-[10000ms] scale-110 motion-safe:animate-[zoom_10s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-8xl font-serif font-light text-white leading-[1.1] mb-6 tracking-tight">
              {slides[current].title.split(':').length > 1 ? (
                <>
                  {slides[current].title.split(':')[0]}
                  <span className="serif-italic">:{slides[current].title.split(':')[1]}</span>
                </>
              ) : slides[current].title}
            </h2>
            <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light tracking-wide italic">
              {slides[current].desc}
            </p>
            <div className="flex justify-center">
              <button className="px-12 py-4 bg-[#DDB58F] text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-sage hover:scale-105 transition-all duration-300 shadow-xl">
                {slides[current].cta}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 z-20 flex items-center gap-4">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-0.5" />}
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <style>{`
        @keyframes zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-24 md:py-32 bg-brand-sand/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=1200" 
                alt="Professional acupuncture treatment" 
                className="rounded-t-full rounded-b-lg w-full aspect-[4/5] object-cover shadow-2xl"
              />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-sage rounded-full flex items-center justify-center p-6 text-brand-cream text-center text-[10px] uppercase tracking-widest hidden lg:flex">
                Rooted in 2500 years of Tradition
              </div>
            </div>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 space-y-8">
            <span className="text-xs uppercase tracking-widest text-brand-clay font-semibold">Our Philosophy</span>
            <h3 className="text-4xl md:text-6xl font-serif font-light leading-snug">
              The balance of <span className="serif-italic">Yin & Yang</span> starts within.
            </h3>
            <p className="text-lg text-brand-charcoal/80 leading-relaxed font-light">
              Since 2500 BCE, practitioners have understood that physical disharmony arises from imbalance. 
              Our goal is to harmonize these forces—the active Yang and the restorative Yin—to bring your body back to its natural resonance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {[
                { title: 'Personalized Care', desc: 'Every treatment plan is as unique as your own biology.' },
                { title: 'Preventative Care', desc: 'Strengthening your immunity and vitality before symptoms arise.' },
                { title: 'Holistic View', desc: 'We treat the person, not just the symptom.' },
                { title: 'Nature Inspired', desc: 'Harnessing the power of botanicals and natural healing.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-5 h-5 text-brand-sage" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1">{item.title}</h4>
                    <p className="text-sm text-brand-charcoal/60 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FirstSessionSection = () => {
  const steps = [
    { 
      step: 'Step 1', 
      title: 'Health assessment', 
      time: '15 Min',
      desc: 'A licensed acupuncturist will conduct a thorough assessment on your overall health and concerns in a private relaxing room.', 
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
    },
    { 
      step: 'Step 2', 
      title: 'Treatment + ear seeding', 
      time: '15 Min',
      desc: 'They will perform a customized treatment of acupuncture and/or cupping, as well as ear seeding, to treat concerns at the root.', 
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800'
    },
    { 
      step: 'Step 3', 
      title: 'Relax + meditate', 
      time: '30 Min',
      desc: 'Enjoy guided meditation, sound bath and aromatherapy on our heated beds. Leave with a treatment plan and recommended herbs.', 
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="experience" className="py-24 md:py-32 bg-brand-cream">
      <div className="container mx-auto px-6 text-center mb-20">
        <h3 className="text-4xl md:text-5xl font-serif font-light mb-4 text-brand-moss">What To Expect In Your First Session</h3>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#F2E8DF]/40 rounded-3xl p-6 flex flex-col items-center text-center group"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-8 bg-brand-sand">
                <div className="absolute top-4 left-4 z-10 bg-[#D4E2AF] px-4 py-2 rounded-tr-3xl rounded-bl-3xl shadow-sm">
                  <span className="text-brand-sage font-serif uppercase tracking-widest text-sm font-medium">{step.step}</span>
                </div>
                <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 right-4 z-10">
                  <span className="text-2xl font-serif text-brand-moss bg-brand-cream/80 backdrop-blur-sm px-3 py-1 rounded-lg">{step.time}</span>
                </div>
              </div>
              <h4 className="font-serif text-2xl mb-4 text-brand-moss">{step.title}</h4>
              <p className="text-brand-charcoal/70 font-light leading-relaxed px-4">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConditionsSection = () => {
  const conditions = [
    {
      title: 'Pain',
      items: 'Muscle/joint pain, sciatic, neuropathy, headaches, carpal tunnel, sprain, sports injury',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'Mood',
      items: 'Stress, anxiety, PTSD, depression, panic attack, insomnia',
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: 'Beauty',
      items: 'Anti-aging, facial rejuvenation, wrinkles, acne, dark circles, hair growth, weight control',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: 'Hormonal',
      items: 'Infertility, egg/sperm quality, menopause, PMS, menstrual cramps, induction, milk production',
      icon: <Flower2 className="w-6 h-6" />
    },
    {
      title: 'Digestion',
      items: 'Heartburn, asthma, allergies, digestive disorder, nausea, IBS, constipation',
      icon: <Droplets className="w-6 h-6" />
    },
    {
      title: 'Others',
      items: 'Cold/flu, addiction, blood pressure, fatigue, oncology, post-stroke, chemo side-effects',
      icon: <Leaf className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-brand-sand/20">
      <div className="container mx-auto px-6 text-center mb-16">
        <h3 className="text-4xl md:text-5xl font-serif font-light mb-4 text-brand-moss">Conditions We Treat</h3>
        <p className="serif-italic text-xl text-brand-clay">Embrace your health, enhance your beauty</p>
      </div>

      <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {conditions.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-cream border border-brand-sand p-10 rounded-[40px] flex flex-col items-center text-center transition-all hover:shadow-xl hover:border-brand-sage group"
          >
            <div className="w-16 h-16 rounded-full bg-brand-sage/10 flex items-center justify-center text-brand-sage mb-6 group-hover:bg-brand-sage group-hover:text-brand-cream transition-all duration-500">
              {item.icon}
            </div>
            <h4 className="font-serif text-2xl mb-4 text-brand-moss tracking-tight">{item.title}</h4>
            <div className="h-[1px] w-12 bg-brand-clay/30 mb-4" />
            <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed">{item.items}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ServiceSection = () => {
  const services = [
    { 
      name: 'Classical Acupuncture', 
      tag: 'Ancient Balance', 
      desc: 'Systemic healing to restore your body\'s natural rhythm and flow.', 
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: 'Cosmetic Acupuncture', 
      tag: 'Natural Lift', 
      desc: 'Refining acupuncture for radiant skin health and natural facial rejuvenation.', 
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: 'Micro-needling', 
      tag: 'Textural Glow', 
      desc: 'Collagen induction therapy for refined skin texture and luminosity.', 
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: 'Classic Cupping', 
      tag: 'Detox & Release', 
      desc: 'Deep tissue release and improved circulation to clear stagnation.', 
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: 'Light Therapy', 
      tag: 'Cellular Repair', 
      desc: 'Advanced light wavelengths to accelerate cellular healing and reduce inflammation.', 
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: 'Auriculotherapy', 
      tag: 'Ear Reflexology', 
      desc: 'Targeted microsystem therapy for stress, addiction, and internal health.', 
      image: 'https://images.unsplash.com/photo-1560944414-10d51c769ef3?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: 'Facial Guasha', 
      tag: 'Sculpt & Glow', 
      desc: 'Traditional stone scraping to sculpt, de-puff, and glow naturally.', 
      image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: 'Fertility Support', 
      tag: 'Nurturing Paths', 
      desc: 'Specialized care for hormonal balance and your reproductive journey.', 
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800' 
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-brand-cream border-t border-brand-sand">
      <div className="container mx-auto px-6 mb-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-clay mb-4 block">Our Modalities</span>
        <h3 className="text-4xl md:text-6xl font-serif font-light text-brand-moss">Rooted <span className="serif-italic lowercase opacity-60">in</span> results.</h3>
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {services.map((service, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-brand-sand shadow-sm">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-3xl tracking-tight text-brand-moss">{service.name}</h4>
              <p className="serif-italic text-lg text-brand-charcoal/50 leading-none">{service.tag}</p>
              <div className="pt-4">
                <a 
                  href="#contact" 
                  className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold border-b-2 border-brand-charcoal pb-1 hover:text-brand-clay hover:border-brand-clay transition-all duration-300"
                >
                  Book Now
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="bg-brand-sand/50 rounded-[40px] overflow-hidden grid lg:grid-cols-2">
          <div className="p-12 md:p-20 space-y-12">
            <div>
              <h3 className="text-4xl md:text-5xl font-serif font-light mb-6">Visit Our Clinic</h3>
              <p className="text-brand-charcoal/60 font-light">Located in the heart of Silicon Valley, we provide a quiet retreat from the technological hum.</p>
            </div>
            
            <div className="grid gap-8">
              <div className="flex gap-6 items-start">
                <MapPin className="text-brand-sage w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-serif text-xl mb-1">Santa Clara Clinic</h4>
                  <p className="text-brand-charcoal/60 font-light leading-relaxed">
                    3058A Scott Blvd<br />
                    Santa Clara, CA 95054
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <Clock className="text-brand-sage w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-serif text-xl mb-1">Office Hours</h4>
                  <p className="text-brand-charcoal/60 font-light leading-relaxed">
                    Tue – Fri: 10:00am — 6:30pm<br />
                    Sat: 10:00am — 2:00pm<br />
                    Sun – Mon: Closed
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <Phone className="text-brand-sage w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-serif text-xl mb-1">Direct Line</h4>
                  <p className="text-brand-charcoal/60 font-light leading-relaxed">
                    Call or Text: 669.252.0521<br />
                    info@sesameacupuncture.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
              alt="Clinic interior" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-moss/10" />
            <div className="absolute bottom-10 right-10 p-1 bg-brand-cream rounded-full border border-brand-sand shadow-2xl">
              <div className="px-8 py-3 bg-brand-charcoal text-brand-cream rounded-full text-xs uppercase tracking-widest cursor-pointer hover:bg-brand-sage transition-colors">
                Get Directions
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-cream border-t border-brand-sand py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20 border-b border-brand-sand pb-12">
          <div className="text-center md:text-left">
             <h2 className="text-4xl font-serif tracking-tighter uppercase font-light">
              Sesame <span className="serif-italic lowercase opacity-60">Acupuncture</span>
            </h2>
            <p className="text-xs uppercase tracking-widest text-brand-clay mt-4 opacity-70">Elevating Health, Restoring Balance.</p>
          </div>
          
          <div className="flex gap-8 text-[11px] uppercase tracking-widest">
            <a href="#" className="hover:text-brand-clay transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-clay transition-colors">Yelp</a>
            <a href="#" className="hover:text-brand-clay transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] opacity-40">
          <p>© 2024 Sesame Acupuncture & Herbs. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-clay selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <PhilosophySection />
        <ServiceSection />
        <ConditionsSection />
        <FirstSessionSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating CTA for Mobile */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <button className="w-full py-5 bg-brand-charcoal text-brand-cream rounded-full text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-transform">
          Book Appointment
        </button>
      </div>
    </div>
  );
}

