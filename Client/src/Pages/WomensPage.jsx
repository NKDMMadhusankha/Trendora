import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const WomensPage = () => {
  const [filters, setFilters] = useState({
    availability: [],
    priceRange: [],
    size: [],
    gender: [],
    fit: [],
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Sample product data for women's wear
  const products = [
    {
      id: 1,
      name: 'Floral Summer Dress',
      subtitle: 'Pastel Pink',
      price: 4850,
      colors: 3,
      fit: 'Fitted',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      gender: 'Women',
      available: true,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop'
    },
    {
      id: 2,
      name: 'Classic Denim Jacket',
      price: 5950,
      colors: 2,
      fit: 'Regular',
      size: ['S', 'M', 'L', 'XL'],
      gender: 'Women',
      available: true,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop'
    },
    {
      id: 3,
      name: 'Elegant Maxi Dress',
      price: 6990,
      colors: 5,
      fit: 'Oversize',
      size: ['S', 'M', 'L', 'XL'],
      gender: 'Women',
      available: false,
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop'
    },
    {
      id: 4,
      name: 'Casual Crop Top',
      subtitle: 'Cotton Blend',
      price: 2950,
      colors: 8,
      fit: 'Fitted',
      size: ['XS', 'S', 'M', 'L'],
      gender: 'Women',
      available: true,
      image: 'https://images.unsplash.com/photo-1564257577-47f1b7fa4bce?w=400&h=500&fit=crop'
    },
    {
      id: 5,
      name: 'Wide Leg Palazzo Pants',
      price: 4200,
      colors: 6,
      fit: 'Regular',
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      gender: 'Women',
      available: true,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop'
    },
    {
      id: 6,
      name: 'Chiffon Evening Blouse',
      price: 3800,
      colors: 4,
      fit: 'Regular',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      gender: 'Women',
      available: true,
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=500&fit=crop'
    },
    {
      id: 7,
      name: 'Bohemian Wrap Skirt',
      price: 3500,
      colors: 7,
      fit: 'Regular',
      size: ['S', 'M', 'L', 'XL'],
      gender: 'Women',
      available: true,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop'
    },
    {
      id: 8,
      name: 'Satin Camisole Top',
      subtitle: 'Premium Silk',
      price: 4500,
      colors: 5,
      fit: 'Fitted',
      size: ['XS', 'S', 'M', 'L'],
      gender: 'Women',
      available: true,
      image: 'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=400&h=500&fit=crop'
    }
  ];

  const filterOptions = {
    availability: ['In Stock', 'Sold Out'],
    priceRange: ['Under LKR 3,000', 'LKR 3,000 - LKR 5,000', 'Over LKR 5,000'],
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    gender: ['Women', 'Unisex'],
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
          if (range === 'Under LKR 3,000' && product.price < 3000) return true;
          if (range === 'LKR 3,000 - LKR 5,000' && product.price >= 3000 && product.price <= 5000) return true;
          if (range === 'Over LKR 5,000' && product.price > 5000) return true;
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
        <div className="max-w-full mx-auto px-20 py-12 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6 text-slate-300">
            <span className="hover:text-white cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-white cursor-pointer transition-colors">Collections</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Women's Wear</span>
          </nav>
          <h1 className="text-5xl font-bold mb-2">Women's Wear</h1>
          <p className="text-slate-300 text-lg">Explore our elegant collection</p>
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
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-9">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
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
                        {product.price.toLocaleString()} LKR
                      </p>
                    </div>
                    {product.subtitle && (
                      <p className="text-xs text-slate-500 mb-2">{product.subtitle}</p>
                    )}
                    <div className="text-xs text-slate-600">
                      <span>{product.fit}</span>
                      <span className="mx-1">•</span>
                      <span>{product.colors} colors</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

export default WomensPage;
