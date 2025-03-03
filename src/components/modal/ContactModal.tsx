// ContactModal.tsx | A modal component for contacting the website owner (me) with a form connected to EmailJS
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import emoji5 from '../../assets/images/emoji5.png';
import emailjs from '@emailjs/browser';

// Interface for ContactModalProps
interface ContactModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ContactModal({ isOpen, setIsOpen }: ContactModalProps) {
  const { language } = useLanguage();
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    contactCategory: '',
    message: ''
  });
  
  // State for form status (submitting, submitted, error)
  const [formStatus, setFormStatus] = useState<{
    submitting: boolean;
    submitted: boolean;
    error: string | null;
  }>({
    submitting: false,
    submitted: false,
    error: null
  });

  // Effect to handle the Escape key to close the modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, setIsOpen]);

  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to handle form submission with EmailJS
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, submitting: true, error: null });
  
    try {
      const templateParams = {
        to_email: 'mvmads@gmail.com',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone_number: formData.phoneNumber,
        inquiry_type: formData.contactCategory,
        message: formData.message,
      };
  
      // Access environment variables with Vite syntax (.env file)
      // Placing these values in .env.local (or .env) does so that they are not exposed in the final build
      // Uploading the project to a public repository will not expose these values because of this
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
      // Debug log to verify values
      console.log('EmailJS Config:', { serviceId, templateId, publicKey });
  
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Check your .env file.');
      }
  
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
  
      if (response.status === 200) {
        setFormStatus({
          submitting: false,
          submitted: true,
          error: null,
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          contactCategory: '',
          message: '',
        });
        setTimeout(() => {
          setIsOpen(false);
          setFormStatus((prev) => ({ ...prev, submitted: false }));
        }, 3000);
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: language === 'da'
          ? 'Der opstod en fejl ved afsendelse. Prøv igen senere.'
          : 'An error occurred while sending. Please try again later.',
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-start justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
          >
          <motion.div 
            className="bg-[#121212] rounded-[48px] w-full max-w-3xl border border-[#292929] shadow-xl relative my-3 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            >
            {!formStatus.submitted && (
            <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-transparent hover:bg-white/10 rounded-[42px] transition-colors z-10 cursor-pointer"
            >
                <X size={20} className="text-white/80" />
            </button>
            )}
            
            <div className="flex flex-col items-center pt-6 pb-6 px-6">
                <img 
                    src={emoji5} 
                    alt="Chat emoji" 
                    className={`object-contain w-40 h-40`}
                />
            {!formStatus.submitted && (
            <div className='text-center'>
                <h2 className="text-white text-2xl font-bold mb-1">
                {language === "da" ? "Lad os tage en snak!" : "Let's have a chat!"}
                </h2>
                <p className="text-white/60">
                {language === "da" 
                    ? "Udfyld dine oplysninger nedenfor, og jeg vender tilbage hurtigst muligt."
                    : "Enter your details below and I'll get back to you as soon as possible."}
                </p>
            </div>
            )}
            </div>
            
            {/* Display form or success message after submission */}
            {formStatus.submitted ? (
              <div className="px-6 pb-6 text-center">
                <div className="p-4">
                  <p className="text-white">
                    {language === "da" 
                      ? "Tak for din besked! Jeg vender tilbage hurtigst muligt."
                      : "Thank you for your message! I'll get back to you as soon as possible."}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                {formStatus.error && (
                  <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30 text-white">
                    {formStatus.error}
                  </div>
                )}
              
                {/* Name inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-white/80 text-sm mb-1">
                      {language === "da" ? "Fornavn" : "First Name"}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-[#1E1E1E] text-white border border-[#292929] rounded-lg focus:outline-none focus:border-white/50"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-white/80 text-sm mb-1">
                      {language === "da" ? "Efternavn" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-[#1E1E1E] text-white border border-[#292929] rounded-lg focus:outline-none focus:border-white/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                {/* Email input */}
                <div>
                  <label htmlFor="email" className="block text-white/80 text-sm mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#1E1E1E] text-white border border-[#292929] rounded-lg focus:outline-none focus:border-white/50"
                    placeholder="johndoe@gmail.com"
                  />
                </div>
                
                {/* Phone number input */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-white/80 text-sm mb-1">
                    {language === "da" ? "Telefonnummer" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#1E1E1E] text-white border border-[#292929] rounded-lg focus:outline-none focus:border-white/50"
                    placeholder="+45 12 34 56 78"
                  />
                </div>
                
                {/* Contact category select */}
                <div>
                  <label htmlFor="contactCategory" className="block text-white/80 text-sm mb-1">
                    {language === "da" ? "Hvad er din forespørgsel?" : "What's your inquiry?"}
                  </label>
                  <select
                    id="contactCategory"
                    name="contactCategory"
                    value={formData.contactCategory}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#1E1E1E] text-white border border-[#292929] rounded-lg focus:outline-none focus:border-white/50 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      {language === "da" ? "Vælg Forespørgsel" : "Select Inquiry"}
                    </option>
                    <option value="general">
                      {language === "da" ? "Generel Forespørgsel" : "General Inquiry"}
                    </option>
                    <option value="support">
                      {language === "da" ? "Support" : "Support"}
                    </option>
                    <option value="feedback">
                      {language === "da" ? "Feedback" : "Feedback"}
                    </option>
                    <option value="other">
                      {language === "da" ? "Andet" : "Other"}
                    </option>
                  </select>
                </div>
                
                {/* Message textarea */}
                <div>
                  <label htmlFor="message" className="block text-white/80 text-sm mb-1">
                    {language === "da" ? "Hvordan kan jeg hjælpe dig?" : "How can I help you?"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full p-3 bg-[#1E1E1E] text-white border border-[#292929] rounded-lg focus:outline-none focus:border-white/50 resize-none"
                    placeholder={language === "da" ? "Hej Mads, kan du hjælpe mig med..." : "Hey Mads, could you help me with..."}
                  ></textarea>
                </div>
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className={`w-full py-3 ${formStatus.submitting ? 'bg-white/50' : 'bg-white hover:bg-white/90'} transition-colors text-black font-medium rounded-[42px] mt-4 cursor-pointer`}
                >
                  {formStatus.submitting 
                    ? (language === "da" ? "Sender..." : "Submitting...") 
                    : (language === "da" ? "Indsend" : "Submit")}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}