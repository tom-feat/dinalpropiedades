import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building, MapPin, Compass, Search, Phone, Mail, ArrowRight, Menu, X, Clock, Bed, Bath } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// A. NAVBAR
// ----------------------------------------------------
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isContactPage = location.pathname === '/contacto';
  const isEmprendimientosPage = location.pathname === '/emprendimientos';
  const isAlquilerPage = location.pathname === '/alquiler';
  const isVentaPage = location.pathname === '/venta';
  const isSucursalesPage = location.pathname === '/sucursales';

  const isDarkNav = scrolled || isContactPage || isEmprendimientosPage || isAlquilerPage || isVentaPage || isSucursalesPage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out w-[95%] max-w-7xl rounded-full px-6 py-4 flex items-center justify-between
      ${isDarkNav ? 'bg-background/90 backdrop-blur-xl border border-primary/10 shadow-lg' : 'bg-transparent text-background'}
    `}>
      <div className="flex items-center">
        {/* We use CSS invert to turn the white logo black when the navbar background turns white */}
        <Link to="/">
          <img 
            src="/logo.svg" 
            alt="Dinal Propiedades" 
            className={`h-8 transition-all duration-500 ${isDarkNav ? 'invert' : ''}`} 
          />
        </Link>
      </div>
      
      <div className={`hidden md:flex items-center gap-8 font-heading font-medium text-sm tracking-wide ${isDarkNav ? 'text-primary' : 'text-background/90'}`}>
        <Link to="/venta" className="hover:-translate-y-[1px] hover:text-accent transition-all duration-300">Venta</Link>
        <Link to="/alquiler" className="hover:-translate-y-[1px] hover:text-accent transition-all duration-300">Alquiler</Link>
        <Link to="/emprendimientos" className="hover:-translate-y-[1px] hover:text-accent transition-all duration-300">Emprendimientos</Link>
        <Link to="/sucursales" className="hover:-translate-y-[1px] hover:text-accent transition-all duration-300">Sucursales</Link>
      </div>

      <div className="hidden md:block">
        <Link to="/contacto" className={`block relative overflow-hidden group px-6 py-2.5 rounded-full font-heading font-semibold text-sm transition-colors duration-300
          ${isDarkNav ? 'border border-primary text-primary hover:border-accent hover:text-accent' : 'border border-white text-white hover:border-accent hover:text-accent'}
        `}>
          <span className="relative z-10">Contacto</span>
        </Link>
      </div>

      <button className="md:hidden z-50 relative" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className={isDarkNav ? "text-primary" : "text-background"} />}
      </button>
    </nav>

    {/* Mobile nav — rendered outside the transformed <nav> so position:fixed works correctly */}
    <div className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-8 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <img src="/logo.svg" alt="Dinal Propiedades" className="h-10 invert mb-8" />
         <Link to="/venta" className="font-heading text-4xl text-primary hover:text-accent transition-colors" onClick={()=>setMobileOpen(false)}>Venta</Link>
         <Link to="/alquiler" className="font-heading text-4xl text-primary hover:text-accent transition-colors" onClick={()=>setMobileOpen(false)}>Alquiler</Link>
         <Link to="/emprendimientos" className="font-heading text-4xl text-primary hover:text-accent transition-colors" onClick={()=>setMobileOpen(false)}>Emprendimientos</Link>
         <Link to="/sucursales" className="font-heading text-4xl text-primary hover:text-accent transition-colors" onClick={()=>setMobileOpen(false)}>Sucursales</Link>
         <Link to="/contacto" className="font-heading text-4xl text-primary hover:text-accent transition-colors" onClick={()=>setMobileOpen(false)}>Contacto</Link>
    </div>
    </>
  );
};

// ----------------------------------------------------
// B. HERO
// ----------------------------------------------------
const Hero = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end pb-24 lg:pb-32 px-6 lg:px-12 object-cover overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/Size%20Optimized/_MG_1091.jpg"
          alt="Modern Architecture"
          className="w-full h-full object-cover scale-105 origin-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <h1 className="text-background flex flex-col gap-4">
          <span className="hero-element font-heading font-medium text-3xl md:text-5xl lg:text-5xl tracking-tight">Espacios visionarios para la</span>
          {/* Relaxed leading and removed fixed heights to prevent text overlap on wrap */}
          <span className="hero-element font-drama text-5xl md:text-7xl lg:text-8xl leading-none md:leading-[1.1] text-white drop-shadow-md pb-4">
            vanguardia moderna.
            <div className="h-1 w-24 bg-accent mt-8 mb-2"></div>
          </span>
        </h1>
        <p className="hero-element mt-6 text-background/80 font-heading text-lg max-w-xl">
          Impulsamos tus proyectos con la energía de un equipo joven y la solidez de más de 30 años construyendo hogares de calidad.
        </p>
        <div className="hero-element mt-10">
          <button className="group flex items-center gap-4 border border-white text-white px-8 py-4 rounded-full font-heading font-bold text-lg hover:border-accent hover:text-accent hover:scale-[1.02] transition-all duration-300">
            Encontrá tu propiedad
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------
// C. FEATURES
// ----------------------------------------------------
const Features = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#F9FAFB] flex flex-col items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="feature-card bg-white p-8 rounded-[1rem] shadow border border-primary/20 hover:-translate-y-2 hover:border-accent transition-all duration-500 flex flex-col justify-between h-[360px] group">
          <div>
            <div className="mb-6 text-primary group-hover:text-accent transition-colors">
              <Clock size={36} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading font-bold text-2xl text-primary mb-3">30+ Años de Legado</h3>
            <p className="font-heading text-dark/70 leading-relaxed">
              Solidez confirmada. Más de tres décadas construyendo confianza y hogares de calidad en el mercado inmobiliario.
            </p>
          </div>
          <div className="font-data text-dark/40 group-hover:text-accent transition-colors text-xs tracking-widest uppercase border-t border-primary/10 pt-4">
            // Base de Confianza
          </div>
        </div>

        {/* Card 2 */}
        <div className="feature-card bg-primary p-8 rounded-[1rem] shadow-xl border border-primary hover:-translate-y-2 hover:border-accent transition-all duration-500 flex flex-col justify-between h-[360px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-white/5 top-1/2 -translate-y-1/2 right-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
            <Compass size={160} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="mb-6 text-white group-hover:text-accent transition-colors">
              <MapPin size={36} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading font-bold text-2xl text-white mb-3">Experiencia Local</h3>
            <p className="font-heading text-white/70 leading-relaxed">
              Atención hiper-localizada con nuestras sucursales premium en Villa Ballester y San Martín.
            </p>
          </div>
          <div className="relative z-10 font-data text-white/40 group-hover:text-accent transition-colors text-xs tracking-widest uppercase flex items-center gap-2 border-t border-white/10 pt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            San Martín / Ballester
          </div>
        </div>

        {/* Card 3 */}
        <div className="feature-card bg-white p-8 rounded-[1rem] shadow border border-primary/20 hover:-translate-y-2 hover:border-accent transition-all duration-500 flex flex-col justify-between h-[360px] group">
          <div>
            <div className="mb-6 text-primary group-hover:text-accent transition-colors">
              <Building size={36} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading font-bold text-2xl text-primary mb-3">Soluciones de Vanguardia</h3>
            <p className="font-heading text-dark/70 leading-relaxed">
              Un equipo proactivo y herramientas tecnológicas totalmente integradas para acelerar tus proyectos.
            </p>
          </div>
          <div className="font-data text-dark/40 group-hover:text-accent transition-colors text-xs tracking-widest uppercase border-t border-primary/10 pt-4">
            // Impulsado por Tecnología
          </div>
        </div>

      </div>
    </section>
  );
};

// ----------------------------------------------------
// D. PHILOSOPHY
// ----------------------------------------------------
const Philosophy = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".phil-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      });
      
      gsap.to(".phil-line", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
        },
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-40 px-6 lg:px-12 bg-primary overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="/images/Size%20Optimized/_MG_2515.jpg"
          alt="Texture"
          className="w-full h-full object-cover mix-blend-overlay grayscale"
        />
      </div>
      <div className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center gap-8">
        <h2 className="phil-text font-heading text-2xl md:text-3xl text-background/60">
          La mayoría de las agencias se enfocan en <span className="text-white">vender metros cuadrados.</span>
        </h2>
        
        {/* Accent line effect */}
        <div className="phil-line w-24 h-px bg-accent scale-x-0 origin-center my-4"></div>

        <h2 className="phil-text font-drama font-bold text-5xl md:text-6xl lg:text-7xl text-background leading-tight">
          Nosotros nos enfocamos en <br/> <span className="text-white italic">construir hogares.</span>
        </h2>
      </div>
    </section>
  );
};

// ----------------------------------------------------
// E. PROTOCOL / CATEGORIES (Sticky Stack)
// ----------------------------------------------------
const Categories = () => {
  const containerRef = useRef(null);

  const categories = [
    {
      title: "Casas & Residencias",
      desc: "Espacios diseñados para habitar y disfrutar. Conectando familias con su lugar ideal en el mundo.",
      img: "/images/Size%20Optimized/_MG_1702.jpg",
      tags: ["+150 Disponibles", "A Estrenar", "Barrios Cerrados"]
    },
    {
      title: "Departamentos",
      desc: "Ubicaciones estratégicas, vistas panorámicas y la comodidad de vivir a un paso de todo.",
      img: "/images/Size%20Optimized/_MG_1211.jpg",
      tags: ["Oportunidad", "Monoambientes", "Penthouses"]
    },
    {
      title: "Emprendimientos",
      desc: "Invierta en el futuro. Proyectos desde el pozo y desarrollos de vanguardia con alta rentabilidad.",
      img: "/images/Size%20Optimized/_MG_4710.jpg",
      tags: ["Pozo", "Cuotas", "Zona Norte"]
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.category-card');
      
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          endTrigger: containerRef.current,
          end: "bottom bottom"
        });

        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.95,
            filter: "blur(5px)",
            opacity: 0.6,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-background pb-[100vh]">
      {categories.map((cat, i) => (
        <div key={i} className={`category-card h-[100vh] w-full flex items-center justify-center p-6 lg:p-12 z-[${i * 10}] sticky top-0`}>
          <div className="w-full max-w-7xl h-full max-h-[800px] rounded-[1rem] bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row group border border-primary/10">
            <div className="w-full md:w-1/2 p-10 lg:p-20 flex flex-col justify-center relative">
              
              <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-primary/20 group-hover:border-accent transition-colors"></div>
              
              <span className="font-data text-primary/40 font-bold tracking-widest text-xs mb-4">0{i + 1} // CATEGORÍA</span>
              <h2 className="font-drama font-bold text-4xl lg:text-6xl text-primary mb-6">{cat.title}</h2>
              <p className="font-heading text-lg text-dark/70 mb-12 max-w-md">
                {cat.desc}
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                {cat.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-primary/20 text-xs text-primary font-semibold hover:border-accent transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <button className="flex items-center gap-3 font-heading font-bold text-lg text-primary hover:text-accent group-hover:translate-x-2 transition-all">
                  Explorar
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full overflow-hidden relative border-l border-primary/10">
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-90" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

// ----------------------------------------------------
// F. TOKKO PROPERTIES / LATEST LISTINGS
// ----------------------------------------------------
const PropertiesFetch = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using environment variable to protect the API key
    fetch(`https://tokkobroker.com/api/v1/property/?key=${import.meta.env.VITE_TOKKO_API_KEY}&lang=es_ar&format=json&limit=6`)
      .then(res => res.json())
      .then(data => {
        if(data && data.objects) setProperties(data.objects);
      })
      .catch(err => console.error("Tokko API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-32 px-6 lg:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary/10 pb-8 relative group">
          <div className="absolute left-0 bottom-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-1000 ease-in-out"></div>
          <div>
            <span className="font-data text-primary/40 tracking-widest text-xs mb-4 block">// ÚLTIMOS INGRESOS</span>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-primary">Propiedades Destacadas</h2>
          </div>
          <button className="text-primary border-b border-primary hover:border-accent transition-colors font-heading font-bold pb-1">
            Ver todas las propiedades
          </button>
        </div>

        {/* Large Decorative Search Bar */}
        <div className="bg-background border border-primary/20 p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 max-w-4xl mx-auto w-full relative group hover:border-accent transition-colors">
          <div className="flex items-center gap-2 flex-1 px-2 md:px-0">
            <div className="p-3 md:p-4 text-primary group-hover:text-accent transition-colors shrink-0">
              <Search size={24} strokeWidth={1.5} />
            </div>
            <input type="text" placeholder="¿Qué estás buscando? Ej: Casa en Villa Ballester..." className="flex-1 bg-transparent border-none outline-none font-heading text-base md:text-lg text-primary placeholder:text-dark/30 min-w-0" />
          </div>
          <button className="bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-full font-heading font-bold shadow-sm hover:scale-[1.02] border border-primary hover:border-accent transition-all">
            Buscar Inmueble
          </button>
        </div>

        {/* Tokko Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(6).fill(0).map((_,i) => (
              <div key={i} className="animate-pulse bg-background p-4 rounded-[1rem] h-[400px] border border-primary/10">
                <div className="bg-dark/10 w-full h-[200px] rounded-lg"></div>
                <div className="mt-4 bg-dark/10 h-6 w-1/2 rounded"></div>
                <div className="mt-2 bg-dark/10 h-4 w-1/3 rounded"></div>
              </div>
            ))
          ) : (
            properties.length > 0 ? (
              properties.map(prop => (
                <div key={prop.id} className="bg-background rounded-[1rem] p-4 shadow-sm border border-primary/10 hover:-translate-y-2 hover:border-accent transition-all duration-300 group cursor-pointer relative">
                  <div className="absolute top-8 right-8 z-10 bg-white/90 backdrop-blur border border-primary/10 text-primary font-heading font-bold px-3 py-1 rounded-sm text-sm">
                    {prop.operations[0]?.prices[0]?.currency} {prop.operations[0]?.prices[0]?.price}
                  </div>
                  <div className="w-full h-[240px] rounded-lg overflow-hidden mb-6 relative">
                    <img src={prop.photos[0]?.image || '/images/Size%20Optimized/_MG_1166.jpg'} alt={prop.publication_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="px-2 pb-2">
                    <h3 className="font-heading font-bold text-xl text-primary mb-1 truncate">{prop.publication_title}</h3>
                    <p className="font-heading text-xs text-dark/50 mb-6 flex items-center gap-1"><MapPin size={14}/> {prop.location.short_location}</p>
                    <div className="flex items-center gap-4 text-dark/70 font-heading text-sm border-t border-primary/10 pt-4">
                      <span className="flex items-center gap-1"><Bed size={16} className="text-primary" /> {prop.room_amount || '-'} Amb</span>
                      <span className="flex items-center gap-1"><Bath size={16} className="text-primary" /> {prop.bathroom_amount || '-'} Baños</span>
                      <span className="flex items-center gap-1 ml-auto font-data">{prop.surface || '-'} m²</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-20 font-heading text-xl text-dark/50">
                No hay propiedades disponibles en este momento.
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------
// G. CONTACT
// ----------------------------------------------------
const Contact = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".contact-elem", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
      });
      gsap.from(".contact-img", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        scale: 1.05,
        opacity: 0,
        duration: 2,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-[100dvh] pt-40 pb-32 px-6 lg:px-12 bg-[#F9FAFB] text-primary overflow-hidden relative flex flex-col justify-center">
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10 items-center">
        
        {/* Left Col - Content & Form */}
        <div className="flex flex-col justify-center lg:py-10">
          <div className="mb-12">
            <span className="contact-elem font-data tracking-widest text-xs text-primary/40 mb-6 flex items-center gap-4">
              <div className="h-px w-8 bg-accent"></div>
              HABLEMOS
            </span>
            <h2 className="contact-elem font-drama text-5xl md:text-6xl mb-6 leading-tight text-primary">
               Estamos acá para <br/>
               <span className="font-heading font-medium italic text-primary tracking-tight">asesorarte.</span>
            </h2>
            <p className="contact-elem font-heading text-dark/70 max-w-md leading-relaxed">
              Ya sea para tasar, vender, alquilar o invertir. Dejanos tu mensaje y un asesor especializado se pondrá en contacto con vos a la brevedad.
            </p>
          </div>

          <form className="contact-elem bg-white p-8 md:p-10 rounded-[2rem] border border-primary/10 shadow-xl relative group w-full" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="relative">
                <input type="text" id="name" className="peer w-full bg-transparent border-b border-primary/20 text-primary py-2 outline-none font-heading text-lg focus:border-accent transition-colors placeholder-transparent" placeholder="Nombre completo" required />
                <label htmlFor="name" className="absolute left-0 -top-4 text-xs font-heading text-dark/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent cursor-text">Nombre completo</label>
              </div>
              <div className="relative">
                <input type="email" id="email" className="peer w-full bg-transparent border-b border-primary/20 text-primary py-2 outline-none font-heading text-lg focus:border-accent transition-colors placeholder-transparent" placeholder="Correo electrónico" required />
                <label htmlFor="email" className="absolute left-0 -top-4 text-xs font-heading text-dark/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent cursor-text">Correo electrónico</label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="relative">
                <input type="tel" id="phone" className="peer w-full bg-transparent border-b border-primary/20 text-primary py-2 outline-none font-heading text-lg focus:border-accent transition-colors placeholder-transparent" placeholder="Teléfono" />
                <label htmlFor="phone" className="absolute left-0 -top-4 text-xs font-heading text-dark/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent cursor-text">Teléfono</label>
              </div>
              <div className="relative">
                <select id="reason" className="w-full bg-transparent border-b border-primary/20 text-primary py-2 outline-none font-heading text-lg focus:border-accent transition-colors appearance-none cursor-pointer">
                  <option value="" className="text-dark/50">Motivo de consulta...</option>
                  <option value="tasacion" className="text-primary">Tasación</option>
                  <option value="compra" className="text-primary">Comprar propiedad</option>
                  <option value="alquiler" className="text-primary">Alquilar propiedad</option>
                  <option value="emprendimiento" className="text-primary">Desarrollos / Emprendimientos</option>
                  <option value="otro" className="text-primary">Otro</option>
                </select>
              </div>
            </div>

            <div className="relative mb-12">
              <textarea id="message" rows="2" className="peer w-full bg-transparent border-b border-primary/20 text-primary py-2 outline-none font-heading text-lg focus:border-accent transition-colors placeholder-transparent resize-none" placeholder="Mensaje" required></textarea>
              <label htmlFor="message" className="absolute left-0 -top-4 text-xs font-heading text-dark/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent cursor-text">Tu mensaje</label>
            </div>

            <button type="submit" className="w-full bg-primary border-2 border-transparent hover:border-accent text-white font-heading font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 transition-colors duration-300 transform hover:scale-[1.02]">
              Enviar mensaje
              <ArrowRight size={20} />
            </button>
          </form>
          
          <div className="contact-elem grid grid-cols-2 gap-8 mt-12 w-full max-w-xl border-t border-primary/10 pt-8">
            <div>
              <h4 className="font-heading font-bold text-primary mb-1 uppercase text-sm tracking-wider">Villa Ballester</h4>
              <p className="font-heading text-dark/60 text-sm flex flex-col gap-1">
                Almirante Brown 3295 <br/>
                <a href="tel:+5491177170405" className="hover:text-accent font-medium transition-colors">+54 9 11 7717-0405</a>
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-primary mb-1 uppercase text-sm tracking-wider">San Martín</h4>
              <p className="font-heading text-dark/60 text-sm flex flex-col gap-1">
                Mitre 3404 <br/>
                <a href="tel:+5491177176007" className="hover:text-accent font-medium transition-colors">+54 9 11 7717-6007</a>
              </p>
            </div>
          </div>
          
          <div className="contact-elem mt-6">
            <a href="mailto:info@dinalpropiedades.com" className="font-heading font-medium text-primary hover:text-accent transition-colors flex items-center gap-2 text-sm">
              <Mail size={16}/> info@dinalpropiedades.com
            </a>
          </div>
        </div>

        {/* Right Col - Image */}
        <div className="h-full min-h-[500px] w-full relative contact-img lg:pl-10 hidden md:block">
           <div className="absolute top-10 right-10 bottom-10 left-0 bg-primary/5 rounded-[2rem] -z-10 transform translate-x-4 translate-y-4"></div>
           <img 
               src="/images/Size%20Optimized/_MG_1702.jpg"
               alt="Edificio Moderno"
               className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
           />
           {/* Floating Info Tag */}
           <div className="absolute -left-6 bottom-16 bg-white p-6 rounded-2xl shadow-xl border border-primary/5 hidden lg:block animate-bounce" style={{animationDuration: '3s'}}>
              <div className="flex items-center gap-4">
                  <div className="bg-primary/5 p-3 rounded-full text-[#25D366]">
                    <svg viewBox="0 0 24 24" width={32} height={32} fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                      <p className="font-data text-[10px] text-dark/40 tracking-widest uppercase mb-1">Respuesta Inmediata</p>
                      <p className="font-heading font-bold text-primary">Chat en línea</p>
                  </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

// ----------------------------------------------------
// H. FOOTER
// ----------------------------------------------------
const Footer = () => {
  return (
    <footer className="bg-primary text-background px-6 lg:px-12 pt-24 pb-8 border-t-[8px] border-accent relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="md:col-span-2">
            <img src="/logo.svg" alt="Dinal Propiedades" className="h-10 mb-8" />
            <p className="font-heading text-background/60 max-w-sm mb-8">
              Impulsamos tus proyectos con la energía de un equipo joven y la solidez de más de 30 años construyendo hogares de calidad.
            </p>
            <div className="flex items-center gap-3 border border-white/20 px-4 py-2 rounded-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              <span className="font-data text-xs text-background/80 uppercase">Atención activa de 10 a 18:30 hs</span>
            </div>
          </div>

          <div>
            <h4 className="font-data border-l-2 border-accent pl-3 text-white text-xs tracking-widest mb-6">SUCURSALES</h4>
            <ul className="flex flex-col gap-6 font-heading text-background/60">
              <li>
                <strong className="text-white block font-medium mb-1">Villa Ballester</strong>
                Almirante Brown 3295
              </li>
              <li>
                <strong className="text-white block font-medium mb-1">San Martín</strong>
                Mitre 3404
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-data border-l-2 border-accent pl-3 text-white text-xs tracking-widest mb-6">CONTACTO</h4>
            <ul className="flex flex-col gap-4 font-heading text-background/60">
              <li className="flex items-center gap-3 hover:text-accent transition-colors cursor-pointer"><Phone size={16}/> +54 9 11 7717-0405</li>
              <li className="flex items-center gap-3 hover:text-accent transition-colors cursor-pointer"><Phone size={16}/> +54 9 11 7717-6007</li>
              <li className="flex items-center gap-3 hover:text-accent transition-colors cursor-pointer mt-2"><Mail size={16}/> info@dinalpropiedades.com</li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-background/40 font-heading text-sm">
          <p>© {new Date().getFullYear()} Dinal Propiedades. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-data text-xs tracking-widest uppercase">
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent transition-colors">Facebook</a>
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ----------------------------------------------------
// I. EMPRENDIMIENTOS PAGE
// ----------------------------------------------------
const Emprendimientos = () => {
  const containerRef = useRef(null);
  const [devs, setDevs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero elements animate instantly
      gsap.from(".emp-hero", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Other elements animate on scroll
      gsap.utils.toArray(".emp-scroll").forEach(el => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    fetch(`https://tokkobroker.com/api/v1/development/?key=${import.meta.env.VITE_TOKKO_API_KEY}&lang=es_ar&format=json&limit=9`)
      .then(res => res.json())
      .then(data => {
        if(data && data.objects) setDevs(data.objects);
      })
      .catch(err => console.error("Tokko API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F9FAFB] pt-32 pb-24 min-h-screen">
      
      {/* 1. Hero */}
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden relative h-[60vh] flex items-center justify-center shadow-2xl">
           <img src={devs.length > 0 && devs[0]?.photos?.length > 0 ? devs[0].photos[0].image : "/images/Size%20Optimized/_MG_4682.jpg"} alt="Emprendimientos" className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-1000" />
           <div className="absolute inset-0 bg-primary/70"></div>
           <div className="relative z-10 text-center px-4">
              <span className="emp-hero font-data tracking-widest text-xs text-white/70 mb-4 block">// DESARROLLOS E INVERSIONES</span>
              <h1 className="emp-hero font-drama font-black text-6xl md:text-8xl text-white leading-none mb-4">Desarrollando</h1>
              <p className="emp-hero font-heading font-normal italic text-2xl md:text-3xl text-white/80">Lo Nuevo de San Martín</p>
           </div>
        </div>
      </section>

      {/* 2. Categories */}
      <section className="px-6 lg:px-12 mb-32 max-w-7xl mx-auto">
        <h2 className="emp-scroll font-heading font-bold text-3xl text-primary mb-12 text-center">Modalidades de Inversión</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[ 
             { title: "En Pozo", desc: "Máxima rentabilidad al entrar en la etapa inicial del proyecto.", badge: "Mayor ROI" },
             { title: "En Construcción", desc: "Avance comprobable con planes de financiación flexibles y en cuotas.", badge: "Financiado" },
             { title: "A Estrenar", desc: "Unidades terminadas con posesión inmediata, listas para habitar o alquilar.", badge: "Inmediato" },
             { title: "Loteos", desc: "Terrenos en barrios cerrados para que proyectes tu hogar desde cero.", badge: "Estilo de Vida" }
           ].map((cat, i) => (
             <div key={i} className="emp-scroll bg-white p-6 rounded-2xl border border-primary/10 hover:border-accent hover:-translate-y-1 transition-all shadow-sm">
                <span className="bg-primary/5 text-primary text-xs font-bold px-3 py-1 rounded-full font-heading mb-4 inline-block">{cat.badge}</span>
                <h3 className="font-heading font-bold text-xl text-primary mb-3">{cat.title}</h3>
                <p className="font-heading text-dark/70 text-sm leading-relaxed">{cat.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 3. Tokko Grid */}
      <section className="px-6 lg:px-12 mb-32 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-primary/10 pb-6">
           <h2 className="emp-scroll font-drama text-4xl text-primary">Catálogo de Proyectos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             Array(3).fill(0).map((_,i) => (
               <div key={i} className="animate-pulse bg-white p-4 rounded-[1rem] h-[450px] border border-primary/10">
                 <div className="bg-dark/10 w-full h-[250px] rounded-lg"></div>
                 <div className="mt-4 bg-dark/10 h-6 w-3/4 rounded"></div>
                 <div className="mt-2 bg-dark/10 h-4 w-1/2 rounded"></div>
               </div>
             ))
          ) : devs.length > 0 ? (
             devs.map(dev => (
                 <div key={dev.id} className="emp-scroll bg-white rounded-[1rem] p-4 shadow-sm border border-primary/10 hover:shadow-xl hover:-translate-y-2 hover:border-accent transition-all duration-300 group cursor-pointer relative flex flex-col h-full">
                   <div className="absolute top-8 left-8 z-10 bg-primary text-white font-heading font-bold px-3 py-1 rounded-sm text-xs uppercase tracking-wider">
                     {dev.construction_status || 'Emprendimiento'}
                   </div>
                   <div className="w-full h-[250px] rounded-lg overflow-hidden mb-6 relative">
                     <img src={dev.photos[0]?.image || '/images/Size%20Optimized/_MG_2516.jpg'} alt={dev.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   </div>
                   <div className="px-2 flex-grow flex flex-col">
                     <h3 className="font-heading font-bold text-xl text-primary mb-2 line-clamp-2">{dev.name}</h3>
                     <p className="font-heading text-sm text-dark/60 mb-6 flex items-center gap-2"><MapPin size={16}/> {dev.location?.name}</p>
                     
                     <div className="mt-auto pt-4 border-t border-primary/10 flex items-center justify-between">
                        <span className="font-heading font-bold text-primary">Ver Proyecto</span>
                        <ArrowRight size={18} className="text-accent group-hover:translate-x-1 transition-transform" />
                     </div>
                   </div>
                 </div>
             ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
               <Building size={48} className="text-primary/20 mb-4" />
               <p className="font-heading text-xl text-dark/50">Actualmente no hay emprendimientos disponibles.</p>
               <p className="font-heading text-accent mt-2">Consultá con nuestros asesores.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Trust Block & CTA */}
      <section className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto bg-primary rounded-[2rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="emp-scroll font-drama text-4xl md:text-5xl text-white mb-6">Respaldamos tu inversión.</h2>
             <p className="emp-scroll font-heading text-white/70 max-w-2xl mx-auto mb-10 text-lg">
               Conocé el mercado en detalle, analizá planos y estructurá pagos junto a un equipo con experiencia real en desarrollo inmobiliario.
             </p>
             <Link to="/contacto" className="emp-scroll inline-block bg-transparent border-2 border-accent text-accent font-heading font-bold px-8 py-4 rounded-xl hover:bg-accent hover:text-primary transition-colors transform hover:scale-105 duration-300 shadow-xl">
               Agendar Asesoramiento
             </Link>
           </div>
        </div>
      </section>

    </div>
  );
};

// ----------------------------------------------------
// J. ALQUILER PAGE
// ----------------------------------------------------
const Alquiler = () => {
  const containerRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".alq-hero", { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
      gsap.utils.toArray(".alq-scroll").forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 85%" }, y: 40, opacity: 0, duration: 0.8, ease: "power3.out" });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    fetch(`https://tokkobroker.com/api/v1/property/?key=${import.meta.env.VITE_TOKKO_API_KEY}&lang=es_ar&format=json&limit=40`)
      .then(res => res.json())
      .then(data => {
        if(data && data.objects) {
           const rentals = data.objects.filter(p => p.operations.some(op => op.operation_type === "Alquiler"));
           setProperties(rentals.slice(0, 9));
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F9FAFB] pt-32 pb-24 min-h-screen">
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden relative h-[60vh] flex items-center justify-center shadow-2xl">
           <img src={properties.length > 0 && properties[0]?.photos?.length > 0 ? properties[0].photos[0].image : "/images/Size%20Optimized/_MG_1108.jpg"} alt="Alquileres" className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-1000" />
           <div className="absolute inset-0 bg-primary/70"></div>
           <div className="relative z-10 text-center px-4">
              <span className="alq-hero font-data tracking-widest text-xs text-white/70 mb-4 block">// ALQUILERES</span>
              <h1 className="alq-hero font-drama font-black text-5xl md:text-7xl text-white mb-6">Tu próximo lugar, <br/><span className="font-heading font-black italic text-white tracking-tight">sin complicaciones.</span></h1>
              <p className="alq-hero font-heading text-lg text-white/80 max-w-xl mx-auto">Ofrecemos un catálogo selecto de alquileres residenciales y comerciales en la zona, garantizando un trato transparente.</p>
           </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 mb-32 max-w-7xl mx-auto">
        <h2 className="alq-scroll font-heading font-bold text-3xl text-primary mb-12 text-center">Nuestras Opciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[ 
             { title: "Residencial", desc: "Casas y departamentos en excelentes condiciones para vos y tu familia.", badge: "Vivienda" },
             { title: "Comercial", desc: "Locales y oficinas estratégicamente ubicados para potenciar tu negocio.", badge: "Negocios" },
             { title: "Temporario", desc: "Unidades amobladas y equipadas para estadías cortas o relocalizaciones.", badge: "Flexibilidad" },
             { title: "Garantías", desc: "Te brindamos asesoramiento permanente para que el proceso sea 100% seguro.", badge: "Legal" }
           ].map((cat, i) => (
             <div key={i} className="alq-scroll bg-white p-6 rounded-2xl border border-primary/10 hover:border-accent hover:-translate-y-1 transition-all shadow-sm">
                <span className="bg-primary/5 text-primary text-xs font-bold px-3 py-1 rounded-full font-heading mb-4 inline-block">{cat.badge}</span>
                <h3 className="font-heading font-bold text-xl text-primary mb-3">{cat.title}</h3>
                <p className="font-heading text-dark/70 text-sm leading-relaxed">{cat.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 mb-32 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-primary/10 pb-6">
           <h2 className="alq-scroll font-drama text-4xl text-primary">Propiedades en Alquiler</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             Array(3).fill(0).map((_,i) => (
               <div key={i} className="animate-pulse bg-white p-4 rounded-[1rem] h-[450px] border border-primary/10">
                 <div className="bg-dark/10 w-full h-[250px] rounded-lg"></div>
                 <div className="mt-4 bg-dark/10 h-6 w-3/4 rounded"></div>
               </div>
             ))
          ) : properties.length > 0 ? (
             properties.map(prop => {
                 const op = prop.operations.find(o => o.operation_type === "Alquiler");
                 const price = op && op.prices.length > 0 ? `${op.prices[0].currency} ${op.prices[0].price}` : 'Consultar';
                 return (
                 <div key={prop.id} className="alq-scroll bg-white rounded-[1rem] p-4 shadow-sm border border-primary/10 hover:shadow-xl hover:-translate-y-2 hover:border-accent transition-all duration-300 group cursor-pointer relative flex flex-col h-full">
                   <div className="absolute top-8 left-8 z-10 bg-primary text-white font-heading font-bold px-3 py-1 rounded-sm text-xs uppercase tracking-wider">{price}</div>
                   <div className="w-full h-[250px] rounded-lg overflow-hidden mb-6 relative">
                     <img src={prop.photos[0]?.image || '/images/Size%20Optimized/_MG_4841.jpg'} alt={prop.publication_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   </div>
                   <div className="px-2 flex-grow flex flex-col">
                     <h3 className="font-heading font-bold text-xl text-primary mb-2 line-clamp-2">{prop.publication_title}</h3>
                     <p className="font-heading text-sm text-dark/60 mb-6 flex items-center gap-2"><MapPin size={16}/> {prop.location?.name}</p>
                     <div className="mt-auto pt-4 border-t border-primary/10 flex items-center justify-between text-sm font-heading">
                        <span className="flex items-center gap-1"><Bed size={16}/> {prop.roofed_surface}m²</span>
                        <span className="flex items-center gap-1"><Bath size={16}/> {prop.bathroom_amount} Baños</span>
                        <span className="font-bold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Ver <ArrowRight size={14} /></span>
                     </div>
                   </div>
                 </div>
                 );
             })
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
               <Building size={48} className="text-primary/20 mb-4" />
               <p className="font-heading text-xl text-dark/50">Actualmente no hay alquileres disponibles en el catálogo.</p>
               <p className="font-heading text-accent mt-2">Contactate para propiedades off-market.</p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto bg-primary rounded-[2rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="alq-scroll font-drama text-4xl md:text-5xl text-white mb-6">Tu próximo hogar te espera.</h2>
             <Link to="/contacto" className="alq-scroll inline-block bg-transparent border-2 border-accent text-accent font-heading font-bold px-8 py-4 rounded-xl hover:bg-accent hover:text-primary transition-colors transform hover:scale-105 duration-300 shadow-xl">
               Contactar Asesor
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

// ----------------------------------------------------
// K. VENTA PAGE
// ----------------------------------------------------
const Ventas = () => {
  const containerRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".vnt-hero", { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
      gsap.utils.toArray(".vnt-scroll").forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 85%" }, y: 40, opacity: 0, duration: 0.8, ease: "power3.out" });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    fetch(`https://tokkobroker.com/api/v1/property/?key=${import.meta.env.VITE_TOKKO_API_KEY}&lang=es_ar&format=json&limit=40`)
      .then(res => res.json())
      .then(data => {
        if(data && data.objects) {
           const sales = data.objects.filter(p => p.operations.some(op => op.operation_type === "Venta"));
           setProperties(sales.slice(0, 9));
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F9FAFB] pt-32 pb-24 min-h-screen">
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden relative h-[60vh] flex items-center justify-center shadow-2xl">
           <img src={properties.length > 0 && properties[0]?.photos?.length > 0 ? properties[0].photos[0].image : "/images/Size%20Optimized/_MG_2515.jpg"} alt="Ventas" className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-1000" />
           <div className="absolute inset-0 bg-primary/70"></div>
           <div className="relative z-10 text-center px-4">
              <span className="vnt-hero font-data tracking-widest text-xs text-white/70 mb-4 block">// COMPRA Y VENTA</span>
              <h1 className="vnt-hero font-drama font-black text-5xl md:text-7xl text-white mb-6">El hogar ideal <br/><span className="font-heading font-black italic text-white tracking-tight">es posible.</span></h1>
              <p className="vnt-hero font-heading text-lg text-white/80 max-w-xl mx-auto">Te ayudamos a encontrar, negociar y adquirir la propiedad de tus sueños con total transparencia y seguridad.</p>
           </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 mb-32 max-w-7xl mx-auto">
        <h2 className="vnt-scroll font-heading font-bold text-3xl text-primary mb-12 text-center">Nuestras Soluciones de Venta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[ 
             { title: "Casas", desc: "Espacios amplios y jardines pensados para tu familia.", badge: "Familia" },
             { title: "Departamentos", desc: "Ubicaciones céntricas con todas las comodidades y seguridad.", badge: "Urbano" },
             { title: "Terrenos", desc: "El lugar perfecto para proyectar y construir desde cero.", badge: "Proyectos" },
             { title: "Comercial", desc: "Oportunidades únicas de inversión para locales y empresas.", badge: "Inversión" }
           ].map((cat, i) => (
             <div key={i} className="vnt-scroll bg-white p-6 rounded-2xl border border-primary/10 hover:border-accent hover:-translate-y-1 transition-all shadow-sm">
                <span className="bg-primary/5 text-primary text-xs font-bold px-3 py-1 rounded-full font-heading mb-4 inline-block">{cat.badge}</span>
                <h3 className="font-heading font-bold text-xl text-primary mb-3">{cat.title}</h3>
                <p className="font-heading text-dark/70 text-sm leading-relaxed">{cat.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 mb-32 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-primary/10 pb-6">
           <h2 className="vnt-scroll font-drama text-4xl text-primary">Propiedades en Venta</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             Array(3).fill(0).map((_,i) => (
               <div key={i} className="animate-pulse bg-white p-4 rounded-[1rem] h-[450px] border border-primary/10">
                 <div className="bg-dark/10 w-full h-[250px] rounded-lg"></div>
                 <div className="mt-4 bg-dark/10 h-6 w-3/4 rounded"></div>
               </div>
             ))
          ) : properties.length > 0 ? (
             properties.map(prop => {
                 const op = prop.operations.find(o => o.operation_type === "Venta");
                 const price = op && op.prices.length > 0 ? `${op.prices[0].currency} ${op.prices[0].price}` : 'Consultar';
                 return (
                 <div key={prop.id} className="vnt-scroll bg-white rounded-[1rem] p-4 shadow-sm border border-primary/10 hover:shadow-xl hover:-translate-y-2 hover:border-accent transition-all duration-300 group cursor-pointer relative flex flex-col h-full">
                   <div className="absolute top-8 left-8 z-10 bg-primary text-white font-heading font-bold px-3 py-1 rounded-sm text-xs uppercase tracking-wider">{price}</div>
                   <div className="w-full h-[250px] rounded-lg overflow-hidden mb-6 relative">
                     <img src={prop.photos[0]?.image || '/images/Size%20Optimized/_MG_1122.jpg'} alt={prop.publication_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   </div>
                   <div className="px-2 flex-grow flex flex-col">
                     <h3 className="font-heading font-bold text-xl text-primary mb-2 line-clamp-2">{prop.publication_title}</h3>
                     <p className="font-heading text-sm text-dark/60 mb-6 flex items-center gap-2"><MapPin size={16}/> {prop.location?.name}</p>
                     <div className="mt-auto pt-4 border-t border-primary/10 flex items-center justify-between text-sm font-heading">
                        <span className="flex items-center gap-1"><Bed size={16}/> {prop.roofed_surface}m²</span>
                        <span className="flex items-center gap-1"><Bath size={16}/> {prop.bathroom_amount} Baños</span>
                        <span className="font-bold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Ver <ArrowRight size={14} /></span>
                     </div>
                   </div>
                 </div>
                 );
             })
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
               <Building size={48} className="text-primary/20 mb-4" />
               <p className="font-heading text-xl text-dark/50">Actualmente no hay propiedades en venta publicadas.</p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto bg-primary rounded-[2rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="vnt-scroll font-drama text-4xl md:text-5xl text-white mb-6">Empezá tu nueva etapa.</h2>
             <Link to="/contacto" className="vnt-scroll inline-block bg-transparent border-2 border-accent text-accent font-heading font-bold px-8 py-4 rounded-xl hover:bg-accent hover:text-primary transition-colors transform hover:scale-105 duration-300 shadow-xl">
               Contactar Asesor
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

// ----------------------------------------------------
// L. SUCURSALES PAGE
// ----------------------------------------------------
const Sucursales = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".suc-hero", { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
      gsap.utils.toArray(".suc-scroll").forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 85%" }, y: 40, opacity: 0, duration: 0.8, ease: "power3.out" });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const branches = [
    {
      id: "ballester",
      name: "Villa Ballester",
      address: "Almirante Brown 3295",
      phone: "+54 9 11 7717-0405",
      whatsapp: "5491177170405",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Almirante+Brown+3295,+Villa+Ballester",
      hours: "Lunes a Viernes: 9:30 a 18:30hs. Sábados: 10 a 13hs.",
      img: "/images/Size%20Optimized/_MG_1718.jpg"
    },
    {
      id: "sanmartin",
      name: "San Martín",
      address: "Mitre 3404",
      phone: "+54 9 11 7717-6007",
      whatsapp: "5491177176007",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Mitre+3404,+San+Martin",
      hours: "Lunes a Viernes: 9:30 a 18:30hs. Sábados: 10 a 13hs.",
      img: "/images/Size%20Optimized/_MG_2462.jpg"
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#F9FAFB] pt-32 pb-24 min-h-screen">
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden relative h-[60vh] flex items-center justify-center shadow-2xl">
           <img src="/images/Size%20Optimized/_MG_2463.jpg" alt="Nuestras Sucursales" className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-1000" />
           <div className="absolute inset-0 bg-primary/70"></div>
           <div className="relative z-10 text-center px-4">
              <span className="suc-hero font-data tracking-widest text-xs text-white/70 mb-4 block">// NUESTRAS OFICINAS</span>
              <h1 className="suc-hero font-drama font-black text-5xl md:text-7xl text-white mb-6">Siempre cerca <br/><span className="font-heading font-black text-white tracking-tight">tuyo.</span></h1>
              <p className="suc-hero font-heading text-lg text-white/80 max-w-xl mx-auto">Te esperamos en nuestras sucursales para brindarte asesoramiento personalizado, tomar un café y proyectar tu próxima inversión.</p>
           </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 mb-32 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {branches.map(branch => (
               <div key={branch.id} className="suc-scroll bg-white rounded-[2rem] shadow-xl border border-primary/5 overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-500 group">
                  <div className="h-[300px] w-full relative overflow-hidden">
                     <img src={branch.img} alt={`Sucursal ${branch.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full shadow-md">
                        <span className="font-heading font-bold text-primary uppercase tracking-wider text-sm">{branch.name}</span>
                     </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                     <div className="mb-8">
                        <div className="flex items-start gap-4 mb-4">
                           <div className="bg-primary/5 p-3 rounded-full text-accent mt-1"><MapPin size={24} /></div>
                           <div>
                              <p className="font-data text-xs text-dark/40 tracking-widest uppercase mb-1">Dirección</p>
                              <p className="font-heading font-medium text-primary text-lg">{branch.address}</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                           <div className="bg-primary/5 p-3 rounded-full text-accent mt-1"><Clock size={24} /></div>
                           <div>
                              <p className="font-data text-xs text-dark/40 tracking-widest uppercase mb-1">Horarios</p>
                              <p className="font-heading font-medium text-dark/70">{branch.hours}</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <div className="bg-primary/5 p-3 rounded-full text-accent mt-1"><Phone size={24} /></div>
                           <div>
                              <p className="font-data text-xs text-dark/40 tracking-widest uppercase mb-1">Atención Telefónica</p>
                              <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="font-heading font-medium text-primary text-lg hover:text-accent transition-colors block">{branch.phone}</a>
                           </div>
                        </div>
                     </div>
                     <div className="mt-auto grid grid-cols-2 gap-4">
                         <a href={branch.mapUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg">
                            Ver Mapa <Compass size={18} />
                         </a>
                         <a href={`https://wa.me/${branch.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#25D366] text-[#25D366] font-heading font-bold py-3 rounded-xl hover:bg-[#25D366] hover:text-white transition-all shadow-lg">
                            WhatsApp
                         </a>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      <section className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto bg-primary rounded-[2rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="suc-scroll font-drama text-4xl md:text-5xl text-white mb-6">¿Buscás tasar tu propiedad?</h2>
             <p className="suc-scroll font-heading text-white/70 max-w-2xl mx-auto mb-10 text-lg">Acercate a la sucursal más cercana o contactanos online para coordinar una visita con nuestros tasadores profesionales.</p>
             <Link to="/contacto" className="suc-scroll inline-block bg-transparent border-2 border-accent text-accent font-heading font-bold px-8 py-4 rounded-xl hover:bg-accent hover:text-primary transition-colors transform hover:scale-105 duration-300 shadow-xl">
               Solicitar Tasación
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

const Home = () => (
  <>
    <Hero />
    <Features />
    <Philosophy />
    <Categories />
    <PropertiesFetch />
  </>
);

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <div className={`flex flex-col gap-2 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <a
          href="https://wa.me/5491177170405"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white text-primary font-heading font-semibold text-sm px-4 py-3 rounded-2xl shadow-xl border border-primary/10 hover:border-[#25D366] hover:text-[#25D366] transition-all duration-200 whitespace-nowrap"
        >
          <svg viewBox="0 0 24 24" width={18} height={18} fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Villa Ballester
        </a>
        <a
          href="https://wa.me/5491177176007"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white text-primary font-heading font-semibold text-sm px-4 py-3 rounded-2xl shadow-xl border border-primary/10 hover:border-[#25D366] hover:text-[#25D366] transition-all duration-200 whitespace-nowrap"
        >
          <svg viewBox="0 0 24 24" width={18} height={18} fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          San Martín
        </a>
      </div>

      {/* Main button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 focus:outline-none"
        aria-label="Contactar por WhatsApp"
      >
        {open ? (
          <X size={24} />
        ) : (
          <svg viewBox="0 0 24 24" width={28} height={28} fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        )}
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="bg-background min-h-screen relative selection:bg-accent selection:text-primary">
        <Navbar />
        <WhatsAppButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/emprendimientos" element={<Emprendimientos />} />
          <Route path="/alquiler" element={<Alquiler />} />
          <Route path="/venta" element={<Ventas />} />
          <Route path="/sucursales" element={<Sucursales />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
