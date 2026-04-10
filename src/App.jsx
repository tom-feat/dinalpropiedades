import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out w-[95%] max-w-7xl rounded-full px-6 py-4 flex items-center justify-between
      ${scrolled ? 'bg-background/90 backdrop-blur-xl border border-primary/10 shadow-lg' : 'bg-transparent text-background'}
    `}>
      <div className="flex items-center">
        {/* We use CSS invert to turn the white logo black when the navbar background turns white */}
        <img 
          src="/logo.svg" 
          alt="Dinal Propiedades" 
          className={`h-8 transition-all duration-500 ${scrolled ? 'invert' : ''}`} 
        />
      </div>
      
      <div className={`hidden md:flex items-center gap-8 font-heading font-medium text-sm tracking-wide ${scrolled ? 'text-primary' : 'text-background/90'}`}>
        <a href="#venta" className="hover:-translate-y-[1px] hover:text-accent transition-all duration-300">Venta</a>
        <a href="#alquiler" className="hover:-translate-y-[1px] hover:text-accent transition-all duration-300">Alquiler</a>
        <a href="#emprendimientos" className="hover:-translate-y-[1px] hover:text-accent transition-all duration-300">Emprendimientos</a>
        <a href="#sucursales" className="hover:-translate-y-[1px] hover:text-accent transition-all duration-300">Sucursales</a>
      </div>

      <div className="hidden md:block">
        <button className={`relative overflow-hidden group px-6 py-2.5 rounded-full font-heading font-semibold text-sm transition-colors duration-300
          ${scrolled ? 'border border-primary text-primary hover:border-accent hover:text-accent' : 'border border-white text-white hover:border-accent hover:text-accent'}
        `}>
          <span className="relative z-10">Contacto</span>
        </button>
      </div>

      <button className="md:hidden z-50 relative" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className={scrolled ? "text-primary" : "text-background"} />}
      </button>

      {/* Mobile nav */}
      <div className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-8 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
           <img src="/logo.svg" alt="Dinal Propiedades" className="h-10 invert mb-8" />
           <a href="#venta" className="font-heading text-4xl text-primary hover:text-accent transition-colors" onClick={()=>setMobileOpen(false)}>Venta</a>
           <a href="#alquiler" className="font-heading text-4xl text-primary hover:text-accent transition-colors" onClick={()=>setMobileOpen(false)}>Alquiler</a>
           <a href="#emprendimientos" className="font-heading text-4xl text-primary hover:text-accent transition-colors" onClick={()=>setMobileOpen(false)}>Emprendimientos</a>
           <a href="#sucursales" className="font-heading text-4xl text-primary hover:text-accent transition-colors" onClick={()=>setMobileOpen(false)}>Sucursales</a>
      </div>
    </nav>
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
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
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
          src="https://images.unsplash.com/photo-1541888087588-9bbdc25ee22b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
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
          Nosotros nos enfocamos en <br/> <span className="text-white italic">construir historias.</span>
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
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      tags: ["+150 Disponibles", "A Estrenar", "Barrios Cerrados"]
    },
    {
      title: "Departamentos",
      desc: "Ubicaciones estratégicas, vistas panorámicas y la comodidad de vivir a un paso de todo.",
      img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      tags: ["Oportunidad", "Monoambientes", "Penthouses"]
    },
    {
      title: "Emprendimientos",
      desc: "Invierta en el futuro. Proyectos desde el pozo y desarrollos de vanguardia con alta rentabilidad.",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
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
        <div className="bg-background border border-primary/20 p-2 rounded-full flex items-center gap-4 max-w-4xl mx-auto w-full relative group hover:border-accent transition-colors">
          <div className="p-4 text-primary group-hover:text-accent transition-colors">
            <Search size={24} strokeWidth={1.5} />
          </div>
          <input type="text" placeholder="¿Qué estás buscando? Ej: Casa en Villa Ballester..." className="flex-1 bg-transparent border-none outline-none font-heading text-lg text-primary placeholder:text-dark/30" />
          <button className="bg-primary text-white px-8 py-4 rounded-full font-heading font-bold shadow-sm hover:scale-[1.02] border border-primary hover:border-accent transition-all">
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
                    <img src={prop.photos[0]?.image || 'https://via.placeholder.com/400'} alt={prop.publication_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
// G. FOOTER
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
              <li className="flex items-center gap-3 hover:text-accent transition-colors cursor-pointer mt-2"><Mail size={16}/> info@dinal.com</li>
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

export default function App() {
  return (
    <div className="bg-background min-h-screen relative selection:bg-accent selection:text-primary">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Categories />
      <PropertiesFetch />
      <Footer />
    </div>
  );
}
