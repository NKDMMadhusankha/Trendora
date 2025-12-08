import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('isLoggedIn');
      navigate('/login');
    };
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    category: 'Men',
    sizes: []
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data.products || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'sizes') {
      setForm((prev) => ({
        ...prev,
        sizes: checked
          ? [...prev.sizes, value]
          : prev.sizes.filter((size) => size !== value)
      }));
    } else if (name === 'image') {
      setForm((prev) => ({ ...prev, image: e.target.files[0] }));
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageUrl = '';
      if (form.image) {
        const imgData = new FormData();
        imgData.append('image', form.image);
        const imgRes = await axios.post('/api/products/upload', imgData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = imgRes.data.imageUrl;
      }
      
      await axios.post('/api/products', {
        ...form,
        price: Number(form.price),
        imageUrl
      });
      
      setForm({
        name: '',
        description: '',
        price: '',
        image: null,
        category: 'Men',
        sizes: []
      });
      setImagePreview(null);
      fetchProducts();
      alert('Product added successfully!');
    } catch (err) {
      alert('Failed to add product: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
      alert('Product deleted successfully!');
    } catch (err) {
      alert('Failed to delete product: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="mt-2 text-sm text-gray-600">Add and manage your products</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition"
            style={{ position: 'absolute', right: '2rem', top: '2rem' }}
          >
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    name="name"
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter product description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input
                    name="price"
                    type="number"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                  >
                    <option>Men</option>
                    <option>Women</option>
                    <option>Kids</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
                  <div className="flex gap-4">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <label key={size} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="sizes"
                          value={size}
                          checked={form.sizes.includes(size)}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <img src={imagePreview} alt="preview" className="w-full h-40 object-cover rounded-lg" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                >
                  {submitting ? 'Adding Product...' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Product List</h2>
              
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="font-medium">Error loading products</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              
              {!loading && !error && products.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="mt-2 text-gray-500">No products found. Add your first product!</p>
                </div>
              )}
              
              {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                      <div className="flex gap-4">
                        <img
                          src={product.imageUrl || 'https://via.placeholder.com/150'}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-lg font-bold text-blue-600">${(product.price / 100).toFixed(2)}</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{product.category}</span>
                          </div>
                          <div className="mt-2 flex gap-1">
                            {product.sizes && product.sizes.map((size) => (
                              <span key={size} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{size}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;