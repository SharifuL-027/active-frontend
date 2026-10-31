import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckSquare, Send, Settings, ShieldCheck, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

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
    // Jodi keu related product e click kore, tahole page er ekdom upore chole jabe
    window.scrollTo(0, 0); 
  }, [id]); // id change holei (ortat onno product e gele) effect abar run korbe

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

  if (loading) return <div className="w-full min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-12 h-12 text-[#1e447b] animate-spin" /></div>;
  if (!product) return <div className="w-full min-h-screen flex items-center justify-center bg-slate-50"><h2 className="inter-bold text-2xl text-slate-800">Product Not Found</h2></div>;

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-375 mx-auto px-6 lg:px-[5%]">
        
        <Link to="/Product" className="inline-flex items-center gap-2 inter-bold text-sm text-[#1e447b] uppercase tracking-widest hover:text-[#eab308] transition-colors mb-10">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        {/* --- Top Section: Product Overview --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 bg-white border border-slate-200 p-6 lg:p-12 mb-16 shadow-sm rounded-none">
          
          <div className="w-full lg:w-1/2 flex flex-col gap-4 min-w-0">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full aspect-square bg-slate-100 border border-slate-200 relative flex-shrink-0 rounded-none overflow-hidden">
              <div className="absolute top-4 left-4 bg-[#1e447b] px-4 py-1.5 inter-bold text-xs text-white uppercase tracking-widest z-10 rounded-none">
                {product.category}
              </div>
              <img src={mainImage || (product.images && product.images[0])} alt={product.title} className="w-full h-full object-cover transition-opacity duration-300" />
            </motion.div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {product.images.map((img, index) => (
                  <button key={index} onClick={() => setMainImage(img)} className={`aspect-square border-2 rounded-none overflow-hidden transition-all duration-300 ${mainImage === img ? 'border-[#1e447b] opacity-100' : 'border-slate-200 opacity-60 hover:opacity-100'}`}>
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full lg:w-1/2 flex flex-col justify-center min-w-0 overflow-hidden">
            <p className="inter-bold text-slate-500 text-xs uppercase tracking-[0.2em] mb-3">
              SKU: AL-{product._id.substring(0, 6).toUpperCase()}
            </p>
            <h1 className="inter-bold text-4xl lg:text-5xl text-slate-700 leading-tight mb-6 wrap-break-word">
              {product.title}
            </h1>
            
            <p className="inter-normal text-lg text-slate-600 text-justify leading-relaxed mb-8 break-words [overflow-wrap:anywhere]">
              {product.description}
            </p>

            <div className="bg-slate-50 border border-slate-200 p-6 mb-10 rounded-none">
              <h3 className="inter-bold text-slate-900 uppercase tracking-widest text-sm border-b border-slate-200 pb-3 mb-4">
                Primary Specifications
              </h3>
              <ul className="space-y-3">
                {/* Error Fixed Here: Handled both String and Array safely */}
                {product.specs ? (
                  (Array.isArray(product.specs) ? product.specs : product.specs.split('|')).map((spec, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700 break-words">
                      <CheckSquare size={18} className="text-[#eab308] shrink-0 mt-0.5" />
                      <span className="inter-medium">{typeof spec === 'string' ? spec.trim() : spec}</span>
                    </li>
                  ))
                ) : (
                  <li className="inter-medium text-slate-500">No specifications provided.</li>
                )}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#inquiry-form" className="flex items-center justify-center gap-3 bg-[#1e447b] text-white px-8 py-4 inter-bold uppercase tracking-widest text-xs border border-[#1e447b] hover:bg-[#eab308] hover:border-[#eab308] hover:text-slate-900 transition-all duration-300 rounded-none w-full sm:w-auto">
                <Send size={16} /> Request Quote
              </a>
            </div>
          </motion.div>
        </div>

        {/* --- NEW: Related Products Section --- */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-8">
              <h2 className="inter-black text-2xl text-slate-900 uppercase tracking-tight">
                Related <span className="text-[#1e447b]">Products</span>
              </h2>
              <Link to="/Product" className="inter-bold text-[#1e447b] text-xs uppercase tracking-widest hover:text-[#eab308] transition-colors flex items-center gap-2">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link 
                  key={relProduct._id}
                  to={`/product/${relProduct._id}`} 
                  className="group flex flex-col bg-white rounded-none border border-slate-200 hover:border-[#1e447b] hover:shadow-[0_20px_40px_-15px_rgba(30,68,123,0.1)] transition-all duration-300 h-full relative"
                >
                  <div className="w-full aspect-4/5 overflow-hidden bg-slate-100 relative rounded-none border-b border-slate-100">
                    {relProduct.images && relProduct.images.length > 0 ? (
                      <img 
                        src={relProduct.images[0]} 
                        alt={relProduct.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 inter-medium text-sm">
                        No Image
                      </div>
                    )}
                    
                    <div className="inter-bold absolute top-0 left-0 bg-[#0c1b33] px-4 py-2 text-[9px] text-[#eab308] uppercase tracking-widest rounded-none shadow-sm">
                      {relProduct.category}
                    </div>

                    <div className="absolute inset-0 bg-[#0c1b33]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <div className="bg-white p-3 rounded-none translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <ArrowRight size={20} className="text-[#1e447b]" />
                       </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col grow bg-white">
                    <p className="inter-bold text-[#1e447b] text-[10px] uppercase tracking-widest mb-2 line-clamp-1">
                      {relProduct.specs && typeof relProduct.specs === 'string' ? relProduct.specs.split('|')[0] : (Array.isArray(relProduct.specs) ? relProduct.specs[0] : 'Premium Quality')}
                    </p>
                    
                    <h3 className="inter-black text-xl text-slate-900 mb-4 group-hover:text-[#1e447b] transition-colors line-clamp-2 leading-tight">
                      {relProduct.title}
                    </h3>
                    
                    <div className="w-8 h-1 bg-[#eab308] mb-4 transition-all duration-300 group-hover:w-full"></div>
                    
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="inter-bold text-slate-500 text-[11px] uppercase tracking-wider group-hover:text-[#1e447b] transition-colors">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* --- Bottom Section: Inquiry Form --- */}
        <div id="inquiry-form" className="w-full">
          <div className="bg-white border-t-4 border-[#1e447b] shadow-[0_20px_40px_-15px_rgba(30,68,123,0.05)] p-8 md:p-12 rounded-none">
            <div className="mb-10">
              <h2 className="inter-black text-2xl md:text-3xl text-slate-900 uppercase tracking-tight mb-2">Send us a message</h2>
              <p className="inter-medium text-slate-500 text-sm">Need specific requirements or a bulk quotation for {product.title}? Fill out the form below.</p>
            </div>

            {status.message && (
              <div className={`p-4 mb-8 inter-bold text-sm flex items-start gap-3 rounded-none ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.type === 'success' && <CheckCircle2 className="shrink-0 mt-0.5" size={18} />}
                <p>{status.message}</p>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Full Name *</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Phone Number *</label>
                  <input 
                    type="tel" required
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Email Address *</label>
                  <input 
                    type="email" required
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Subject *</label>
                  <input 
                    type="text" required
                    value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Your Message *</label>
                <textarea 
                  required rows="5"
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none resize-none"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <button 
                type="submit" disabled={submitLoading}
                className="bg-[#1e447b] hover:bg-[#0c1b33] text-white inter-bold text-xs uppercase tracking-widest px-8 py-4 border-none transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-70 rounded-none w-full sm:w-auto shadow-lg shadow-[#1e447b]/20 hover:shadow-[#1e447b]/40"
              >
                {submitLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {submitLoading ? 'Sending Message...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;