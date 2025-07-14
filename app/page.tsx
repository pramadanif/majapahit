"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: 'ride' | 'event' | 'member' | 'anniversary';
}

const Instagram = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'ride' | 'event' | 'member'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
        setIsMounted(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Sample gallery data
  const galleryImages: GalleryImage[] = [
    { id: 1, src: '/IMG_3896.jpg', alt: 'Riding through nature', category: 'ride' },
    { id: 2, src: '/IMG_3897.jpg', alt: 'Club Photo', category: 'member' },
    { id: 3, src: '/IMG_3898.jpg', alt: 'Member gathering', category: 'member' },
    { id: 4, src: '/IMG_3899.jpg', alt: 'Scenic route', category: 'ride' },
    { id: 5, src: '/IMG_3900.jpg', alt: 'Community event', category: 'event' },
    { id: 6, src: '/IMG_3901.jpg', alt: 'New member initiation', category: 'member' },
  ];

  const anniversaryImages = [
    { id: 7, src: '/anniv1.jpg', alt: '1st Anniversary Celebration', category: 'anniversary' },
    { id: 8, src: '/anniv2.jpg', alt: 'Brotherhood Unity', category: 'anniversary' },
    { id: 9, src: '/anniv3.jpg', alt: 'Anniversary Group Photo', category: 'anniversary' },
    { id: 10, src: '/anniv4.jpg', alt: 'Anniversary Cake Cutting', category: 'anniversary' },
  ];

  const heroSlides = [
    { 
      title: 'MAJAPAHIT', 
      subtitle: 'Motor Club', 
      description: 'A community of passionate riders from Surabaya, united by the love for two wheels and the open road.' 
    },
    {
      title: "BROTHERHOOD",
      subtitle: "Persaudaraan Tanpa Batas",
      description: "Saling membantu dalam keadaan apapun, seperti gajah dalam kelompok"
    },
    {
      title: "EAST JAVA PRIDE",
      subtitle: "Kebanggaan Jawa Timur",
      description: "Melestarikan budaya dan membangun citra positif komunitas motor"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredImages = galleryFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === galleryFilter);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background: #000;
          color: #fff;
          margin: 0;
          padding: 0;
        }

        .chrome-gradient {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #404040 50%, #2d2d2d 75%, #1a1a1a 100%);
        }

        .chrome-shine {
          position: relative;
          overflow: hidden;
        }

        .chrome-shine::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
          transform: rotate(45deg);
          animation: shine 3s ease-in-out infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
          100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .chrome-button {
          background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
          border: 1px solid #404040;
          box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .chrome-button:hover {
          background: linear-gradient(145deg, #3a3a3a, #2a2a2a);
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .text-chrome {
          background: linear-gradient(145deg, #f0f0f0, #999);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .animated-gradient {
          background: linear-gradient(-45deg, #1a1a1a, #2d2d2d, #404040, #2d2d2d);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .retro-border {
          border: 2px solid;
          border-image: linear-gradient(45deg, #666, #ccc, #666) 1;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(145deg, #404040, #2d2d2d);
          border-radius: 4px;
          border: 1px solid #555;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(145deg, #555, #404040);
        }

        .mouse-trail {
          position: fixed;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, rgba(255,255,255,0.5), transparent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          animation: trailFade 1s ease-out forwards;
        }

        @keyframes trailFade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0); }
        }

        .loading-shimmer {
          background: linear-gradient(90deg, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%);
          background-size: 200% 100%;
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .typewriter {
          overflow: hidden;
          border-right: 2px solid #fff;
          white-space: nowrap;
          animation: typing 3s steps(20, end), blink 1s infinite;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .perspective-card {
          perspective: 1000px;
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .card-3d:hover {
          transform: rotateY(10deg) rotateX(10deg);
        }

        .neon-glow {
          box-shadow: 
            0 0 5px rgba(255,255,255,0.2),
            0 0 10px rgba(255,255,255,0.1),
            0 0 20px rgba(255,255,255,0.05);
        }

        .pulse-ring {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>

      {/* Mouse Trail Effect */}
      <div 
        className="mouse-trail"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-morphism z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative chrome-shine">
                <div className="w-14 h-14 chrome-gradient rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 neon-glow">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-chrome font-bold text-2xl">M</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-chrome font-bold text-2xl tracking-wider">MAJAPAHIT</span>
                <div className="text-white/80 text-sm tracking-widest">RIDERS</div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'About', 'Gallery', 'Anniversary', 'Membership'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative text-white/80 hover:text-white transition-all duration-300 group px-4 py-2"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
                            <Link 
                href="https://www.instagram.com/majapahit_riders/" 
                target="_blank"
                className="chrome-button text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Check Our Instagram</span>
                <Instagram />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden relative w-8 h-8 group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className={`absolute w-6 h-0.5 bg-white/80 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 top-4' : 'top-2'}`}></div>
              <div className={`absolute w-6 h-0.5 bg-white/80 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'top-4'}`}></div>
              <div className={`absolute w-6 h-0.5 bg-white/80 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 top-4' : 'top-6'}`}></div>
            </button>
          </div>
          
          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 space-y-4 glass-morphism rounded-lg mt-2 px-4">
              {['Home', 'About', 'Gallery', 'Anniversary', 'Membership'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="block text-white/80 hover:text-white transition-colors duration-300 py-2"
                >
                  {item}
                </a>
              ))}
                            <Link 
                href="https://www.instagram.com/majapahit_riders/" 
                target="_blank"
                className="chrome-button text-white px-6 py-2 rounded-full font-semibold w-full mt-4 flex items-center justify-center space-x-2"
              >
                <span>Check Our Instagram</span>
                <Instagram />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen animated-gradient overflow-hidden grid-pattern">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full floating-element"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/3 rounded-full floating-element" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-white/5 rounded-full floating-element" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Video Background */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-full h-full object-cover opacity-40"
        >
          <source src="/hero.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-6xl">
                                    <div className="mb-8" style={{ transform: isMounted ? `translateY(${scrollY * 0.3}px)` : 'none' }}>
              <div className="inline-block mb-8">
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
              </div>
              
              {isMounted && (
                <>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-chrome mb-4 tracking-wider leading-none">
                    {heroSlides[currentSlide].title}
                  </h1>
                                    <h2 className="text-lg md:text-xl lg:text-2xl text-white/80 mb-6 font-light typewriter">
                    {heroSlides[currentSlide].subtitle}
                  </h2>
                                    <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
                    {heroSlides[currentSlide].description}
                  </p>
                </>
              )}
            </div>
            {/* Hero Slides Navigation */}
            <div className="flex justify-center space-x-4 mb-12">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-12 h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-white neon-glow' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group chrome-button text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 chrome-shine">
                <span className="flex items-center space-x-3">
                  <span>Join Brotherhood</span>
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </button>
              <button className="group glass-morphism text-white/80 px-10 py-4 rounded-full font-light hover:scale-105 transition-all duration-300 border border-white/20">
                <span className="flex items-center space-x-3">
                  <span>Learn More</span>
                  <span className="transform group-hover:rotate-90 transition-transform">↓</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center space-y-3 floating-element">
            <span className="text-white/60 text-sm font-light">Scroll</span>
            <div className="w-6 h-12 glass-morphism rounded-full flex justify-center border border-white/20">
              <div className="w-1 h-4 bg-white/60 rounded-full mt-2 pulse-ring"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-black grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-chrome mb-6">TENTANG MAJAPAHIT RIDERS</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="glass-morphism p-8 rounded-2xl hover-lift">
                <h3 className="text-3xl font-bold text-chrome mb-6">Mengapa Majapahit?</h3>
                <p className="text-white/80 leading-relaxed text-lg font-light">
                  Kami mengambil nama Majapahit karena mencerminkan kekuatan budaya yang mencakup 
                  segala daerah dan berbagai penjuru, khususnya Jawa Timur. Merujuk kepada 
                  kebesaran Gajah Mada dan mengkiaskan kelompok yang besar dan kuat.
                </p>
              </div>
              
              <div className="glass-morphism p-8 rounded-2xl hover-lift">
                <h3 className="text-3xl font-bold text-chrome mb-6">Mengapa Gajah?</h3>
                <p className="text-white/80 leading-relaxed text-lg font-light">
                  Gajah menunjukkan bahwa Majapahit ini kuat dan susah untuk ditumbangkan. 
                  Gajah juga hewan yang kompak, setia, dan penuh kasih sayang - nilai yang 
                  kami junjung tinggi dalam persaudaraan.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="perspective-card">
                <div className="glass-morphism p-8 rounded-2xl card-3d neon-glow">
                  <h3 className="text-3xl font-bold text-chrome mb-6">VISI</h3>
                  <p className="text-white/80 leading-relaxed text-lg font-light">
                    Menjadikan organisasi yang memiliki kesadaran sosial yang tinggi dan menjunjung 
                    tinggi sopan santun dimanapun berada. Menjadikan Majapahit lebih maju dan 
                    membekas di kalangan masyarakat.
                  </p>
                </div>
              </div>
              
              <div className="perspective-card">
                <div className="glass-morphism p-8 rounded-2xl card-3d neon-glow">
                  <h3 className="text-3xl font-bold text-chrome mb-6">MISI</h3>
                  <div className="space-y-4 text-white/80 text-lg font-light">
                    <div className="flex items-start space-x-3">
                      <span className="text-white/60 mt-1">•</span>
                      <span>Menjaga tali persaudaraan antar sesama club otomotif dan masyarakat</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-white/60 mt-1">•</span>
                      <span>Mengubah citra negatif tentang komunitas motor di masyarakat</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-white/60 mt-1">•</span>
                      <span>Membangun solidaritas yang kuat antar anggota</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 animated-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-chrome mb-6">GALERI MAJAPAHIT</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-12"></div>
            
            {/* Gallery Filter */}
            <div className="flex justify-center flex-wrap gap-4 mb-12">
              {['all', 'ride', 'event', 'member'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setGalleryFilter(filter as any)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    galleryFilter === filter 
                      ? 'chrome-button text-white neon-glow' 
                      : 'glass-morphism text-white/80 hover:text-white border border-white/20'
                  }`}
                >
                  {filter === 'all' ? 'Semua' : 
                   filter === 'ride' ? 'Touring' :
                   filter === 'event' ? 'Event' : 'Member'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className="group relative overflow-hidden rounded-2xl glass-morphism aspect-video cursor-pointer hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="loading-shimmer absolute inset-0"></div>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-100 transition-all duration-500 flex items-end p-4">
                  <span className="text-white text-base font-semibold text-center transition-all duration-300">
                    {image.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button className="chrome-button text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 chrome-shine">
              Lihat Semua Foto
            </button>
          </div>
        </div>
      </section>

      {/* Anniversary Section - Enhanced with Large Images */}
      <section id="anniversary" className="py-24 bg-black grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-chrome mb-6">1st ANNIVERSARY</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
            <p className="text-white/70 text-xl font-light">Merayakan perjalanan persaudaraan yang tak terlupakan</p>
          </div>
          
          {/* Large Featured Anniversary Images */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="perspective-card">
              <div className="glass-morphism rounded-3xl overflow-hidden card-3d neon-glow">
                <div className="aspect-video relative group">
                  <img
                    src="/anniv1.jpg"
                    alt="1st Anniversary Main Event"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-bold text-white mb-2">Anniversary Celebration</h3>
                    <p className="text-white/80 font-light">Momen bersejarah dalam perayaan ulang tahun pertama kami.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="perspective-card">
              <div className="glass-morphism rounded-3xl overflow-hidden card-3d neon-glow">
                <div className="aspect-video relative group">
                  <img
                    src="/anniv2.jpg"
                    alt="Brotherhood Unity"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-bold text-white mb-2">Brotherhood Unity</h3>
                    <p className="text-white/80 font-light">Kekuatan persaudaraan dalam satu bingkai.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smaller Anniversary Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {anniversaryImages.slice(2).map((image) => (
              <div key={image.id} className="glass-morphism rounded-2xl p-4 hover-lift">
                <div className="relative overflow-hidden rounded-xl group">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover aspect-video transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h4 className="text-white font-semibold text-lg">{image.alt}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-24 animated-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-chrome mb-6">SYARAT KEANGGOTAAN</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
            <p className="text-white/70 text-xl font-light">Bergabunglah dengan keluarga besar Majapahit Riders</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-morphism p-8 rounded-2xl hover-lift retro-border">
              <h3 className="text-3xl font-bold text-chrome mb-8">SYARAT MEMBER</h3>
              <ul className="space-y-4 text-white/80 text-lg font-light">
                {[ 'Minimal perjalanan 100km',
                   'Stut/mendorong motor teman trouble minimal 10km',
                   'Mengikuti NR wajib sebulan sekali',
                   'Saling membantu dalam keadaan apapun',
                   'Mempunyai SIM yang masih berlaku',
                   'Berumur 17+ tahun',
                   'Sopan santun dalam berkendara'
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="text-white/50 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass-morphism p-8 rounded-2xl hover-lift border-2 border-red-500/30">
              <h3 className="text-3xl font-bold text-red-400 mb-8 filter drop-shadow(0 0 10px rgba(255,0,0,0.5))">LARANGAN</h3>
              <ul className="space-y-4 text-white/80 text-lg font-light">
                {[ 'DILARANG melepas jaket sakral Majapahit saat ada undangan/event',
                   'Dilarang double komunitas atau menjadi member/prospek di pihak lain',
                   'Melanggar kode etik persaudaraan',
                   'Tidak mengikuti kegiatan tanpa alasan yang jelas'
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="text-red-400/50 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-20">
            <button className="chrome-button text-white px-12 py-5 rounded-full font-semibold hover:scale-105 transition-all duration-300 chrome-shine text-lg">
              Daftar Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 justify-center md:justify-start mb-6">
                <div className="w-12 h-12 chrome-gradient rounded-full flex items-center justify-center border border-white/20">
                  <span className="text-chrome font-bold text-2xl">M</span>
                </div>
                <div>
                  <span className="text-chrome font-bold text-xl tracking-wider">MAJAPAHIT</span>
                  <div className="text-white/60 text-xs tracking-widest">RIDERS</div>
                </div>
              </div>
              <p className="text-white/60 font-light">
                Persatuan, Kekuatan, dan Kehormatan dalam setiap perjalanan. 
              </p>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-xl font-bold text-white/90 mb-6">Quick Links</h4>
              <ul className="space-y-3 text-white/60 font-light">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#membership" className="hover:text-white transition-colors">Membership</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-xl font-bold text-white/90 mb-6">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-6">
                <a href="#" className="text-white/60 hover:text-white transition-colors text-2xl">Instagram</a>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-2xl">Facebook</a>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-2xl">WhatsApp</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/40 font-light">
            <p>&copy; 2024 Majapahit Riders. All rights reserved. Designed with Brotherhood.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;