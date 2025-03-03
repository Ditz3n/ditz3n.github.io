// HighlightSection.tsx | A section component to briefly explain what makes me different from others
import emoji1 from '../../assets/images/emoji1.png';
import { ChevronRight } from "lucide-react";
import { useLanguage } from '../../hooks/useLanguage';

export default function HighlightSection() {
  const { language } = useLanguage();

  return (
    <section className="grid grid-cols-3 gap-6 h-min w-full justify-items-center items-center relative overflow-hidden">
      <div className="col-span-3 flex flex-col bg-[#121212] rounded-[48px] flex-nowrap gap-8 h-full w-full justify-center overflow-hidden p-12 relative border border-[#292929]">
        {/* Flex container for image, text, and button */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative w-full max-w-[300px]">
            <img 
              src={emoji1} 
              alt="Emoji 1" 
              className="w-full h-full object-contain relative z-10" 
              style={{
                height: '291px',
                maskImage: 'linear-gradient(180deg, #000000 60.2882179054054%, rgba(0, 0, 0, 0) 100%)',
                overflow: 'visible',
                width: '270px',
                zIndex: 5,
              }}
            />
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold">
              {language === "da" ? "Hvad gør mig anderledes?" : "What makes me different?"}
            </h2>
            <p className="text-gray-400 text-lg mt-6">
              {language === "da" 
                ? "Jeg bygger skræddersyede webapplikationer, der matcher dit brandidentitet og dine mål. Ved at kombinere kreativitet med teknisk ekspertise og holde mig opdateret på moderne frameworks, sikrer jeg, at hvert projekt både er visuelt tiltalende og meget funktionelt."
                : "I build tailored web applications that align with your brand and goals. By combining creativity with technical expertise and staying updated on modern frameworks, I ensure every project is both visually appealing and highly functional."}
            </p>
            <a 
              href="#projects" 
              className="inline-block px-8 py-2 mt-6 bg-transparent border border-[#292929] rounded-[12px] text-white/80 hover:bg-white/5 transition-all duration-300 w-fit hover:border-white/30 hover:text-white/90 group cursor-pointer"
              style={{ textDecoration: 'none' }}
            >
              <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                {language === "da" ? "Gennemse Projekter" : "Browse Projects"}
                <ChevronRight size={24} color="white" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};