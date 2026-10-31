import { motion } from 'framer-motion';
import { ShieldCheck, Feather, Settings2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCommitment = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const commitments = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-[#eab308]" strokeWidth={1.5} />,
      title: "Absolute Safety",
      description: "Our traction machines and control systems are equipped with multi-layered fail-safes. Rigorously tested to meet the highest international safety standards, ensuring zero risks."
    },
    {
      icon: <Feather className="w-10 h-10 text-[#eab308]" strokeWidth={1.5} />,
      title: "Premium Comfort",
      description: "Experience the pinnacle of vertical mobility. Engineered for ultra-smooth acceleration, advanced noise reduction, and completely vibration-free rides."
    },
    {
      icon: <Settings2 className="w-10 h-10 text-[#eab308]" strokeWidth={1.5} />,
      title: "Unwavering Consistency",
      description: "Industrial-grade durability built to last. Our products deliver reliable, high-efficiency performance day in and day out, regardless of the building's traffic volume."
    }
  ];

  return (
    // Eখান থেকে -mt-12 এবং -mt-20 সরিয়ে দেওয়া হয়েছে, এবং একটু স্পেস (mt-10) দেওয়া হয়েছে যাতে আগের কার্ডগুলো ঢাকা না পড়ে
    <section className="relative w-full bg-[#0c1b33] py-24 lg:py-32 overflow-hidden rounded-t-[3rem] lg:rounded-t-[5rem] mt-10 lg:mt-16 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      
      {/* --- Background Architectural Grid --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 lg:px-[5%] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-2xl"
          >
            <motion.span variants={itemVariants} className="inter-bold text-[#eab308] tracking-[0.2em] text-xs uppercase mb-4 block">
              The Active Lifts Promise
            </motion.span>
            <motion.h2 variants={itemVariants} className="inter-bold text-4xl sm:text-5xl lg:text-[4rem] text-white tracking-normal leading-[1.1]">
              Engineered for <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#eab308] to-yellow-200">Perfection.</span>
            </motion.h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-md"
          >
            <p className="inter-medium text-slate-400 leading-relaxed mb-6">
              We don't just supply elevator components; we deliver peace of mind. Every product in our catalog is strictly evaluated against our three core pillars before it reaches your building.
            </p>
            <Link to="/Product" className="inline-flex items-center gap-2 inter-bold text-xs uppercase tracking-widest text-white hover:text-[#eab308] transition-colors group">
              Explore Our Products 
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Commitment Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
        >
          {commitments.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-[#112343] border border-[#1e447b]/50 p-10 hover:bg-[#152a4f] hover:border-[#eab308] transition-all duration-300 group rounded-none relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#eab308] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 pointer-events-none"></div>

              <div className="mb-8 p-4 bg-[#0c1b33] inline-block border border-[#1e447b] rounded-none group-hover:border-[#eab308] transition-colors duration-300">
                {item.icon}
              </div>
              
              <h3 className="inter-bold text-2xl text-white uppercase tracking-wide mb-4 group-hover:text-[#eab308] transition-colors">
                {item.title}
              </h3>
              
              <p className="inter-normal text-slate-400 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>

              {/* Decorative Bottom Bar */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#eab308] transition-all duration-500 group-hover:w-full"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ProductCommitment;