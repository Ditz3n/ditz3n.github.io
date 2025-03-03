// FooterSection.tsx | The footer section of the application that displays the current year and time along with the technologies used
import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export default function FooterSection() {
  const [time, setTime] = useState<string>('');
  const { language } = useLanguage();

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      
      // Determine the locale based on the selected language
      const locale = language === 'da' ? 'da-DK' : 'en-US';

      // Create separate formatters for date and time
      const dateFormatter = new Intl.DateTimeFormat(locale, {
        timeZone: 'Europe/Copenhagen',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const timeFormatter = new Intl.DateTimeFormat(locale, {
        timeZone: 'Europe/Copenhagen',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      // Combine the formatted date and time with a dash instead of "at"
      const formattedDate = dateFormatter.format(date);
      const formattedTime = timeFormatter.format(date);
      setTime(`${formattedDate} - ${formattedTime}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000); // Update the timer every second

    return () => clearInterval(timer);
  }, [language]);

  return (
    <footer className="text-center text-gray-400 mt-8 mb-6">
      <p className="text-lg font-medium">&copy; 2025 {language === "da" ? "af Mads Dittmann Villadsen - Alle rettigheder forbeholdt" : "by Mads Dittmann Villadsen - All rights reserved"}</p>
      <p className="text-md text-white font-medium mt-2">{time}</p>
      <p className="text-sm text-gray-500">{language === "da" ? "Lokal tid i " : "Local time in"} Aarhus, Denmark</p>
      <p className='text-sm mt-6 text-gray-500'>{language === "da" ? "Stolt bygget med" : "Proudly built with"} <a href='https://reactjs.org/' target='_blank' rel='noreferrer' className='text-blue-400 hover:underline'>React</a>, <a href='https://tailwindcss.com/' target='_blank' rel='noreferrer' className='text-blue-400 hover:underline'>Tailwind CSS</a>, <a href='https://www.framer.com/motion/' target='_blank' rel='noreferrer' className='text-blue-400 hover:underline'>Framer Motion</a> {language === "da" ? "og" : "and"} <a href='https://www.emailjs.com/' target='_blank' rel='noreferrer' className='text-blue-400 hover:underline'>EmailJS</a></p>
    </footer>
  );
};