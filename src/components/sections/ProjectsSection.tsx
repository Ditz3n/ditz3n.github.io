// ProjectsSection.tsx | A section displaying projects with a progress bar and page navigation
import { useState, useEffect, useRef, useCallback } from 'react';
import { projectsData } from "../../data/ProjectsData";
import { useLanguage } from '../../hooks/useLanguage';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsSection() {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<number | null>(null);
  const shouldChangePageRef = useRef(false);
  
  // Calculate the total number of pages based on projects
  const totalPages = Math.ceil(projectsData.length / 4);
  
  // If the number of projects isn't divisible by 4, add placeholder projects
  const paddedProjectsData = [...projectsData];
  if (paddedProjectsData.length % 4 !== 0) {
    const placeholdersNeeded = 4 - (paddedProjectsData.length % 4);
    for (let i = 0; i < placeholdersNeeded; i++) {
      paddedProjectsData.push({
        id: `placeholder-${i}`,
        name: { da: 'Kommende projekt', en: 'Coming soon' },
        description: {
          da: 'Flere detaljer kommer snart...',
          en: 'More details coming soon...'
        },
        image: '' // Empty image URL for placeholders
      });
    }
  }

  // Split projects into groups of 4
  const projectPages = Array.from(
    { length: totalPages },
    (_, i) => paddedProjectsData.slice(i * 4, (i + 1) * 4)
  );

  // Function to determine which URL to use for the project
  const getProjectUrl = (project: { pdf?: string; deployedUrl?: string; githubUrl?: string }) => {
    if (project.pdf) {
      return project.pdf;
    } else if (project.deployedUrl) {
      return project.deployedUrl;
    } else if (project.githubUrl) {
      return project.githubUrl;
    } else {
      return "#";
    }
  };

  // Reset and restart the progress bar
  const resetProgress = useCallback(() => {
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    
    if (!isPaused) {
      setTimeout(() => {
        startProgressTimer();
      }, 50);
    }
  }, [isPaused]); // Dependency: isPaused

  // Handle page change
  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    resetProgress();
  };

  // Go to the next page
  const goToNextPage = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    resetProgress();
  }, [totalPages, resetProgress]);

  // Start the progress timer
  const startProgressTimer = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    progressInterval.current = window.setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.75; 
        
        if (newProgress >= 100) {
          shouldChangePageRef.current = true;
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  // Seperate effect to handle page changes
  useEffect(() => {
    if (shouldChangePageRef.current) {
      shouldChangePageRef.current = false;
      goToNextPage();
    }
  }, [progress, goToNextPage]);

  // Toggle pause/play
  const togglePause = () => {
    setIsPaused((prev) => {
      const newPaused = !prev;
      
      if (newPaused) {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
      } else {
        startProgressTimer();
      }
      
      return newPaused;
    });
  };

  // Start progress timer when the component mounts
  useEffect(() => {
    startProgressTimer();
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Check if a project is a placeholder
  const isPlaceholder = (projectId: string) => {
    return projectId.startsWith('placeholder-');
  };

  // Animation variants for page transitions
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, // Stagger children animations
        duration: 0.5 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1, // Stagger in reverse on exit
        duration: 0.3 
      }
    }
  };

  // Animation variants for individual projects
  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <AnimatePresence mode="wait">
        <motion.section 
          key={currentPage}
          id="projects" 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-min w-full justify-items-center items-center relative mb-8"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {projectPages[currentPage].map((project) => (
            <motion.div 
              key={project.id} 
              className="col-span-1 w-full p-[0.6%]"
              variants={projectVariants}
            >
              {isPlaceholder(project.id) ? (
                // Placeholder project - hoverable but not clickable
                <div className="group flex flex-col bg-[#121212] rounded-[48px] h-[450px] w-full justify-center overflow-hidden relative border border-[#292929] transition-all duration-300 hover:scale-[1.02] hover:border-white/30 cursor-not-allowed">
                  <div className="absolute inset-0 w-full h-full bg-[] rounded-[48px]"></div>
                  <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                    <div className="mt-auto">
                      <h1 className="text-2xl font-semibold text-white mb-2">
                        {language === "da" ? project.name.da : project.name.en}
                      </h1>
                      <p className="font-medium text-gray-300">
                        {language === "da" ? project.description.da : project.description.en}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none z-0 rounded-b-[48px]"></div>
                </div>
              ) : (
                // Normal project - clickable
                <a 
                  href={getProjectUrl(project)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-[#121212] rounded-[48px] h-[450px] w-full justify-center overflow-hidden relative border border-[#292929] transition-all duration-300 hover:scale-[1.02] hover:border-white/30 cursor-pointer"
                >
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={project.image} 
                      alt={project.name.en} 
                      className="w-full h-full object-cover object-center rounded-[48px]" 
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 rounded-[48px]"></div>
                  </div>
                  <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                    <div className="mt-auto">
                      <h1 className="text-2xl font-semibold text-white mb-2">
                        {language === "da" ? project.name.da : project.name.en}
                      </h1>
                      <p className="font-medium text-gray-300">
                        {language === "da" ? project.description.da : project.description.en}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none z-0 rounded-b-[48px]"></div>
                </a>
              )}
            </motion.div>
          ))}
        </motion.section>
      </AnimatePresence>
      
      {/* Control panel with dots (non-current) and progress bar (current page) */}
      <div className="flex items-center justify-center space-x-4 w-full">
        <div className="flex space-x-2 items-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
            key={index}
            onClick={() => goToPage(index)}
            className={`
              transition-all duration-300 
              ${currentPage === index 
                ? 'relative w-16 h-2 bg-[#121212] border border-[#292929] rounded-full cursor-pointer hover:border-white/30'  // Active page (bar style)
                : 'w-3 h-3 rounded-full border border-[#292929] hover:bg-white/5 hover:border-white/30 cursor-pointer'  // Inactive page (round icon style)
              }
            `}
            aria-label={`Go to page ${index + 1}`}
          >
            {/* Show progress bar only for the current page, confined within the button */}
            {currentPage === index && (
              <div 
                className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${progress}%`, zIndex: 1 }}
              />
            )}
          </button>
          ))}
        </div>
        
        <button
          onClick={togglePause}
          className="p-2 rounded-full bg-[#121212] border border-[#292929] text-white/80 hover:bg-white/5 hover:border-white/30 hover:text-white/90 group cursor-pointer transition-all duration-300 text-white"
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <IoMdPlay size={20} /> : <IoMdPause size={20} />}
        </button>
      </div>
    </div>
  );
}