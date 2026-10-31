import { useState } from 'react';
import { Save, Loader2, UploadCloud, X, Plus } from 'lucide-react';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Update initial category to a valid one from the new list
  const [formData, setFormData] = useState({
    title: '',
    category: '', // Changed to empty string to enforce selection
    description: '',
  });

  const [specs, setSpecs] = useState(['']);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleSpecChange = (index, value) => {
    const newSpecs = [...specs];
    newSpecs[index] = value;
    setSpecs(newSpecs);
  };
  const addSpecField = () => setSpecs([...specs, '']);
  const removeSpecField = (index) => setSpecs(specs.filter((_, i) => i !== index));

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (imageFiles.length + files.length > 6) {
      setMessage({ type: 'error', text: 'You can only upload up to 6 images.' });
      return;
    }
    setImageFiles([...imageFiles, ...files]);
    setImagePreviews([...imagePreviews, ...files.map(file => URL.createObjectURL(file))]);
  };

  const removeImage = (indexToRemove) => {
    setImageFiles(imageFiles.filter((_, index) => index !== indexToRemove));
    setImagePreviews(imagePreviews.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) {
      setMessage({ type: 'error', text: 'Please select a product category.' });
      return;
    }
    if (imageFiles.length < 2 || imageFiles.length > 6) {
      setMessage({ type: 'error', text: 'Please upload between 2 to 6 product images.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('category', formData.category);
    submitData.append('description', formData.description);
    
    // Ekhane Array ke '|' diye join kore ekta String e convert kora hocche
    const specsString = specs.filter(s => s.trim() !== '').join(' | ');
    submitData.append('specs', specsString);
    
    imageFiles.forEach((file) => submitData.append('images', file));

    try {
      const token = localStorage.getItem('adminToken'); 
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: submitData,
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Product added successfully!' });
        setFormData({ title: '', category: '', description: '' });
        setSpecs(['']);
        setImageFiles([]);
        setImagePreviews([]);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to add product' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="inter-black text-3xl text-slate-900 uppercase tracking-tight mb-2">Add New Product</h1>
        <p className="inter-medium text-slate-500">Upload images and insert details to expand your catalog.</p>
      </div>

      {message.text && <div className={`p-4 mb-6 border inter-semibold text-sm rounded-none ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>{message.text}</div>}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 rounded-none shadow-sm space-y-6">
        <div className="w-full">
          <div className="flex justify-between items-end mb-2">
            <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest block">Product Images (2 to 6) *</label>
            <span className="inter-medium text-xs text-[#1e447b]">{imageFiles.length} / 6 selected</span>
          </div>
          {imageFiles.length < 6 && (
            <div className="relative w-full mb-4 border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-[#1e447b] transition-colors rounded-none p-8 flex flex-col items-center justify-center cursor-pointer">
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <UploadCloud size={32} className="text-slate-400 mb-3" />
              <p className="inter-bold text-sm text-slate-600">Click or drag images to upload</p>
            </div>
          )}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square border-2 border-[#1e447b] rounded-none overflow-hidden group">
                  <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-[#0c1b33] text-white text-[10px] px-2 py-1 inter-bold">{index + 1}</div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeImage(index)} className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"><X size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div>
            <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Product Title *</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none" />
          </div>
          <div>
            <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Category *</label>
            <select 
              required 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
              className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none"
            >
              <option value="" disabled>Select a Category</option>
              
              <optgroup label="Elevators & Lifts">
                <option value="Lift & Escalator">Lift & Escalator</option>
                <option value="Cargo Lift">Cargo Lift</option>
                <option value="Home Lift">Home Lift</option>
              </optgroup>

              <optgroup label="Spare Parts">
                <option value="Traction Motor">Traction Motor</option>
                <option value="Cabin">Cabin</option>
                <option value="Controller">Controller</option>
                <option value="Door System">Door System</option>
                <option value="COP & LOP">COP & LOP</option>
                <option value="Steel Rope & Suspension Rod">Steel Rope & Suspension Rod</option>
              </optgroup>

              <optgroup label="Safety Components">
                <option value="Photocell">Photocell</option>
                <option value="Buffer">Buffer</option>
                <option value="Speed Governor">Speed Governor</option>
                <option value="Guide Shoe">Guide Shoe</option>
                <option value="Limit Switch">Limit Switch</option>
                <option value="U Switch">U Switch</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div>
          <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Specifications *</label>
          {specs.map((spec, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input type="text" required value={spec} onChange={(e) => handleSpecChange(index, e.target.value)} className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none" placeholder="e.g. Max Load: 1000kg" />
              {specs.length > 1 && (
                <button type="button" onClick={() => removeSpecField(index)} className="bg-red-50 text-red-600 px-4 hover:bg-red-600 hover:text-white transition-colors border border-red-100 hover:border-red-600 rounded-none"><X size={16}/></button>
              )}
            </div>
          ))}
          <button type="button" onClick={addSpecField} className="inter-bold text-[10px] text-[#1e447b] uppercase tracking-widest flex items-center gap-1 mt-2">
            <Plus size={14} /> Add Another Spec
          </button>
        </div>

        <div>
          <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Full Description *</label>
          <textarea rows="5" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none resize-none"></textarea>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button type="submit" disabled={loading} className="bg-[#1e447b] hover:bg-[#0c1b33] text-white inter-bold text-xs uppercase tracking-widest px-8 py-4 border-none transition-colors duration-300 flex items-center gap-3 disabled:opacity-70 rounded-none w-full justify-center sm:w-auto sm:justify-start">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {loading ? 'Uploading Images...' : 'Publish Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;