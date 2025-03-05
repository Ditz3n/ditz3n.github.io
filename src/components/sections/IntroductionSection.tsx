// IntroductionSection Component | The introduction section of the landing page
import { useEffect, useState, useRef, useMemo } from 'react';
import { SpaceBackground } from '../emoji_background/SpaceBackground';
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useLanguage } from '../../hooks/useLanguage';
import ContactButton from '../reusable/ContactButton';
import emoji_v_sign_320x320 from '../../assets/images/emoji_v_sign_320x320.png';
import emoji_pray_1280x1200 from '../../assets/images/emoji_pray_1280x1280.png';

export default function IntroductionSection() {
  const [scrollY, setScrollY] = useState(0);
  const firstContainerRef = useRef<HTMLDivElement>(null);
  const secondContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  // Effect to update scrollY state on scroll (used for parallax effect on emoji (character image))
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const spaceBackground = useMemo(() => (
    <SpaceBackground meteorCount={5} starCount={50} />
  ), []);

  // Effect to update height and ensure correct display of section items on resize
  useEffect(() => {
    const updateLayout = () => {
      if (!firstContainerRef.current || !secondContainerRef.current) return;

      // Calculate the height of the first container
      const firstHeight = firstContainerRef.current.offsetHeight;
      
      // Set a minimum height on the second container so it always shows
      secondContainerRef.current.style.minHeight = "300px";
      
      // For xl and bigger screen sizes (side-by-side)
      if (window.innerWidth >= 1280) { // xl breakpoint in Tailwindcss
        secondContainerRef.current.style.height = '100%';
      } 
      // For smaller screen sizes (stacked)
      else {
        secondContainerRef.current.style.height = `${firstHeight}px`;
      }
    };

    // Run the update immediately
    updateLayout();
    
    // Update layout on resize
    window.addEventListener('resize', updateLayout);
    
    // Create a ResizeObserver to detect size changes on containers
    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });
    
    // Oberves the first and second container for changes
    if (firstContainerRef.current) {
      resizeObserver.observe(firstContainerRef.current);
    }
    if (secondContainerRef.current) {
      resizeObserver.observe(secondContainerRef.current);
    }
    
    // Oberves the entire section for changes
    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', updateLayout);
      resizeObserver.disconnect();
    };
  }, []); // Runs once on mount and observes changes thereafter

  return (
    <section 
      ref={sectionRef}
      className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-min w-full justify-items-center items-start relative overflow-visible p-0"
    >
      {/* Grid Item 1 */}
      <div 
        ref={firstContainerRef}
        className="col-span-1 xl:col-span-2 flex flex-col bg-[#121212] rounded-[48px] flex-nowrap gap-8 h-full w-full justify-center overflow-hidden p-12 relative border border-[#292929]"
      >
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"> 
            <div className="flex items-center gap-2">
              <img 
                src={emoji_v_sign_320x320} 
                alt="Mads' avatar" 
                className="w-12 h-12 object-contain rounded-full"
              />
              <div>
                <h1 className="text-md font-bold text-white mb-2">Hey, {language === "da" ? "Jeg er" : "I'm"} Mads!</h1>
                <p className="text-sm text-white/60">{language === "da" ? "Softwareingeniørstuderende" : "Software Engineering Student"}</p>
              </div>
            </div>
            {/* Icon Buttons */}
            <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
              <a href="https://www.linkedin.com/in/ditz3n/" target="_blank" rel="noopener noreferrer">
                <button className="w-12 h-12 flex items-center justify-center bg-transparent border border-[#292929] rounded-[12px] text-white/80 hover:bg-white/5 transition-all duration-300 hover:border-white/30 hover:text-white/90 cursor-pointer">
                  <FaLinkedinIn size={24} />
                </button>
              </a>

              <a href="https://www.instagram.com/ditz3n/" target="_blank" rel="noopener noreferrer">
                <button className="w-12 h-12 flex items-center justify-center bg-transparent border border-[#292929] rounded-[12px] text-white/80 hover:bg-white/5 transition-all duration-300 hover:border-white/30 hover:text-white/90 cursor-pointer">
                  <FaInstagram size={24} />
                </button>
              </a>
              
              {/* ContactButton.tsx Component */}
              <ContactButton />
            </div>
          </div>
          
          <p className={`text-white font-bold max-w-[600px] leading-snug ${language === "da" ? "text-2xl" : "text-3xl"}`}>
            {language === "da" ? "Passioneret omkring at skabe dynamiske og skalerbare webapplikationer." : "Passionate about crafting dynamic and scalable web applications."}
          </p>

          <p className={`text-white/60 max-w-[600px] leading-relaxed ${language === "da" ? "text-md" : "text-lg"}`}>
            {language === "da" ? "Jeg har en dyb passion for at bygge moderne, responsive webapps ved hjælp af React og udforske de nyeste webteknologier." : "I have a deep passion for building modern, responsive web apps using React and exploring the latest web technologies."}
          </p>
        </div>

        {/* Scroll-based decoration */}
        <div 
          className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#292929]/30 to-transparent"
          style={{ transform: `translateX(${scrollY * 0.1}px)` }}
        ></div>
      </div>

      {/* Grid item 2 - Emoji display */}
      <div 
        ref={secondContainerRef}
        className="col-span-1 flex items-center justify-center bg-[#121212] rounded-[48px] flex-nowrap gap-8 w-full overflow-hidden p-0 relative border border-[#292929] xl:block"
      >
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(50, 50, 50, 0.7) 0%, rgba(34, 34, 34, 0.3) 30%, transparent 70%)'
          }}
        ></div>
        <img 
          src={emoji_pray_1280x1200} 
          alt='Emoji 1' 
          className='w-auto h-[90%] object-contain absolute left-1/2 transform -translate-x-1/2 z-4'
          style={{ bottom: `${-scrollY * 0.2}px` }}
        />
        <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-4"></div>
        {spaceBackground}
      </div>
    </section>
  );
}