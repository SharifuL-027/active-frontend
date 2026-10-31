import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // New Category Structure (No Numbering)
  const categoryStructure = {
    "Elevators & Lifts": ['Lift & Escalator', 'Cargo Lift', 'Home Lift'],
    "Spare Parts": ['Traction Motor', 'Cabin', 'Controller', 'Door System', 'COP & LOP', 'Steel Rope & Suspension Rod'],
    "Safety Components": ['Photocell', 'Buffer', 'Speed Governor', 'Guide Shoe', 'Limit Switch', 'U Switch']
  };

  const mainTabs = ['Elevators & Lifts', 'Spare Parts', 'Safety Components'];

  // URL থেকে ডেটা পড়া (যদি থাকে)
  const urlMain = searchParams.get('main');
  const urlSub = searchParams.get('sub');

  // URL-এ ডেটা থাকলে সেটি সিলেক্ট করবে, না থাকলে ডিফল্ট প্রথমটি সিলেক্ট করবে
  const defaultMain = mainTabs.includes(urlMain) ? urlMain : mainTabs[0];
  const defaultSub = categoryStructure[defaultMain]?.includes(urlSub) ? urlSub : categoryStructure[defaultMain][0];

  // New 2-Tier States
  const [activeMainTab, setActiveMainTab] = useState(defaultMain);
  const [activeSubTab, setActiveSubTab] = useState(defaultSub);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/products`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  // URL পরিবর্তন হলে (Navbar থেকে ক্লিক করলে) স্টেট আপডেট করা
  useEffect(() => {
    const main = searchParams.get('main');
    const sub = searchParams.get('sub');
    
    if (main && mainTabs.includes(main)) {
      setActiveMainTab(main);
      if (sub && categoryStructure[main]?.includes(sub)) {
        setActiveSubTab(sub);
      } else {
        setActiveSubTab(categoryStructure[main][0]);
      }
    }
  }, [searchParams]);

  // Sync URL Params when changing main tabs
  const handleMainTabChange = (tab) => {
    setActiveMainTab(tab);
    const firstSubTab = categoryStructure[tab][0];
    setActiveSubTab(firstSubTab);
    
    // URL আপডেট করা
    setSearchParams({ main: tab, sub: firstSubTab });
  };

  // Sync URL Params when changing sub tabs
  const handleSubTabChange = (sub) => {
    setActiveSubTab(sub);
    setSearchParams({ main: activeMainTab, sub: sub });
  };

  // Advanced Filtering (Category + Sub-Category + Search Query combine kore)
  const filteredProducts = products.filter(product => {
    // 1. Title Search Match
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Exact Sub-Category Match (যেহেতু All অপশন নেই)
    const matchesCategory = product.category === activeSubTab;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-20 pb-24">
      
      {/* --- Premium Page Header --- */}
      <div className="bg-[#0c1b33] border-b-4 border-[#eab308] py-20 px-6 lg:px-[5%] relative overflow-hidden mb-12 shadow-md">
        
        {/* Architectural Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-[1700px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inter-bold text-[#eab308] tracking-[0.2em] text-xs uppercase mb-4 flex items-center gap-2">
              <SlidersHorizontal size={14} /> Product Catalog
            </span>
            <h1 className="inter-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight mb-4 leading-tight">
              Explore Our <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] to-yellow-200">Inventory.</span>
            </h1>
            <p className="inter-normal text-slate-400 text-sm md:text-base leading-relaxed">
              Discover industry-leading elevator components, traction machines, and intelligent control systems engineered for absolute precision and safety.
            </p>
          </motion.div>
          
          {/* Search Box */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-96 relative"
          >
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name..." 
              className="inter-medium w-full bg-[#112343] border border-[#1e447b] text-white px-5 py-4 pl-12 rounded-none focus:outline-none focus:border-[#eab308] focus:bg-[#152a4f] transition-all duration-300 placeholder:text-slate-500"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 lg:px-[5%]">
        
        {/* --- Premium Categories Tabs Area --- */}
        <div className="w-full mb-12 flex flex-col items-center">
          
          {/* Tier 1: Main Categories */}
          <div className="w-full border-b border-slate-200 overflow-x-auto scrollbar-hide">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 pb-px w-max md:w-auto mx-auto">
              {mainTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleMainTabChange(tab)}
                  className={`inter-bold relative px-6 py-4 text-xs uppercase tracking-widest transition-all duration-300 rounded-none whitespace-nowrap ${
                    activeMainTab === tab 
                      ? 'text-[#1e447b]' 
                      : 'text-slate-500 hover:text-slate-800 bg-transparent'
                  }`}
                >
                  {/* Active Indicator Line */}
                  {activeMainTab === tab && (
                    <motion.div
                      layoutId="activeCatalogBorder"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#eab308] z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tier 2: Sub Categories */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeMainTab}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full mt-6 flex flex-wrap justify-center gap-2"
            >
              {categoryStructure[activeMainTab].map((subTab) => (
                <button
                  key={subTab}
                  onClick={() => handleSubTabChange(subTab)}
                  className={`inter-bold px-5 py-2.5 text-[10px] uppercase tracking-widest transition-all duration-300 rounded-none border ${
                    activeSubTab === subTab 
                      ? 'bg-[#eab308] text-slate-900 border-[#eab308]' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-[#1e447b] hover:text-[#1e447b]'
                  }`}
                >
                  {subTab}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Product Grid Area --- */}
        {loading ? (
          <div className="w-full flex flex-col justify-center items-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-[#1e447b] mb-4" />
            <p className="inter-bold text-[#1e447b] uppercase tracking-widest text-xs animate-pulse">Loading Inventory...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full flex flex-col justify-center items-center py-32 bg-white border border-slate-200 border-dashed rounded-none"
          >
            <Search size={48} className="text-slate-300 mb-4" />
            <h3 className="inter-black text-xl text-slate-800 uppercase tracking-tight mb-2">No Products Found</h3>
            <p className="inter-medium text-slate-500">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => { setSearchQuery(''); handleMainTabChange(mainTabs[0]); }}
              className="mt-6 inter-bold text-xs uppercase tracking-widest text-[#1e447b] hover:text-[#eab308] underline underline-offset-4"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={product._id} 
                >
                  <Link 
                    to={`/product/${product._id}`} 
                    className="group flex flex-col bg-white rounded-none border border-slate-200 hover:border-[#1e447b] hover:shadow-[0_20px_40px_-15px_rgba(30,68,123,0.1)] transition-all duration-300 h-full relative"
                  >
                    {/* Image Area */}
                    <div className="w-full aspect-[4/5] overflow-hidden bg-slate-100 relative rounded-none border-b border-slate-100">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 inter-medium text-sm">
                          No Image
                        </div>
                      )}
                      
                      {/* Premium Category Tag */}
                      <div className="inter-bold absolute top-0 left-0 bg-[#0c1b33] px-4 py-2 text-[9px] text-[#eab308] uppercase tracking-widest rounded-none shadow-sm">
                        {product.category}
                      </div>

                      {/* Hover Overlay Icon */}
                      <div className="absolute inset-0 bg-[#0c1b33]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <div className="bg-white p-3 rounded-none translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <ArrowRight size={20} className="text-[#1e447b]" />
                         </div>
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow bg-white">
                      
                      {/* Specs rendering */}
                      <p className="inter-bold text-[#1e447b] text-[10px] uppercase tracking-widest mb-2 line-clamp-1">
                        {product.specs && typeof product.specs === 'string' 
                          ? product.specs.split('|')[0] 
                          : 'Premium Quality'}
                      </p>
                      
                      <h3 className="inter-black text-xl text-slate-900 mb-4 group-hover:text-[#1e447b] transition-colors line-clamp-2 leading-tight">
                        {product.title}
                      </h3>
                      
                      {/* Separator Line */}
                      <div className="w-8 h-1 bg-[#eab308] mb-4 transition-all duration-300 group-hover:w-full"></div>
                      
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="inter-bold text-slate-500 text-[11px] uppercase tracking-wider group-hover:text-[#1e447b] transition-colors">
                          View Specifications
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Products;