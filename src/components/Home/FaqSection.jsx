import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default vabe 1st ta open thakbe

  const faqs = [
    {
      question: "Do you supply only, or do you provide installation services as well?",
      answer: "We offer complete end-to-end solutions. Alongside supplying premium Xizi Forvorda traction machines and components, our expert engineering team provides full-scale installation, testing, and commissioning for commercial and residential projects."
    },
    {
      question: "Are your spare parts 100% genuine?",
      answer: "Absolutely. We are authorized resellers and strictly source all our spare parts directly from the original manufacturers. We guarantee 100% authenticity for long-lasting performance and safety."
    },
    {
      question: "What is the warranty period for your elevator systems?",
      answer: "We offer comprehensive warranty coverage on all our products. Standard traction machines and control systems come with a 1 to 3-year warranty, depending on the specific model and contract terms. Extended warranties are also available."
    },
    {
      question: "Can you customize elevator cabins for specific architectural designs?",
      answer: "Yes, we specialize in custom elevator cabins. Whether you need a sleek glass panorama cabin, premium wooden finishes, or industrial-grade steel for heavy cargo, we can tailor the design to match your building's aesthetics."
    },
    {
      question: "Do you offer emergency maintenance and after-sales support?",
      answer: "Yes, client safety and comfort are our top priorities. We provide 24/7 emergency technical support and routine maintenance packages to ensure your elevators operate seamlessly without unexpected downtimes."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#f8fafc] py-20 lg:py-28 relative overflow-hidden">
      
      {/* Background Decorative Pattern */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white pointer-events-none rounded-b-[4rem] lg:rounded-b-[8rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)]"></div>

      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* --- Center Aligned Header Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="inter-bold text-[#eab308] tracking-[0.2em] text-[11px] uppercase mb-4 block">
            Common Queries
          </span>
          <h2 className="inter-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight mb-6">
            Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e447b] to-blue-700">Asked Questions.</span>
          </h2>
          <p className="inter-medium text-slate-600 text-[15px] sm:text-base leading-relaxed max-w-2xl">
            Find answers to the most common questions about our elevator systems, installation processes, warranties, and maintenance services.
          </p>
        </motion.div>

        {/* --- FAQ Accordion List --- */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white transition-all duration-300 rounded-2xl overflow-hidden border ${
                  isOpen ? 'border-[#1e447b]/30 shadow-[0_10px_30px_rgba(30,68,123,0.08)]' : 'border-slate-100 hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none group"
                >
                  <h3 className={`inter-bold text-[15px] sm:text-lg pr-6 sm:pr-8 transition-colors ${
                    isOpen ? 'text-[#1e447b]' : 'text-slate-800 group-hover:text-[#1e447b]'
                  }`}>
                    {faq.question}
                  </h3>
                  <div className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-[#1e447b] text-[#eab308]' : 'bg-slate-50 text-slate-400 group-hover:bg-[#1e447b]/10 group-hover:text-[#1e447b]'
                  }`}>
                    {isOpen ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                        <div className="w-12 h-1 bg-[#eab308] mb-4 rounded-full"></div>
                        <p className="inter-medium text-slate-600 leading-relaxed text-sm sm:text-[15px] text-justify">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* --- Center Aligned Support CTA --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col items-center max-w-3xl mx-auto"
        >
          <div className="w-14 h-14 bg-[#1e447b]/5 flex items-center justify-center mb-6 rounded-full">
            <MessageSquare className="text-[#1e447b]" size={28} strokeWidth={2} />
          </div>
          <h3 className="inter-black text-xl sm:text-2xl text-slate-900 mb-3">Still have questions?</h3>
          <p className="inter-medium text-slate-500 text-[15px] mb-8 max-w-md mx-auto">
            Can't find the exact answer you're looking for? Chat with our engineering team for personalized support.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#1e447b] text-white inter-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#0c1b33] hover:shadow-lg hover:shadow-[#1e447b]/20 transition-all duration-300 group">
            Contact Support <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default FaqSection;