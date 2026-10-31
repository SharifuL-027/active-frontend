import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckSquare, Send, ShieldCheck, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [mainImage, setMainImage] = useState('');
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', subject: '', message: ''
  });
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Related Products er jonno notun state
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Single Product
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
        const data = await response.json();
        
        if (data.success) {
          const currentProduct = data.data;
          setProduct(currentProduct);
          
          if (currentProduct.images && currentProduct.images.length > 0) {
            setMainImage(currentProduct.images[0]);
          }
          
          setFormData(prev => ({
            ...prev,
            subject: `Inquiry for: ${currentProduct.title}`,
            message: `I am interested in the ${currentProduct.title}. Please send me more details and a quote.`
          }));

          // 2. Fetch Related Products (Same category, excluding current product)
          const allProductsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
          const allData = await allProductsRes.json();
          
          if (allData.success) {
            const related = allData.data
              .filter(p => p.category === currentProduct.category && p._id !== currentProduct._id)
              .slice(0, 4); // Max 4 ta product dekhabe
            
            setRelatedProducts(related);
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, [id]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Inquiry sent successfully! Our team will contact you soon.' });
        setFormData({
          name: '', phone: '', email: '',
          subject: `Inquiry for: ${product.title}`,
          message: `I am interested in the ${product.title}. Please send me more details and a quote.`
        });
      } else {
        setStatus({ type: 'error', message: 'Failed to send inquiry. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Server error. Please check your connection.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="w-full min-h-screen flex items-center justify-center bg-[#f8fafc]"><Loader2 className="w-10 h-10 text-[#1e447b] animate-spin" /></div>;
  if (!product) return <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]"><h2 className="inter-bold text-2xl text-slate-800 mb-4">Product Not Found</h2><Link to="/Product" className="text-[#1e447b] underline hover:text-[#eab308]">Go Back</Link></div>;

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] pt-24 pb-24 font-sans selection:bg-[#1e447b] selection:text-white">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        
        {/* Back Button */}
        <Link to="/Product" className="inline-flex items-center gap-2 inter-semibold text-[13px] text-slate-500 uppercase tracking-widest hover:text-[#1e447b] transition-colors mb-10 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
        </Link>

        {/* --- Top Section: Premium Product Overview --- */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 lg:p-12 mb-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Left: Image Gallery */}
            <div className="w-full lg:w-1/2 flex flex-col gap-5">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} 
                className="w-full aspect-[4/3] sm:aspect-square bg-slate-50 rounded-xl relative flex-shrink-0 overflow-hidden border border-slate-100 group"
              >
                <div className="absolute top-4 left-4 bg-[#0c1b33] px-4 py-1.5 inter-bold text-[10px] text-[#eab308] uppercase tracking-widest z-10 rounded-full shadow-md">
                  {product.category}
                </div>
                <img 
                  src={mainImage || (product.images && product.images[0])} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </motion.div>

              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img, index) => (
                    <button 
                      key={index} 
                      onClick={() => setMainImage(img)} 
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                        mainImage === img ? 'ring-2 ring-[#1e447b] ring-offset-2 opacity-100' : 'border border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} 
              className="w-full lg:w-1/2 flex flex-col justify-center"
            >
              <div className="mb-6">
                <p className="inter-semibold text-slate-400 text-[11px] uppercase tracking-[0.2em] mb-2">
                  SKU: AL-{product._id.substring(0, 6).toUpperCase()}
                </p>
                {/* Title size reduced and made more elegant */}
                <h1 className="inter-black text-3xl md:text-4xl text-slate-900 leading-[1.2] tracking-tight">
                  {product.title}
                </h1>
              </div>
              
              <div className="w-12 h-1 bg-[#eab308] mb-8 rounded-full"></div>
              
              <p className="inter-regular text-slate-600 text-[15px] sm:text-base leading-relaxed mb-10 text-justify">
                {product.description}
              </p>

              {/* Premium Specifications Box */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-6 sm:p-8 mb-10">
                <h3 className="inter-bold text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2 mb-6">
                  <ShieldCheck size={16} className="text-[#1e447b]" /> Technical Specifications
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {product.specs ? (
                    (Array.isArray(product.specs) ? product.specs : product.specs.split('|')).map((spec, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-700">
                        <CheckSquare size={16} className="text-[#eab308] shrink-0 mt-0.5" />
                        <span className="inter-medium text-sm leading-snug">{typeof spec === 'string' ? spec.trim() : spec}</span>
                      </li>
                    ))
                  ) : (
                    <li className="inter-medium text-sm text-slate-500">No technical specifications provided.</li>
                  )}
                </ul>
              </div>

              <div>
                <a href="#inquiry-form" className="inline-flex items-center justify-center gap-3 bg-[#1e447b] text-white px-8 py-4 rounded-xl inter-bold uppercase tracking-widest text-xs hover:bg-[#0c1b33] hover:shadow-lg hover:shadow-[#1e447b]/20 transition-all duration-300 w-full sm:w-auto group">
                  Request a Quote <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- NEW: Premium Related Products Section --- */}
        {relatedProducts.length > 0 && (
          <div className="mb-24">
            <div className="flex items-end justify-between border-b border-slate-200 pb-5 mb-10">
              <div>
                <span className="inter-bold text-[#eab308] tracking-[0.2em] text-[10px] uppercase block mb-1">More Options</span>
                <h2 className="inter-black text-2xl md:text-3xl text-slate-900 tracking-tight">
                  Related Products
                </h2>
              </div>
              <Link to="/Product" className="hidden sm:flex inter-bold text-[#1e447b] text-[11px] uppercase tracking-widest hover:text-[#eab308] transition-colors items-center gap-2 group">
                View Catalog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link 
                  key={relProduct._id}
                  to={`/product/${relProduct._id}`} 
                  className="group flex flex-col bg-white rounded-xl border border-slate-100 hover:border-[#1e447b]/30 hover:shadow-[0_20px_40px_-15px_rgba(30,68,123,0.08)] transition-all duration-300 overflow-hidden"
                >
                  <div className="w-full aspect-[4/5] bg-slate-50 relative overflow-hidden">
                    {relProduct.images && relProduct.images.length > 0 ? (
                      <img 
                        src={relProduct.images[0]} 
                        alt={relProduct.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 inter-medium text-xs">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b33]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white inter-bold text-xs flex items-center gap-2">View Details <ArrowRight size={14} /></span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col grow">
                    <p className="inter-bold text-[#1e447b] text-[9px] uppercase tracking-widest mb-1.5 line-clamp-1">
                      {relProduct.category}
                    </p>
                    <h3 className="inter-black text-lg text-slate-900 group-hover:text-[#1e447b] transition-colors line-clamp-2 leading-tight">
                      {relProduct.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* --- Bottom Section: Premium Inquiry Form --- */}
        <div id="inquiry-form" className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-slate-100">
            
            {/* Form Header */}
            <div className="bg-[#0c1b33] p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <h2 className="inter-black text-2xl md:text-3xl text-white tracking-tight mb-2 relative z-10">Request a Quotation</h2>
              <p className="inter-medium text-slate-400 text-sm relative z-10">Need specific requirements for the {product.title}? Our team is ready to help.</p>
            </div>

            {/* Form Body */}
            <div className="p-8 md:p-12">
              {status.message && (
                <div className={`p-4 mb-8 inter-medium text-sm flex items-center gap-3 rounded-lg ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {status.type === 'success' && <CheckCircle2 className="shrink-0" size={18} />}
                  <p>{status.message}</p>
                </div>
              )}

              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="inter-semibold text-[11px] text-slate-500 uppercase tracking-wider mb-2 block">Full Name *</label>
                    <input 
                      type="text" required
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="inter-medium w-full bg-slate-50/50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#1e447b] focus:bg-white focus:ring-4 focus:ring-[#1e447b]/10 transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="inter-semibold text-[11px] text-slate-500 uppercase tracking-wider mb-2 block">Phone Number *</label>
                    <input 
                      type="tel" required
                      value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="inter-medium w-full bg-slate-50/50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#1e447b] focus:bg-white focus:ring-4 focus:ring-[#1e447b]/10 transition-all"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="inter-semibold text-[11px] text-slate-500 uppercase tracking-wider mb-2 block">Email Address *</label>
                    <input 
                      type="email" required
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="inter-medium w-full bg-slate-50/50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#1e447b] focus:bg-white focus:ring-4 focus:ring-[#1e447b]/10 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="inter-semibold text-[11px] text-slate-500 uppercase tracking-wider mb-2 block">Subject *</label>
                    <input 
                      type="text" required
                      value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="inter-medium w-full bg-slate-50/50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#1e447b] focus:bg-white focus:ring-4 focus:ring-[#1e447b]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="inter-semibold text-[11px] text-slate-500 uppercase tracking-wider mb-2 block">Your Message *</label>
                  <textarea 
                    required rows="5"
                    value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="inter-medium w-full bg-slate-50/50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#1e447b] focus:bg-white focus:ring-4 focus:ring-[#1e447b]/10 transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" disabled={submitLoading}
                    className="w-full bg-[#1e447b] hover:bg-[#0c1b33] text-white inter-bold text-[13px] uppercase tracking-widest py-4 rounded-xl border-none transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-[#1e447b]/20 hover:shadow-[#1e447b]/40"
                  >
                    {submitLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send size={18} />}
                    {submitLoading ? 'Sending Message...' : 'Submit Inquiry'}
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetails;