// ContactSection.tsx | A section with a button to open the ContactModal.tsx to contact the developer (me)
import { useLanguage } from '../../hooks/useLanguage';
import ContactButton from '../reusable/ContactButton';
import emoji_call_me_1280x1280 from '../../assets/images/emoji_call_me_1280x1280.png';

export default function ContactSection() {
  const { language } = useLanguage();

  return (
    <section className="grid grid-cols-3 gap-6 h-min w-full justify-items-center items-center relative overflow-hidden">
      <div className="col-span-3 flex flex-col bg-[#121212] rounded-[48px] flex-nowrap gap-8 h-full w-full justify-center overflow-hidden p-12 relative border border-[#292929]">
        {/* Flex container for text and image */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="order-2 lg:order-1">
            <h2 className="text-white text-2xl font-bold">
              {language === "da" ? "Hvordan kan jeg hjælpe dig?" : "How can I help you?"}
            </h2>
            <p className="text-gray-400 text-lg mt-6">
              {language === "da" 
                ? "Har du et projekt i tankerne eller spørgsmål om mine evner? Jeg er kun en besked væk. Lad os sammen bringe dine ideer til live!"
                : "Have a project in mind or questions about my skills? I'm just a message away. Let's bring your ideas to life together!"}
            </p>
            
            {/* Using the ContactButton.tsx component */}
            <div className="mt-6">
              <ContactButton />
            </div>
          </div>
          
          {/* Image placed to the right */}
          <div className="relative w-full max-w-[300px] order-1 lg:order-2">
            {/* Using order-1 on mobile, so the image is on top, but order-2 on desktop, so it's to the right */}
            <img 
              src={emoji_call_me_1280x1280} 
              alt="Emoji 6" 
              className="w-full h-full object-contain relative z-10" 
              style={{
                maskImage: 'linear-gradient(180deg, #000000 60%, rgba(0, 0, 0, 0) 100%)',
                zIndex: 5,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};