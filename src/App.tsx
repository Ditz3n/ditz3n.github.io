// App.tsx | The main component of the application
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import IntroductionSection from './components/sections/IntroductionSection';
import TechSkillsSection from './components/sections/TechSkillsSection';
import HighlightSection from './components/sections/HighlightSection';
import SemesterSection from './components/sections/SemesterSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import FooterSection from './components/sections/FooterSection';

export default function App() {
  // Stagger children animations with a slight delay between each
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animation for each child component
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Causes the page to jump to the top on refresh
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);

  return (
    <>
      <main className="h-full flex justify-center relative overflow-hidden">
        <motion.div 
          className="flex flex-col items-center justify-center content-center flex-nowrap gap-8 h-min w-full max-w-[1200px] overflow-hidden px-4 sm:px-8 md:px-16 pt-8 md:pt-16 pb-0 relative mx-auto"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div className="w-full" variants={item}><IntroductionSection /></motion.div>
          <motion.div className="w-full" variants={item}><TechSkillsSection /></motion.div>
          <motion.div className="w-full" variants={item}><HighlightSection /></motion.div>
          <motion.div className="w-full" variants={item}><SemesterSection /></motion.div>
          <motion.div className="w-full" variants={item}><ProjectsSection /></motion.div>
          <motion.div className="w-full" variants={item}><ContactSection /></motion.div>
          <motion.div className="w-full" variants={item}><FooterSection /></motion.div>
        </motion.div>
      </main>
    </>
  );
}