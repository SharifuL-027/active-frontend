import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductFilterSection = () => {
  // New Category Structure
  const categoryStructure = {
    "Elevators & Lifts": ['Lift & Escalator', 'Cargo Lift', 'Home Lift'],
    "Spare Parts": ['Traction Motor', 'Cabin', 'Controller', 'Door System', 'COP & LOP', 'Steel Rope & Suspension Rod'],
    "Safety Components": ['Photocell', 'Buffer', 'Speed Governor', 'Guide Shoe', 'Limit Switch', 'U Switch']
  };

  const mainTabs = ['Elevators & Lifts', 'Spare Parts', 'Safety Components'];

  // Default selection (first tab & first sub-tab)
  const [activeMainTab, setActiveMainTab] = useState(mainTabs[0]);
  const [activeSubTab, setActiveSubTab] = useState(categoryStructure[mainTabs[0]][0]);
  
  // Database data fetch state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend theke data fetch korar logic
  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
  }, []);

  // Handle Main Tab Click
  const handleMainTabClick = (tab) => {
    setActiveMainTab(tab);
    // When a main tab is clicked, default to its first sub-category
    setActiveSubTab(categoryStructure[tab][0]); 
  };

  // Filter Logic based on 2-Tier selection (No 'All' option anymore)
  const filteredProducts = products.filter(product => {
    // Show exactly the selected Sub Category
    return product.category === activeSubTab;
  });

  return (
    <section className="w-full py-16 lg:py-24 bg-[#f8fafc] relative min-h-[600px] selection:bg-[#1e447b] selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[5%]">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <span className="inter-bold text-[#eab308] tracking-[0.2em] text-[11px] uppercase mb-4 block">
            Our Inventory
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[4rem] inter-bold text-slate-900 tracking-tight leading-tight">
            Explore Our <span className="text-[#1e447b]">Products.</span>
          </h2>
        </div>

        {/* --- Category Tabs Area --- */}
        <div className="w-full mb-12 md:mb-16 flex flex-col items-center">
          
          {/* Main Tabs (Tier 1) */}
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="flex md:flex-wrap md:justify-center overflow-x-auto gap-2 pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
              {mainTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleMainTabClick(tab)}
                  className={`inter-bold relative px-6 py-3.5 text-[11px] uppercase tracking-widest transition-all duration-300 rounded-full whitespace-nowrap snap-start shrink-0 ${
                    activeMainTab === tab 
                      ? 'text-white shadow-md shadow-[#1e447b]/20' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {activeMainTab === tab && (
                    <motion.div
                      layoutId="activeFilterMainTab"
                      className="absolute inset-0 bg-[#1e447b] z-0 rounded-full"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
            {/* Mobile Scroll Indicator */}
            <div className="absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-[#f8fafc] to-transparent pointer-events-none md:hidden z-10" />
          </div>

          {/* Sub Tabs (Tier 2) */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeMainTab}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full mt-6 flex flex-wrap justify-center gap-3"
            >
              {categoryStructure[activeMainTab].map((subTab) => (
                <button
                  key={subTab}
                  onClick={() => setActiveSubTab(subTab)}
                  className={`inter-bold px-5 py-2.5 text-[10px] uppercase tracking-widest transition-all duration-300 rounded-lg border ${
                    activeSubTab === subTab 
                      ? 'bg-[#eab308] text-slate-900 border-[#eab308] shadow-sm' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-[#1e447b] hover:text-[#1e447b]'
                  }`}
                >
                  {subTab}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="w-full flex flex-col justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#1e447b] mb-4" />
            <p className="inter-bold text-slate-400 uppercase tracking-widest text-[10px] animate-pulse">Loading Inventory...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center py-24 bg-white border border-slate-200 border-dashed rounded-2xl">
            <h3 className="inter-black text-xl text-slate-800 uppercase tracking-tight mb-2">No Products Found</h3>
            <p className="inter-medium text-slate-500 text-sm">We are updating our inventory for this category.</p>
          </div>
        ) : (
          /* Premium Product Grid */
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                  
                  {/* Premium Product Card */}
                  <Link 
                    to={`/product/${product._id}`} 
                    className="group flex flex-col bg-white rounded-xl border border-slate-100 hover:border-[#1e447b]/30 hover:shadow-[0_20px_40px_-15px_rgba(30,68,123,0.08)] transition-all duration-300 overflow-hidden h-full"
                  >
                    
                    {/* Image Box */}
                    <div className="w-full aspect-[4/5] bg-slate-50 relative overflow-hidden">
                      
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 inter-medium text-xs">
                          No Image
                        </div>
                      )}

                      {/* Floating Category Badge */}
                      <div className="absolute top-4 left-4 bg-[#0c1b33] px-4 py-1.5 inter-bold text-[9px] text-[#eab308] uppercase tracking-widest z-10 rounded-full shadow-md">
                        {product.category}
                      </div>

                      {/* Hover Overlay with Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b33]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white inter-bold text-xs flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          View Details <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                    
                    {/* Content Box */}
                    <div className="p-6 flex flex-col flex-grow">
                      
                      <p className="inter-bold text-[#1e447b] text-[10px] uppercase tracking-widest mb-2 line-clamp-1">
                        {product.specs && typeof product.specs === 'string' ? product.specs.split('|')[0] : 'Premium Quality'}
                      </p>
                      
                      <h3 className="inter-black text-lg text-slate-900 mb-6 group-hover:text-[#1e447b] transition-colors line-clamp-2 leading-tight">
                        {product.title}
                      </h3>
                      
                      {/* Animated Bottom Line */}
                      <div className="mt-auto w-8 h-1 bg-[#eab308] rounded-full transition-all duration-300 group-hover:w-full"></div>
                    </div>
                    
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default ProductFilterSection;