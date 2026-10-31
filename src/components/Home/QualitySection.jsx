import { motion } from 'framer-motion';
import { ShieldCheck, Settings, Award } from 'lucide-react';

const QualitySection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    // Ekdom clean sada background o prochur faka jayga (padding)
    <section className="w-full py-10 lg:py-15 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center"
        >
          
          {/* Minimal Header Area */}
          <motion.div variants={fadeUp} className="mb-4">
            <span className="text-[#1e447b] inter-semibold tracking-[0.2em] text-[11px] md:text-[14px] uppercase">
              Our Commitment
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-3xl text-center lg:text-[4rem] inter-bold text-slate-900 leading-[1.1] tracking-tight mb-8 max-w-3xl">
            Engineering excellence <span className="text-[#1e447b]"><br />you can trust.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-slate-500 text-lg lg:text-xl max-w-2xl leading-relaxed mb-24">
            No compromises. We deliver precision-engineered elevator systems and genuine spare parts designed for safety, longevity, and ultra-quiet operation.
          </motion.p>

          {/* Clean 3-Column Features - Kono border ba shadow nei */}
          <div className="grid sm:grid-cols-3 gap-16 lg:gap-24 w-full">
            
            {/* Feature 1 */}
            <motion.div variants={fadeUp} className="flex flex-col items-center">
              <div className="mb-6 text-[#eab308]">
                <Settings size={44} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Precision Built</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Manufactured to strict tolerances ensuring flawless mechanical synchronization and zero vibration.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeUp} className="flex flex-col items-center">
              <div className="mb-6 text-[#eab308]">
                <ShieldCheck size={44} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Absolute Safety</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Strict compliance with global safety codes, backed by rigorous stress testing for every component.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeUp} className="flex flex-col items-center">
              <div className="mb-6 text-[#eab308]">
                <Award size={44} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Proven Durability</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Constructed from premium-grade materials to easily withstand decades of heavy-duty usage.
              </p>
            </motion.div>

          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default QualitySection;