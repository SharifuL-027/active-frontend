import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c1b33] pt-20 pb-8 border-t-4 border-[#eab308] text-slate-300">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-[5%]">
        
        {/* Mobile e grid-cols-2 (2 column) kora hoyeche */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-16">
          
          {/* Column 1: Brand Info (Mobile e full width nibe col-span-2) */}
          <div className="flex flex-col col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-[#1e447b] rounded-none flex items-center justify-center transform transition-transform group-hover:rotate-6 shadow-md border-b-2 border-[#eab308]">
                <span className="text-[#eab308] inter-black text-2xl leading-none">A</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl inter-black text-white tracking-tight leading-none uppercase">
                  Active
                </span>
                <span className="text-[10px] inter-bold text-slate-400 tracking-widest leading-none mt-1 uppercase">
                  Lifts and Engineering
                </span>
              </div>
            </Link>
            <p className="inter-normal text-sm leading-relaxed text-slate-400 mb-8 max-w-sm">
              Providing the industry's most reliable elevator systems and genuine spare parts. Engineered for safety, comfort, and zero compromise.
            </p>
            
            {/* Social Icons - Sharp edge rounded-none */}
            <div className="flex items-center gap-4">
              <a href="https://facebook.com/Activeliftsandengineering" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-none border border-slate-700 bg-[#1e447b]/20 flex items-center justify-center text-slate-300 hover:bg-[#1e447b] hover:border-[#1e447b] hover:text-[#eab308] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-none border border-slate-700 bg-[#1e447b]/20 flex items-center justify-center text-slate-300 hover:bg-[#1e447b] hover:border-[#1e447b] hover:text-[#eab308] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white inter-bold text-sm mb-6 uppercase tracking-[0.15em] border-l-2 border-[#eab308] pl-3">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Our Catalog', 'Projects', 'Contact Us'].map((link) => (
                <li key={link}>
                  <Link to="/" className="inter-medium text-sm text-slate-400 hover:text-[#eab308] transition-colors duration-300 flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#eab308]" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="col-span-1">
            <h3 className="text-white inter-bold text-sm mb-6 uppercase tracking-[0.15em] border-l-2 border-[#eab308] pl-3">Top Products</h3>
            <ul className="space-y-4">
              {['Traction Machines', 'Elevator Cabins', 'Control Systems', 'Spare Parts', 'Safety Components'].map((product) => (
                <li key={product}>
                  <Link to={`/Product?category=${encodeURIComponent(product)}`} className="inter-medium text-sm text-slate-400 hover:text-[#eab308] transition-colors duration-300 flex items-center gap-2 group line-clamp-1">
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#eab308]" />
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (Mobile e full width nibe) */}
          <div className="col-span-2 lg:col-span-1 mt-4 lg:mt-0">
            <h3 className="text-white inter-bold text-sm mb-6 uppercase tracking-[0.15em] border-l-2 border-[#eab308] pl-3">Get in Touch</h3>
            <ul className="space-y-5 mb-8">
              <li className="flex items-start gap-4 inter-normal text-sm text-slate-400">
                <MapPin size={18} className="text-[#eab308] shrink-0 mt-0.5" />
                <span>Sector 9, Uttara,Dhaka, Bangladesh, 1230</span>
              </li>
              <li className="flex items-center gap-4 inter-normal text-sm text-slate-400">
                <Phone size={18} className="text-[#eab308] shrink-0" />
                <a href="tel:+8801775958181" className="hover:text-white transition-colors">
                  +8801775-958181
                </a>
              </li>
              <li className="flex items-center gap-4 inter-normal text-sm text-slate-400">
                <Mail size={18} className="text-[#eab308] shrink-0" />
                <a href="mailto:info@activelifts.com" className="hover:text-white transition-colors">
                  sayem@activelifts-bd.com
                </a>
              </li>
            </ul>
            
            {/* Action Button */}
            <Link to="/contact" className="inline-block inter-bold text-xs uppercase tracking-[0.2em] bg-[#1e447b] text-white px-6 py-4 rounded-none border border-[#2a5b9e] hover:bg-[#eab308] hover:border-[#eab308] hover:text-slate-900 transition-all duration-300 shadow-lg shadow-[#1e447b]/20">
              Request a Quote
            </Link>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="inter-medium text-xs text-slate-500 text-center md:text-left">
            &copy; {currentYear} Active Lifts and Engineering. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 inter-medium text-xs text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;