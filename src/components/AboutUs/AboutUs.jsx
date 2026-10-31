import { motion } from 'framer-motion';
import { Shield, Feather, Settings, ArrowRight, CheckCircle2, Globe2, Wrench, Building2, ClipboardCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  window.scrollTo(0, 0);

  const stats = [
    { value: "15+", label: "Years of Excellence" },
    { value: "2,500+", label: "Elevators Installed" },
    { value: "50+", label: "Expert Engineers" },
    { value: "24/7", label: "Technical Support" }
  ];

  // Apnar deya 3 ti Core Values ekhane set kora hoyeche
  const values = [
    {
      icon: <Shield className="w-8 h-8 text-[#eab308]" />,
      title: "Safety",
      desc: "We adhere to the strictest international safety standards. Every component is rigorously tested to ensure absolute peace of mind."
    },
    {
      icon: <Feather className="w-8 h-8 text-[#eab308]" />,
      title: "Comfort",
      desc: "Engineered for ultra-smooth operation, advanced noise reduction, and vibration-free rides to provide a premium experience."
    },
    {
      icon: <Settings className="w-8 h-8 text-[#eab308]" />,
      title: "Consistency",
      desc: "Unwavering reliability and industrial-grade performance in every product, installation, and service call, day in and day out."
    }
  ];

  // Notun: Working Process Array
  const processes = [
    {
      icon: <ClipboardCheck className="w-8 h-8 text-[#1e447b]" />,
      title: "01. Consultation & Design",
      desc: "We start by analyzing your building's traffic patterns, architectural constraints, and specific requirements to propose the most optimal vertical mobility solution."
    },
    {
      icon: <Wrench className="w-8 h-8 text-[#1e447b]" />,
      title: "02. Precision Installation",
      desc: "Our certified engineering team executes the installation process with zero compromises, strictly adhering to the manufacturer's precise technical blueprints."
    },
    {
      icon: <Activity className="w-8 h-8 text-[#1e447b]" />,
      title: "03. Lifecycle Maintenance",
      desc: "Beyond installation, we provide proactive, predictive maintenance and 24/7 emergency support to ensure zero downtime for your elevator systems."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white pt-24 pb-20">
      
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
            <span className="inter-bold text-[#eab308] tracking-[0.2em] text-xs uppercase mb-4 block">
              Who We Are
            </span>
            <h1 className="inter-black text-4xl md:text-6xl text-white uppercase tracking-tight mb-6 max-w-3xl leading-tight">
              Elevating Standards in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] to-yellow-200">Vertical Mobility.</span>
            </h1>
            <p className="inter-normal text-slate-400 text-base max-w-2xl leading-relaxed">
              Active Lifts and Engineering is a premier B2B supplier and service provider of high-performance elevator systems, traction machines, and intelligent control units.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 lg:px-[5%]">
        
        {/* --- Story & Mission Section --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 py-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-4/3 bg-slate-100 rounded-none border border-slate-200 overflow-hidden relative z-10">
              <img 
                src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1792063937/Creative_01-04.jpg_20261015173104_tstmo8.jpg" 
                alt="Engineering Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-[#1e447b] rounded-none z-0 hidden md:block"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="inter-bold text-3xl md:text-4xl text-slate-900 mb-6 uppercase tracking-wide">
              Engineering <span className="text-[#1e447b]">Excellence</span>
            </h2>
            <p className="inter-normal text-slate-600 mb-6 leading-relaxed text-lg">
              Since our inception, we have been driven by a singular mission: to provide the most reliable, energy-efficient, and technologically advanced elevator solutions to builders, developers, and corporate institutions.
            </p>
            <p className="inter-normal text-slate-600 mb-8 leading-relaxed text-lg">
              We specialize in globally recognized brands like Xizi Forvorda, ensuring that every project we touch is equipped with industrial-grade durability and uncompromising performance.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Authorized Reseller of Premium Traction Machines",
                "Customized Elevator Cabin Designs",
                "Comprehensive Maintenance & Modernization",
                "100% Genuine Spare Parts Guarantee"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#eab308] shrink-0" />
                  <span className="inter-medium text-slate-800">{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/contact" className="inline-flex items-center gap-3 bg-[#1e447b] text-white inter-bold uppercase tracking-widest text-xs px-8 py-4 rounded-none hover:bg-[#eab308] hover:text-slate-900 transition-colors duration-300">
              Contact Our Team <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* --- Stats Divider --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-12 border-y border-slate-200 my-10">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 border border-transparent hover:border-[#eab308] transition-colors duration-300">
              <span className="inter-black text-4xl md:text-5xl text-[#1e447b] mb-2">{stat.value}</span>
              <span className="inter-semibold text-xs text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* --- Expanded Information Section: History & Partnerships --- */}
        <div className="py-20 flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Our History / Evolution */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 flex items-center justify-center border border-slate-200">
                <Building2 className="text-[#1e447b]" size={24} />
              </div>
              <h3 className="inter-bold text-2xl text-slate-900 uppercase tracking-wide">Our Evolution</h3>
            </div>
            <p className="inter-normal text-slate-600 leading-relaxed mb-6">
              What began as a localized elevator servicing unit has now evolved into one of the region's most trusted B2B suppliers. Over the years, Active Lifts and Engineering has strategically expanded its portfolio to bridge the gap between world-class elevator manufacturing and local infrastructural needs.
            </p>
            <p className="inter-normal text-slate-600 leading-relaxed">
              We recognized early on that a building's vertical mobility system is its central artery. By investing heavily in technical training and building robust supply chains, we have successfully managed complex installations ranging from high-rise commercial complexes to luxury residential properties.
            </p>
          </motion.div>

          {/* Global Partnerships */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 flex items-center justify-center border border-slate-200">
                <Globe2 className="text-[#1e447b]" size={24} />
              </div>
              <h3 className="inter-bold text-2xl text-slate-900 uppercase tracking-wide">Global Partnerships</h3>
            </div>
            <p className="inter-normal text-slate-600 leading-relaxed mb-6">
              Quality begins at the source. We are immensely proud of our strategic partnerships with global manufacturing titans, most notably **Xizi Forvorda**. By working directly with manufacturers, we eliminate intermediaries, ensuring that our clients receive authentic, factory-tested products at competitive market rates.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 p-6 mt-6">
              <h4 className="inter-bold text-[#1e447b] text-sm uppercase tracking-widest mb-4">Why Partner With Us?</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Wrench className="w-4 h-4 text-[#eab308] mt-1 shrink-0" />
                  <span className="inter-medium text-slate-700 text-sm">Direct sourcing guarantees 100% original OEM parts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Wrench className="w-4 h-4 text-[#eab308] mt-1 shrink-0" />
                  <span className="inter-medium text-slate-700 text-sm">Priority allocation of inventory for large-scale projects.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Wrench className="w-4 h-4 text-[#eab308] mt-1 shrink-0" />
                  <span className="inter-medium text-slate-700 text-sm">Factory-backed warranties and direct technical support.</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>

        {/* --- NEW: The Active Lifts Process --- */}
        <div className="py-20 border-t border-slate-200 bg-slate-50 -mx-6 px-6 lg:-mx-[5.5%] lg:px-[5.5%]">
          <div className="max-w-[1700px] mx-auto">
            <div className="text-center mb-16">
              <span className="inter-semibold text-[#1e447b] tracking-[0.2em] text-[11px] uppercase mb-4 block">
                How We Operate
              </span>
              <h2 className="inter-bold text-3xl md:text-4xl text-slate-900 uppercase tracking-tight mb-4">
                The Active Lifts <span className="text-[#eab308]">Process.</span>
              </h2>
              <p className="inter-medium text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                From initial blueprint analysis to post-installation maintenance, our workflow is designed to be transparent, efficient, and entirely hassle-free for our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processes.map((proc, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white border-t-4 border-[#1e447b] p-10 hover:shadow-lg transition-shadow duration-300 group rounded-none"
                >
                  <div className="w-16 h-16 bg-blue-50 flex items-center justify-center mb-6 rounded-none group-hover:bg-[#1e447b] transition-colors duration-300">
                    <div className="group-hover:text-white transition-colors duration-300">
                      {proc.icon}
                    </div>
                  </div>
                  <h3 className="inter-bold text-lg text-slate-900 mb-3 tracking-wide">
                    {proc.title}
                  </h3>
                  <p className="inter-normal text-slate-600 leading-relaxed text-sm">
                    {proc.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Core Values Section (Original) --- */}
        <div className="py-20">
          <div className="text-center mb-16">
            <span className="inter-semibold text-[#1e447b] tracking-[0.2em] text-[11px] uppercase mb-4 block">
              Our Philosophy
            </span>
            <h2 className="inter-bold text-3xl md:text-4xl text-slate-900 uppercase tracking-tight mb-4">
              Core <span className="text-[#1e447b]">Values.</span>
            </h2>
            <p className="inter-medium text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Safety, Comfort and Consistency are the 3 values we are committed to provide to our esteemed customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 border border-slate-200 p-10 hover:border-[#1e447b] hover:shadow-[0_20px_40px_-15px_rgba(30,68,123,0.1)] transition-all duration-300 group rounded-none"
              >
                <div className="w-16 h-16 bg-white border border-slate-200 flex items-center justify-center mb-8 rounded-none group-hover:bg-[#1e447b] transition-colors duration-300">
                  {val.icon}
                </div>
                <h3 className="inter-bold text-xl text-slate-900 mb-4 uppercase tracking-wide group-hover:text-[#1e447b] transition-colors">
                  {val.title}
                </h3>
                <p className="inter-normal text-slate-600 leading-relaxed text-sm">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;