import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ClipboardCheck, Sliders, Activity, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const QualityAssurance = () => {
  window.scrollTo(0, 0);

  const testingParams = [
    {
      title: "Load & Weight Capacity Testing",
      desc: "Every traction machine and cabin framework undergoes rigorous over-load testing (up to 150% of rated capacity) to guarantee structural safety under extreme conditions."
    },
    {
      title: "Vibration & Noise Reduction",
      desc: "Advanced acoustic and mechanical checks are performed to ensure whisper-quiet operation and an ultra-smooth, vibration-free ride experience."
    },
    {
      title: "Electrical Safety & Control Checks",
      desc: "Intelligent control systems and microprocessors are tested for surge protection, emergency braking responsiveness, and fail-safe power cut redundancy."
    },
    {
      title: "Raw Material Metallurgical Inspection",
      desc: "We test industrial-grade steel and components for tensile strength, corrosion resistance, and long-term durability before assembly."
    }
  ];

  const qaSteps = [
    {
      step: "01",
      title: "Incoming Material Audit",
      desc: "Zero compromises at the source. All imported components, cables, and traction gears are meticulously scanned and verified against OEM specifications."
    },
    {
      step: "02",
      title: "In-Process Quality Control",
      desc: "During fabrication and pre-assembly, our certified quality inspectors monitor tolerances down to the millimeter to eliminate mechanical errors."
    },
    {
      step: "03",
      title: "Final Dispatch Simulation",
      desc: "Before any product is cleared for delivery to your site, it must clear a comprehensive 50-point automated and manual stress test."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 pb-20">
      
      {/* --- Page Header Area --- */}
      <div className="bg-[#0c1b33] border-b-4 border-[#eab308] py-20 px-6 lg:px-[5%] relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 100 100">
            <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="2" />
            <line x1="20" y1="100" x2="100" y2="20" stroke="white" strokeWidth="2" />
            <line x1="40" y1="100" x2="100" y2="40" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-[1700px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inter-bold text-[#eab308] tracking-[0.2em] text-xs uppercase mb-4 block flex items-center gap-2">
              <ShieldCheck size={16} /> Uncompromising Standards
            </span>
            <h1 className="inter-black text-4xl md:text-6xl text-white uppercase tracking-tight mb-6 max-w-3xl leading-tight">
              Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] to-yellow-200">Assurance.</span>
            </h1>
            <p className="inter-normal text-slate-400 text-base max-w-2xl leading-relaxed">
              At Active Lifts and Engineering, safety is not an option; it is our core engineering mandate. Every product undergoes strict multi-stage verification before reaching your building.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 lg:px-[5%]">
        
        {/* --- Philosophy Intro Section --- */}
        <div className="py-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="inter-semibold text-[#1e447b] tracking-[0.2em] text-[11px] uppercase mb-3 block">
              Zero-Defect Policy
            </span>
            <h2 className="inter-bold text-3xl md:text-4xl text-slate-900 mb-6 uppercase tracking-wide">
              Built for Absolute <span className="text-[#1e447b]">Safety & Reliability</span>
            </h2>
            <p className="inter-normal text-slate-600 mb-6 leading-relaxed text-lg">
              Vertical mobility systems carry human lives and heavy commercial loads. Because the stakes are absolute, our quality assurance framework leaves no room for error.
            </p>
            <p className="inter-normal text-slate-600 mb-8 leading-relaxed text-lg">
              From global OEM sourcing with partners like Xizi Forvorda to final site deployment testing, our engineers ensure every elevator component meets international safety benchmarks.
            </p>

            <ul className="space-y-4">
              {[
                "Strict Compliance with International Safety Codes",
                "Advanced Diagnostic & Load Testing Protocols",
                "100% Traceability of All Mechanical Parts",
                "Regular Calibration of Testing Instruments"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#eab308] shrink-0" />
                  <span className="inter-medium text-slate-800">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 bg-white border border-slate-200 p-8 lg:p-12 relative rounded-none shadow-sm"
          >
            <div className="absolute top-0 right-0 bg-[#1e447b] px-5 py-2 text-[#eab308] inter-bold text-xs uppercase tracking-widest">
              ISO Verified
            </div>
            <Award className="w-16 h-16 text-[#1e447b] mb-6" />
            <h3 className="inter-bold text-2xl text-slate-900 uppercase tracking-tight mb-4">
              Certified Excellence
            </h3>
            <p className="inter-normal text-slate-600 leading-relaxed mb-6">
              Our quality assurance protocols conform strictly to global standards. We believe that consistent testing builds lasting structural trust with architects, builders, and developers.
            </p>
            <div className="border-t border-slate-200 pt-6 flex items-center justify-between text-xs inter-bold text-slate-500 uppercase tracking-widest">
              <span>Safety Standard</span>
              <span className="text-[#1e447b]">EN-81 / CE Certified</span>
            </div>
          </motion.div>
        </div>

        {/* --- 3-Step Quality Control Process --- */}
        <div className="py-20 border-t border-slate-200">
          <div className="text-center mb-16">
            <span className="inter-semibold text-[#1e447b] tracking-[0.2em] text-[11px] uppercase mb-4 block">
              Step-by-Step Verification
            </span>
            <h2 className="inter-bold text-3xl md:text-4xl text-slate-900 uppercase tracking-tight mb-4">
              Our 3-Tier Quality <span className="text-[#1e447b]">Pipeline.</span>
            </h2>
            <p className="inter-medium text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
              Every item in our inventory passes through three rigorous checkpoints before earning the Active Lifts seal of approval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qaSteps.map((qStep, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border-t-4 border-[#1e447b] border-x border-b border-slate-200 p-10 hover:shadow-lg transition-shadow duration-300 rounded-none group"
              >
                <div className="inter-black text-4xl text-[#eab308] mb-4">
                  {qStep.step}
                </div>
                <h3 className="inter-bold text-xl text-slate-900 mb-3 uppercase tracking-wide group-hover:text-[#1e447b] transition-colors">
                  {qStep.title}
                </h3>
                <p className="inter-normal text-slate-600 leading-relaxed text-sm">
                  {qStep.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Testing Parameters Grid --- */}
        <div className="py-20 border-t border-slate-200">
          <div className="text-center mb-16">
            <span className="inter-semibold text-[#1e447b] tracking-[0.2em] text-[11px] uppercase mb-4 block">
              Rigorous Inspection
            </span>
            <h2 className="inter-bold text-3xl md:text-4xl text-slate-900 uppercase tracking-tight mb-4">
              Key Testing <span className="text-[#1e447b]">Parameters.</span>
            </h2>
            <p className="inter-medium text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
              We test across mechanical, electrical, and structural metrics to guarantee optimal performance under heavy commercial loads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testingParams.map((param, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-slate-200 p-8 flex gap-6 items-start hover:border-[#1e447b] transition-colors rounded-none"
              >
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 rounded-none">
                  <Sliders className="text-[#1e447b]" size={22} />
                </div>
                <div>
                  <h3 className="inter-bold text-lg text-slate-900 mb-2 uppercase tracking-wide">
                    {param.title}
                  </h3>
                  <p className="inter-normal text-slate-600 text-sm leading-relaxed">
                    {param.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Call to Action Banner --- */}
        <div className="my-12 bg-[#0c1b33] border-l-4 border-[#eab308] p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="inter-black text-2xl md:text-3xl text-white uppercase tracking-tight mb-2">
              Have questions about our testing standards?
            </h3>
            <p className="inter-normal text-slate-300 text-sm max-w-xl">
              Speak directly with our chief technical engineers to review specific component compliance certificates for your project.
            </p>
          </div>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 bg-[#eab308] text-slate-900 inter-bold uppercase tracking-widest text-xs px-8 py-4 rounded-none hover:bg-yellow-400 transition-colors duration-300 shrink-0"
          >
            Contact Engineering Team <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default QualityAssurance;