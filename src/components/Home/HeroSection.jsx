import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full min-h-screen lg:min-h-[90vh] bg-white overflow-hidden flex flex-col lg:flex-row items-center pt-0 lg:pt-0">
      
      {/* 
        RIGHT SIDE (Video Background Area) 
        - Changed to order-1 for mobile so it appears at the top.
        - lg:order-2 keeps it on the right side for desktop.
        - REMOVED: blue background (#dbeafe) and gradient shadow. Now pure white.
      */}
      <div className="relative lg:absolute lg:top-0 lg:right-0 w-full lg:w-1/2 h-[40vh] lg:h-full z-0 flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0 bg-white">
        <video 
          className="w-full h-full object-contain p-4 lg:p-0"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="https://res.cloudinary.com/dsrs8hryx/video/upload/v1792315771/lift_animation_q3gcjb.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 
        LEFT SIDE CONTENT - Clean, Minimal & Premium 
        - Changed to order-2 for mobile so it appears below the video.
        - lg:order-1 keeps it on the left side for desktop.
      */}
      <div className="relative z-10 w-full lg:w-1/2 px-6 lg:px-[10%] flex items-center order-2 lg:order-1 bg-white lg:bg-transparent">
        
        <div className="w-full pb-12 lg:py-0">
          <motion.div 
            className="flex flex-col justify-center max-w-xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            
            {/* Simple Eyebrow Text */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="text-[#1C457D] inter-semibold tracking-[0.2em] text-[11px] md:text-[14px] uppercase">
                Active Lifts & Engineering
              </span>
            </motion.div>
            
            {/* Clean, Solid Headline */}
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-[4rem] inter-bold text-[#1C457D] leading-[1.05] tracking-tight mb-8">
              Elevate Your Standard.
            </motion.h1>
            
            {/* Simple Paragraph */}
            <motion.p variants={fadeUp} className="text-slate-600 inter-medium text-justify text-base sm:text-lg lg:text-xl max-w-md mb-10 leading-relaxed">
              Engineered for smooth, low-noise operation. We provide the industry's most reliable systems to keep your world moving safely.
            </motion.p>
            
            {/* Minimal Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16 w-full">
              {/* Primary Button - Premium 3D Mechanical Lift Button */}
              <button className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-b from-[#234d8a] to-[#1e447b] border-b-[4px] border-[#eab308] rounded-full font-extrabold uppercase tracking-[0.15em] text-xs text-white transition-all duration-150 shadow-[0_8px_20px_rgba(30,68,123,0.3)] hover:brightness-110 hover:shadow-[0_10px_25px_rgba(30,68,123,0.4)] active:border-b-0 active:translate-y-[4px] active:shadow-[0_4px_10px_rgba(30,68,123,0.4)]">
                
                {/* Button er vitorer LED Indicator Light */}
                <span className="w-2 h-2 rounded-full bg-black/40 shadow-inner transition-all duration-300 group-hover:bg-[#eab308] group-hover:shadow-[0_0_12px_rgba(234,179,8,1)]"></span>
                
                {/* Text */}
                <span className="relative z-10">Explore Solutions</span>
                
                {/* Arrow Icon */}
                <ArrowRight 
                  size={16} 
                  className="text-white/70 transition-all duration-300 group-hover:text-[#eab308] group-hover:translate-x-1" 
                />
              </button>
            </motion.div>

            {/* Clean Features */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-slate-200">
              <div>
                <h3 className="inter-bold text-slate-900 text-sm mb-1">Safe & Reliable</h3>
                <p className="inter-normal text-sm text-slate-500">Advanced safety systems</p>
              </div>
              <div>
                <h3 className="inter-bold text-slate-900 text-sm mb-1">Genuine Parts</h3>
                <p className="inter-normal text-sm text-slate-500">Long-lasting performance</p>
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;