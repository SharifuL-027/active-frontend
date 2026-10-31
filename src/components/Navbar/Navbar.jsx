import { useState, useEffect } from 'react';
import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Route change hole mobile menu ebong dropdown bondho hoye jabe
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { 
      name: 'Product', 
      path: '/Product',
      dropdown: [
        {
          title: 'Elevators & Lifts',
          items: ['Lift & Escalator', 'Cargo Lift', 'Home Lift']
        },
        {
          title: 'Spare Parts',
          items: ['Traction Motor', 'Cabin', 'Controller', 'Door System', 'COP & LOP', 'Steel Rope & Suspension Rod']
        },
        {
          title: 'Safety Components',
          items: ['Photocell', 'Buffer', 'Speed Governor', 'Guide Shoe', 'Limit Switch', 'U Switch']
        }
      ]
    },
    { name: 'Contact', path: '/contact' },
    { name: 'Quality', path: '/quality-assurance' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-gray-200/50 shadow-sm py-2'
          : 'bg-white/70 backdrop-blur-md border-transparent py-4'
      }`}
    >
      <div className="w-full px-6 lg:px-[5%] mx-auto">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo Section */}
          <a href="/" className="shrink-0 flex items-center group">
            <img 
              src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1792053853/Logo_maiabs.png" 
              alt="Active Lifts and Engineering" 
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.dropdown && location.pathname.startsWith('/Product'));
              
              return link.dropdown ? (
                // Dropdown Item
                <div 
                  key={link.name}
                  className="relative group py-4"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-1 ${
                      isActive ? 'text-blue-900' : 'text-gray-600 hover:text-blue-900 hover:bg-blue-50/50'
                    }`}
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute inset-0 bg-yellow-100/50 border border-yellow-300 rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu Desktop (Group & Sub-items) */}
                  {/* Dropdown Menu Desktop (Side by Side Columns / Mega Menu) */}
<AnimatePresence>
  {dropdownOpen && (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[850px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 grid grid-cols-3 gap-6"
    >
      {link.dropdown.map((group, idx) => (
        <div key={idx} className="flex flex-col bg-slate-50/50 p-4 rounded-xl border border-slate-100">
          <p className="inter-bold text-[11px] text-blue-900 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2 font-extrabold">
            {group.title}
          </p>
          <div className="flex flex-col space-y-1.5">
            {group.items.map((subItem, sIdx) => (
              <Link 
                key={sIdx} 
                to={`/Product?main=${encodeURIComponent(group.title)}&sub=${encodeURIComponent(subItem)}`} 
                className="px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:text-blue-900 hover:bg-blue-100/60 transition-colors rounded"
                onClick={() => setDropdownOpen(false)}
              >
                {subItem}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )}
</AnimatePresence>
                </div>
              ) : (
                // Regular Items
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                    isActive ? 'text-blue-900' : 'text-gray-600 hover:text-blue-900 hover:bg-blue-50/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 bg-yellow-100/50 border border-yellow-300 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* --- Right Actions (Desktop) --- */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              to="/contact" 
              className="bg-blue-900 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md border-b-2 border-yellow-500 hover:bg-blue-800 transition-all flex items-center justify-center"
            >
              Contact
            </Link>

            {/* Admin Login Icon */}
            <button 
              onClick={() => navigate('/admin/login')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-blue-900 transition-colors relative group"
              aria-label="Admin Login"
            >
              <User size={18} strokeWidth={2.5} />
              
              {/* Tooltip */}
              <span className="absolute top-full mt-2 right-0 bg-gray-800 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Admin Access
              </span>
            </button>
          </div>

          {/* Mobile Actions (Menu Toggle & Admin Icon) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={() => navigate('/admin/login')}
              className="p-2 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-full transition-colors"
            >
              <User size={22} strokeWidth={2.5} />
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-900 hover:text-blue-700 focus:outline-none p-2 rounded-full hover:bg-blue-50 transition-colors"
            >
              {isOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl max-h-[80vh] overflow-y-auto"
    >
      <div className="px-4 py-6 space-y-2 flex flex-col">
        {navLinks.map((link) => (
          <div key={link.name} className="flex flex-col">
            {link.dropdown ? (
              // যদি ড্রপডাউন থাকে তবে ক্লিক করলে টগল হবে
              <div 
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="px-4 py-3 rounded-xl text-base font-bold transition-colors flex justify-between items-center cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-blue-900"
              >
                <span>{link.name}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            ) : (
              // সাধারণ লিংক হলে সরাসরি নেভিগেট করবে
              <NavLink
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-bold transition-colors flex justify-between items-center ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 border-l-4 border-yellow-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'
                  }`
                }
              >
                {link.name}
              </NavLink>
            )}
            
            {/* Mobile Dropdown Groups & Sub-items (Click করলে অ্যানিমেশন সহ খুলবে) */}
            {link.dropdown && (
              <AnimatePresence>
                {mobileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col mt-1 ml-4 border-l-2 border-gray-100 pl-4 space-y-3 overflow-hidden"
                  >
                    {link.dropdown.map((group, idx) => (
                      <div key={idx} className="flex flex-col space-y-1">
                        <p className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mt-2">
                          {group.title}
                        </p>
                        {group.items.map((subItem, sIdx) => (
                          <NavLink
                            key={sIdx}
                            to={`/Product?main=${encodeURIComponent(group.title)}&sub=${encodeURIComponent(subItem)}`}
                            onClick={() => {
                              setIsOpen(false);
                              setMobileDropdownOpen(false);
                            }}
                            className="py-1.5 text-sm font-semibold text-gray-500 hover:text-blue-900 transition-colors"
                          >
                            {subItem}
                          </NavLink>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
        <div className="pt-4 px-2">
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="w-full bg-blue-900 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md border-b-2 border-yellow-500 hover:bg-blue-800 transition-all flex items-center justify-center"
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </header>
  );
};

export default Navbar;