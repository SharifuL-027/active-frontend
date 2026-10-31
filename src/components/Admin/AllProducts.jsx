import { useState, useEffect } from 'react';
import { Loader2, Trash2, Edit, AlertCircle, X, Save, Plus, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [editSpecs, setEditSpecs] = useState(['']);

  // Image handling states for edit mode
  const [existingImages, setExistingImages] = useState([]); // Cloudinary URLs
  const [newImageFiles, setNewImageFiles] = useState([]); // New Files
  const [newImagePreviews, setNewImagePreviews] = useState([]); // New File Previews

  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
      const data = await response.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Lock page scroll + Escape to close while the edit modal is open
  useEffect(() => {
    if (!isEditModalOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape' && !updateLoading) setIsEditModalOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isEditModalOpen, updateLoading]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setProducts(products.filter(product => product._id !== id));
      } else {
        alert(data.message || 'Failed to delete product');
      }
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);

    // Specs Set kora
    const initialSpecs = (product.specs && typeof product.specs === 'string')
      ? product.specs.split('|').map(s => s.trim())
      : [''];
    setEditSpecs(initialSpecs);

    // Existing Images set kora (Preview er jonno)
    setExistingImages(product.images || []);

    // Clear any previous new images
    setNewImageFiles([]);
    setNewImagePreviews([]);

    setIsEditModalOpen(true);
  };

  const handleEditSpecChange = (index, value) => {
    const newSpecs = [...editSpecs];
    newSpecs[index] = value;
    setEditSpecs(newSpecs);
  };
  const addEditSpecField = () => setEditSpecs([...editSpecs, '']);
  const removeEditSpecField = (index) => setEditSpecs(editSpecs.filter((_, i) => i !== index));

  // --- Image Handlers for Edit Modal ---
  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImagesCount = existingImages.length + newImageFiles.length + files.length;

    if (totalImagesCount > 6) {
      alert('You can only have up to 6 images in total.');
      return;
    }

    setNewImageFiles([...newImageFiles, ...files]);
    setNewImagePreviews([...newImagePreviews, ...files.map(file => URL.createObjectURL(file))]);
  };

  const removeExistingImage = (indexToRemove) => {
    setExistingImages(existingImages.filter((_, index) => index !== indexToRemove));
  };

  const removeNewImage = (indexToRemove) => {
    setNewImageFiles(newImageFiles.filter((_, index) => index !== indexToRemove));
    setNewImagePreviews(newImagePreviews.filter((_, index) => index !== indexToRemove));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (existingImages.length + newImageFiles.length < 2) {
      alert('Please maintain at least 2 images for the product.');
      return;
    }

    setUpdateLoading(true);
    try {
      const validSpecsString = editSpecs.filter(s => s.trim() !== '').join(' | ');

      const submitData = new FormData();
      submitData.append('title', editingProduct.title);
      submitData.append('category', editingProduct.category);
      submitData.append('description', editingProduct.description);
      submitData.append('specs', validSpecsString);

      // Existing Cloudinary URLs pathano hocche array hishebe (jodi remove na hoye thake)
      submitData.append('existingImages', JSON.stringify(existingImages));

      // Notun image upload korle form data te add kora hocche
      newImageFiles.forEach((file) => {
        submitData.append('images', file);
      });

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }, // FormData tai Content-Type dorkar nai
        body: submitData
      });

      const data = await response.json();
      if (data.success) {
        setProducts(products.map(p => (p._id === data.data._id ? data.data : p)));
        setIsEditModalOpen(false);
        setEditingProduct(null);
      } else {
        alert(data.message || 'Failed to update product');
      }
    } catch (error) {
      alert('Something went wrong during update!');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Shared input style (text-base on mobile prevents iOS auto-zoom)
  const inputBase =
    'inter-medium w-full border border-slate-200 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#1e447b] transition-colors rounded-none';

  return (
    <div className="w-full max-w-6xl mx-auto pb-10 relative min-w-0">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div className="min-w-0">
          <h1 className="inter-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight mb-1 sm:mb-2">
            Inventory Management
          </h1>
          <p className="inter-medium text-sm sm:text-base text-slate-500">
            View, edit, and delete your product catalog.
          </p>
        </div>
        <div className="self-start sm:self-auto shrink-0 inter-bold text-xs uppercase tracking-widest bg-slate-100 text-slate-600 px-4 py-2 border border-slate-200">
          Total: {products.length} Items
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 inter-medium text-sm p-4 mb-6 flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#1e447b]" />
        </div>
      ) : (
        <>
          {/* Mobile View (Card list) */}
          <div className="md:hidden flex flex-col gap-3">
            {products.length === 0 ? (
              <div className="bg-white border border-slate-200 p-8 text-center inter-medium text-slate-500">
                No products found.
              </div>
            ) : (
              products.map((product) => (
                <div key={product._id} className="bg-white border border-slate-200 shadow-sm p-3 flex flex-col gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-16 h-16 shrink-0 bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-slate-400">No Img</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="inter-bold text-sm text-slate-900 line-clamp-2 break-words">{product.title}</p>
                      <span className="inline-block mt-1.5 inter-semibold text-[10px] uppercase tracking-wider bg-slate-100 text-[#1e447b] px-2.5 py-1 border border-slate-200">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 active:bg-[#1e447b] active:text-white border border-blue-100 inter-bold text-xs uppercase tracking-widest transition-colors rounded-none"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 active:bg-red-600 active:text-white border border-red-100 inter-bold text-xs uppercase tracking-widest transition-colors rounded-none"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop View (Table) */}
          <div className="hidden md:block bg-white border border-slate-200 shadow-sm overflow-x-auto rounded-none">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0c1b33] text-white inter-bold text-[10px] uppercase tracking-widest">
                  <th className="p-4 border-b border-slate-700">Image</th>
                  <th className="p-4 border-b border-slate-700">Title</th>
                  <th className="p-4 border-b border-slate-700">Category</th>
                  <th className="p-4 border-b border-slate-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center inter-medium text-slate-500">No products found.</td></tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="w-16 h-16 bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                          {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs text-slate-400">No Img</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="inter-bold text-sm text-slate-900 line-clamp-2">{product.title}</p>
                      </td>
                      <td className="p-4">
                        <span className="inline-block inter-semibold text-[10px] uppercase tracking-wider bg-slate-100 text-[#1e447b] px-3 py-1 border border-slate-200 whitespace-nowrap">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => openEditModal(product)}
                          aria-label={`Edit ${product.title}`}
                          className="p-2 bg-blue-50 text-blue-600 hover:bg-[#1e447b] hover:text-white border border-blue-100 hover:border-[#1e447b] transition-colors rounded-none"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          aria-label={`Delete ${product.title}`}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 hover:border-red-600 transition-colors rounded-none"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditModalOpen && editingProduct && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => !updateLoading && setIsEditModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              className="bg-white w-full sm:max-w-3xl border-t-4 border-[#eab308] rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[90dvh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                <h2 className="inter-black text-lg sm:text-xl text-slate-900 uppercase">Edit Product</h2>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  aria-label="Close"
                  className="p-1 -mr-1 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body (scrolls) */}
              <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1 min-h-0">
                <form id="editForm" onSubmit={handleUpdate} className="space-y-5 sm:space-y-6">

                  {/* Visual Image Manager */}
                  <div className="w-full bg-slate-50 p-3 sm:p-6 border border-slate-200">
                    <div className="flex flex-wrap justify-between items-end gap-1 mb-3 sm:mb-4">
                      <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest block">
                        Manage Product Images (Max 6)
                      </label>
                      <span className="inter-medium text-xs text-[#1e447b]">
                        {existingImages.length + newImageFiles.length} / 6 selected
                      </span>
                    </div>

                    {/* Image Preview Grid */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 mb-4">
                      {/* 1. Existing Images from DB */}
                      {existingImages.map((imgUrl, index) => (
                        <div key={`old-${index}`} className="relative aspect-square border-2 border-[#1e447b]/30 rounded-none overflow-hidden">
                          <img src={imgUrl} alt={`Current ${index}`} className="w-full h-full object-cover" />
                          <div className="absolute top-1 left-1 bg-[#1e447b] text-white text-[9px] px-1.5 inter-bold">Old</div>
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            aria-label="Remove image"
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors shadow"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}

                      {/* 2. New Image Previews */}
                      {newImagePreviews.map((preview, index) => (
                        <div key={`new-${index}`} className="relative aspect-square border-2 border-[#eab308] rounded-none overflow-hidden">
                          <img src={preview} alt={`New ${index}`} className="w-full h-full object-cover" />
                          <div className="absolute top-1 left-1 bg-[#eab308] text-slate-900 text-[9px] px-1.5 inter-bold">New</div>
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            aria-label="Remove image"
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors shadow"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add More Images Button */}
                    {(existingImages.length + newImageFiles.length) < 6 && (
                      <div className="relative w-full border-2 border-dashed border-slate-300 bg-white hover:bg-slate-100 hover:border-[#1e447b] transition-colors rounded-none p-4 flex flex-col items-center justify-center cursor-pointer">
                        <input type="file" accept="image/*" multiple onChange={handleNewImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <div className="flex items-center gap-2 text-slate-600">
                          <UploadCloud size={18} />
                          <span className="inter-bold text-xs uppercase tracking-widest">Add More Images</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div className="min-w-0">
                      <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-1 block">Product Title</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.title}
                        onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                        className={`${inputBase} bg-slate-50`}
                      />
                    </div>
                    <div className="min-w-0">
                      <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-1 block">Category</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        className={`${inputBase} bg-slate-50`}
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

                  <div className="bg-slate-50 p-3 sm:p-4 border border-slate-200">
                    <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Specifications</label>
                    {editSpecs.map((spec, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          required
                          value={spec}
                          onChange={(e) => handleEditSpecChange(index, e.target.value)}
                          className={`${inputBase} bg-white min-w-0`}
                        />
                        {editSpecs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEditSpecField(index)}
                            aria-label="Remove spec"
                            className="shrink-0 bg-red-50 text-red-600 px-3 hover:bg-red-600 hover:text-white transition-colors border border-red-100 hover:border-red-600 rounded-none"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addEditSpecField}
                      className="inter-bold text-[10px] text-[#1e447b] uppercase tracking-widest flex items-center gap-1 mt-2 py-1"
                    >
                      <Plus size={14} /> Add Another Spec
                    </button>
                  </div>

                  <div>
                    <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-1 block">Description</label>
                    <textarea
                      rows="4"
                      required
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className={`${inputBase} bg-slate-50 resize-none`}
                    ></textarea>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-full sm:w-auto inter-bold text-xs uppercase tracking-widest px-6 py-3 border border-slate-300 text-slate-600 hover:bg-slate-200 transition-colors rounded-none"
                >
                  Cancel
                </button>
                <button
                  form="editForm"
                  type="submit"
                  disabled={updateLoading}
                  className="w-full sm:w-auto justify-center bg-[#1e447b] hover:bg-[#0c1b33] text-white inter-bold text-xs uppercase tracking-widest px-6 py-3 border-none transition-colors duration-300 flex items-center gap-2 disabled:opacity-70 rounded-none"
                >
                  {updateLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {updateLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProducts;