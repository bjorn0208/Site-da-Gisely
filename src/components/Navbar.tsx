import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';
import logo from '../logo.svg';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full flex flex-col items-center justify-center px-4 md:px-6 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'py-2 bg-[oklch(20.5%_0_0)]/80 backdrop-blur-md border-b flex-col border-white/10 shadow-lg' 
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between w-full relative z-10 max-w-7xl mx-auto">
          <div className="flex justify-start flex-1">
            <img 
              src={logo} 
              alt="Gisely Diniz Consultoria Logo" 
              className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-8 md:h-10' : 'h-10 md:h-14'}`} 
            />
          </div>

          <div className="flex justify-end">
            <Magnetic strength={0.3}>
              <button onClick={() => setIsSidebarOpen(true)} className="text-white hover:text-primary transition-colors pointer-events-auto p-2">
                <Menu className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className={`w-full overflow-hidden marquee-container pointer-events-none transition-all duration-500 max-w-7xl mx-auto ${isScrolled ? 'mt-2 h-4 opacity-70' : 'mt-4 h-6 opacity-100'}`}>
          <div className="marquee-content font-bold text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255, 212, 59, 0.8)]">
            GISELY DINIZ CONSULTORIA - CPF: 01889856118 - CAMPO GRANDE / MATO GROSSO DO SUL
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-72 h-full bg-black/40 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <img src={logo} alt="Gisely Diniz Consultoria Logo" className="h-10 w-auto" />
                <Magnetic strength={0.3}>
                  <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-primary transition-transform hover:rotate-90 p-2">
                    <X className="w-8 h-8" />
                  </button>
                </Magnetic>
              </div>
              <div className="flex flex-col gap-8 text-xl items-center justify-center h-full pb-20">
                <Magnetic strength={0.2}>
                  <a href="#" onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-primary hover:scale-110 font-bold font-sans transition-all duration-300 uppercase tracking-widest inline-block">
                    - INÍCIO -
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a href="#como-funciona" onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-primary hover:scale-110 font-bold font-sans transition-all duration-300 uppercase tracking-widest inline-block">
                    - COMO FUNCIONA -
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a href="#depoimentos" onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-primary hover:scale-110 font-bold font-sans transition-all duration-300 uppercase tracking-widest inline-block">
                    - DEPOIMENTOS -
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a href="#consulta" onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-primary hover:scale-110 font-bold font-sans transition-all duration-300 uppercase tracking-widest inline-block">
                    - CONTATO -
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
