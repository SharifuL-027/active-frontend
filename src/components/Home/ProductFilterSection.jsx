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
    <section className="w-full py-10 bg-white relative min-h-[600px]">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-[5%]">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <span className="inter-semibold text-[#1e447b] tracking-[0.2em] text-[14px] uppercase mb-4">
            Our Inventory
          </span>
          <h2 className="inter-bold text-4xl sm:text-5xl lg:text-[4rem] text-slate-900 tracking-tight">
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
                  className={`inter-bold relative px-6 py-3 text-xs uppercase tracking-widest transition-colors duration-300 rounded-none border whitespace-nowrap snap-start shrink-0 ${
                    activeMainTab === tab 
                      ? 'text-white border-[#1e447b]' 
                      : 'text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-200/30'
                  }`}
                >
                  {activeMainTab === tab && (
                    <motion.div
                      layoutId="activeFilterMainTab"
                      className="absolute inset-0 bg-[#1e447b] z-0 rounded-none"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
            {/* Mobile Scroll Indicator */}
            <div className="absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden z-10" />
          </div>

          {/* Sub Tabs (Tier 2) */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeMainTab} // This ensures the animation runs when main tab changes
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full mt-4 flex flex-wrap justify-center gap-2"
            >
              {categoryStructure[activeMainTab].map((subTab) => (
                <button
                  key={subTab}
                  onClick={() => setActiveSubTab(subTab)}
                  className={`inter-bold px-4 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 rounded-none border ${
                    activeSubTab === subTab 
                      ? 'bg-[#eab308] text-slate-900 border-[#eab308]' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
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
          <div className="w-full flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#1e447b]" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center py-20 bg-slate-50 border border-slate-200 border-dashed rounded-none">
            <h3 className="inter-black text-xl text-slate-800 uppercase tracking-tight mb-2">No Products Found</h3>
            <p className="inter-medium text-slate-500 text-sm">We are updating our inventory for this category.</p>
          </div>
        ) : (
          /* Grid configured for exactly 4 cards on desktop */
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  
                  {/* Product Card */}
                  <Link 
                    to={`/product/${product._id}`} 
                    className="group flex flex-col bg-white rounded-none border border-slate-200 hover:border-slate-400 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] transition-all duration-300 h-full relative"
                  >
                    
                    {/* Image Box */}
                    <div className="w-full aspect-[4/5] overflow-hidden bg-slate-100 relative rounded-none border-b border-slate-200">
                      
                      {/* image theke images[0] kora hoyeche */}
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200">
                          <span className="text-xs text-slate-400 inter-medium">No Image</span>
                        </div>
                      )}

                      <div className="inter-bold absolute top-0 left-0 bg-[#1e447b] px-3 py-1 text-[9px] text-white uppercase tracking-wider rounded-none shadow-sm">
                        {product.category}
                      </div>
                    </div>
                    
                    {/* Content Box */}
                    <div className="p-5 flex flex-col flex-grow bg-white">
                      {/* Specs safe parsing applied */}
                      <p className="inter-bold text-[#1e447b] text-[10px] uppercase tracking-wider mb-1.5 line-clamp-1">
                        {product.specs && typeof product.specs === 'string' ? product.specs.split('|')[0] : 'Premium Quality'}
                      </p>
                      
                      <h3 className="inter-black text-base text-slate-900 mb-4 group-hover:text-[#1e447b] transition-colors line-clamp-2 leading-snug">
                        {product.title}
                      </h3>
                      
                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="inter-bold text-slate-500 text-xs uppercase tracking-wider group-hover:text-[#1e447b] transition-colors">
                          View Details
                        </span>
                        
                        <div className="w-8 h-8 border border-slate-200 flex items-center justify-center group-hover:bg-[#1e447b] group-hover:border-[#1e447b] transition-all duration-300 rounded-none">
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-white transition-all duration-300" />
                        </div>
                      </div>
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