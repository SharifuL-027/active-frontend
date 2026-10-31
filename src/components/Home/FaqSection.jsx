import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageSquare } from 'lucide-react';
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
    <section className="w-full bg-white py-24 lg:py-32">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-[5%]">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Side: Header & CTA */}
          <div className="w-full lg:w-5/12 flex flex-col justify-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inter-bold text-[#1e447b] tracking-[0.2em] text-[15px] uppercase mb-4 block">
                Common Queries
              </span>
              <h2 className="inter-bold text-4xl sm:text-5xl lg:text-[4rem] text-slate-900 uppercase tracking-tight leading-[1.1] mb-6">
                Frequently <br/>
                <span className="text-[#1e447b]">Asked Questions.</span>
              </h2>
              <p className="inter-normal text-slate-600 text-base leading-relaxed mb-10">
                Find answers to the most common questions about our elevator systems, installation processes, warranties, and maintenance services.
              </p>

              {/* Support Card */}
              <div className="bg-white border border-slate-200 p-8 rounded-none shadow-sm">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center mb-6 rounded-none border border-blue-100">
                  <MessageSquare className="text-[#1e447b]" size={24} />
                </div>
                <h3 className="inter-bold text-lg text-slate-900 mb-2 uppercase">Still have questions?</h3>
                <p className="inter-normal text-slate-500 text-sm mb-6">
                  Can't find the answer you're looking for? Please chat with our engineering team.
                </p>
                <Link to="/contact" className="inline-block bg-[#1e447b] text-white inter-bold text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-[#eab308] hover:text-slate-900 transition-colors duration-300 rounded-none">
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Accordion */}
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
                    className={`bg-white border transition-colors duration-300 rounded-none ${
                      isOpen ? 'border-[#1e447b] shadow-md' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <h3 className={`inter-bold text-base md:text-lg pr-8 transition-colors ${
                        isOpen ? 'text-[#1e447b]' : 'text-slate-800'
                      }`}>
                        {faq.question}
                      </h3>
                      <div className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-none border transition-colors ${
                        isOpen ? 'bg-[#1e447b] border-[#1e447b] text-[#eab308]' : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}>
                        {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 border-t border-slate-100">
                            <p className="inter-medium text-slate-600 leading-relaxed text-sm md:text-base mt-4">
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