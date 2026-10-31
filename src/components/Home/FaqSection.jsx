import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

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
    <section className="w-full bg-[#f8fafc] py-24 lg:py-32 selection:bg-[#1e447b] selection:text-white">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-[5%]">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* --- Left Side: Header & CTA (Now Sticky) --- */}
          <div className="w-full lg:w-5/12 relative">
            <div className="lg:sticky lg:top-32">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* অরিজিনাল ফন্ট ও সাইজ ঠিক রাখা হয়েছে */}
                <span className="inter-bold text-[#1e447b] tracking-[0.2em] text-[15px] uppercase mb-4 block">
                  Common Queries
                </span>
                <h2 className="inter-bold text-4xl sm:text-5xl lg:text-[4rem] text-slate-900 uppercase tracking-tight leading-[1.1] mb-6">
                  Frequently <br/>
                  <span className="text-[#1e447b]">Asked Questions.</span>
                </h2>
                <p className="inter-normal text-slate-600 text-base leading-relaxed mb-10 max-w-lg">
                  Find answers to the most common questions about our elevator systems, installation processes, warranties, and maintenance services.
                </p>

                {/* Premium Support Card */}
                <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1e447b]/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-500 group-hover:scale-150"></div>
                  
                  <div className="w-12 h-12 bg-blue-50 flex items-center justify-center mb-6 rounded-xl border border-blue-100 relative z-10">
                    <MessageSquare className="text-[#1e447b]" size={22} />
                  </div>
                  <h3 className="inter-black text-xl text-slate-900 mb-2 relative z-10">Still have questions?</h3>
                  <p className="inter-medium text-slate-500 text-sm mb-8 relative z-10">
                    Can't find the answer you're looking for? Chat with our engineering team for personalized support.
                  </p>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-[#1e447b] text-white inter-bold text-[11px] uppercase tracking-widest px-8 py-3.5 hover:bg-[#eab308] hover:text-slate-900 transition-all duration-300 rounded-xl relative z-10">
                    Contact Support <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* --- Right Side: Accordion --- */}
          <div className="w-full lg:w-7/12">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-white transition-all duration-300 rounded-2xl overflow-hidden border relative ${
                      isOpen ? 'border-[#1e447b]/20 shadow-[0_15px_40px_-15px_rgba(30,68,123,0.1)]' : 'border-slate-200 hover:border-[#1e447b]/30 hover:shadow-sm'
                    }`}
                  >
                    {/* Active State Accent Line */}
                    <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors duration-300 ${isOpen ? 'bg-[#eab308]' : 'bg-transparent'}`}></div>

                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none group pl-8 sm:pl-10"
                    >
                      <h3 className={`inter-bold text-base md:text-lg pr-8 transition-colors ${
                        isOpen ? 'text-[#1e447b]' : 'text-slate-700 group-hover:text-[#1e447b]'
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
                          <div className="px-6 sm:px-10 pb-6 sm:pb-8 pt-0">
                            <p className="inter-medium text-slate-600 leading-relaxed text-sm md:text-base text-justify">
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
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqSection;