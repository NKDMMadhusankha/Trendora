import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const MensPage = () => {
  const [filters, setFilters] = useState({
    availability: [],
    priceRange: [],
    size: [],
    gender: [],
    fit: [],
  });

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const fetchProducts = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/products?category=Men&page=${pageNum}&limit=${limit}`);
      const transformedProducts = res.data.products.map(product => ({
        id: product._id,
        name: product.name,
        subtitle: product.description,
        price: product.price,
        colors: 1,
        fit: 'Regular',
        size: product.sizes || [],
        gender: product.category,
        available: true,
        image: product.imageUrl
      }));
      setProducts(transformedProducts);
      setTotalPages(res.data.pages || 1);
      setTotalProducts(res.data.total || transformedProducts.length);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      setProducts([]);
      setTotalPages(1);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = {
    availability: ['In Stock', 'Sold Out'],
    priceRange: ['Under LKR 5,000', 'Under LKR 10,000', 'LKR 10,000 - LKR 20,000', 'Over LKR 20,000'],
    size: ['S', 'M', 'L', 'XL', 'XXL'],
    gender: ['Men', 'Women', 'Unisex'],
    fit: ['Regular', 'Fitted', 'Oversize'],
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const currentFilters = prev[category];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [category]: currentFilters.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentFilters, value]
        };
      }
    });
  };

  const removeFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      availability: [],
      priceRange: [],
      size: [],
      gender: [],
      fit: [],
    });
  };

  const activeFilterCount = Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.availability.length > 0) {
      result = result.filter(product => {
        if (filters.availability.includes('In Stock') && product.available) return true;
        if (filters.availability.includes('Sold Out') && !product.available) return true;
        return false;
      });
    }

    if (filters.priceRange.length > 0) {
      result = result.filter(product => {
        return filters.priceRange.some(range => {
          if (range === 'Under LKR 5,000' && product.price < 5000) return true;
          if (range === 'Under LKR 10,000' && product.price >= 5000 && product.price < 10000) return true;
          if (range === 'LKR 10,000 - LKR 20,000' && product.price >= 10000 && product.price <= 20000) return true;
          if (range === 'Over LKR 20,000' && product.price > 20000) return true;
          return false;
        });
      });
    }

    if (filters.size.length > 0) {
      result = result.filter(product => 
        filters.size.some(size => product.size.includes(size))
      );
    }

    if (filters.gender.length > 0) {
      result = result.filter(product => 
        filters.gender.includes(product.gender)
      );
    }

    if (filters.fit.length > 0) {
      result = result.filter(product => 
        filters.fit.includes(product.fit)
      );
    }

    if (sortBy === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'nameAZ') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [filters, sortBy, products]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header with gradient */}
      <div className="text-white relative overflow-hidden" style={{ backgroundColor: '#0a1929' }}>
        {/* Content */}
        <div className="max-w-full mx-auto px-20 py-12 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6 text-slate-300">
            <span className="hover:text-white cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-white cursor-pointer transition-colors">Collections</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Men's Wear</span>
          </nav>
          <h1 className="text-5xl font-bold mb-2">Men's Wear</h1>
          <p className="text-slate-300 text-lg">Discover our latest collection</p>
        </div>
      </div>

      <div className="max-w-full mx-auto px-20">
        {/* Toolbar */}
        <div className="sticky top-0 z-20 border-b border-slate-200 -mx-20 px-20 py-4" style={{ backgroundColor: '#f3f3f3' }}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-white text-black px-2 py-0.5 rounded-full text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              
              <span className="text-slate-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="nameAZ">Name: A-Z</option>
              </select>
            </div>
          </div>

          {/* Active Filters Bar */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-black font-medium">Active:</span>
              {Object.entries(filters).map(([category, values]) =>
                values.map(value => (
                  <button
                    key={`${category}-${value}`}
                    onClick={() => removeFilter(category, value)}
                    className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded-full text-sm hover:bg-gray-800 transition-colors"
                  >
                    {value}
                    <X className="w-3.5 h-3.5" />
                  </button>
                ))
              )}
              <button
                onClick={clearAllFilters}
                className="text-sm text-slate-600 hover:text-slate-900 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="py-6 border-b border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category}>
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">
                    {category === 'priceRange' ? 'Price' : category}
                  </h3>
                  <div className="space-y-2">
                    {options.map(option => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters[category].includes(option)}
                          onChange={() => handleFilterChange(category, option)}
                          className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                        />
                        <span className="ml-2 text-sm text-slate-700 group-hover:text-slate-900">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Display */}
        <div className="py-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-xl text-red-600 mb-4">Error loading products</p>
              <p className="text-slate-600">{error}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-9">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="relative aspect-[3/4] bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {!product.available && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                          <span className="bg-slate-900 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-slate-900 text-sm group-hover:underline truncate">
                          {product.name}
                        </h3>
                        <p className="font-bold text-slate-900 text-sm ml-2 whitespace-nowrap">
                          LKR {(product.price).toLocaleString('en-LK')}
                        </p>
                      </div>
                      {product.subtitle && (
                        <p className="text-xs text-slate-500 mb-2 line-clamp-2">{product.subtitle}</p>
                      )}
                      <div className="text-xs text-slate-600">
                        <span>Sizes: {product.size.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-8 gap-4">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium transition-colors ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-slate-700 font-semibold">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium transition-colors ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600 mb-4">No products match your filters</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MensPage;
