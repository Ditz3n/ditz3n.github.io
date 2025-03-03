// ContactButton.tsx | A button that opens a contact modal when clicked (Used multiple times in the project)
// Created this to avoid breaking the DRY principle (Don't Repeat Yourself)
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import ContactModal from '../modal/ContactModal';

export default function ContactButton({ className = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className={`px-8 py-2 bg-transparent border border-[#292929] rounded-[12px] text-white/80 hover:bg-white/5 transition-all duration-300 w-fit hover:border-white/30 hover:text-white/90 group cursor-pointer ${className}`}
      >
        <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
          {language === "da" ? "Kontakt Mig" : "Contact Me"}
          <ChevronRight size={24} color="white" />
        </span>
      </button>
      
      <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}