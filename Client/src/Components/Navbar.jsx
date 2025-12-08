import React, { useState, useRef } from 'react';
import CartDrawer from './CartDrawer';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Images/Logo.png';

const Navbar = () => {
  const { cart } = useCart();
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Use a more robust check for login state
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const closeTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = (key) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setActiveMegaMenu(key);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  // Expose setIsLoggedIn for Login.jsx
  window.setTrendoraLoggedIn = (val) => {
    setIsLoggedIn(val);
    localStorage.setItem('isLoggedIn', val ? 'true' : 'false');
  };

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleProfileClick = () => {
    // Always check localStorage for latest login state
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setShowProfileDropdown((prev) => !prev);
    } else {
      navigate('/login');
    }
  };

  const handleProfileBlur = (e) => {
    // Close dropdown if focus leaves the profile button or dropdown
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowProfileDropdown(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  const menuItems = {
    men: {
      title: 'MEN',
      columns: [
        {
          title: 'SHOP ALL',
          links: ['T-Shirts', 'Shirts', 'Polos', 'Shorts', 'New Arrivals', 'Best Sellers']
        },
        {
          title: 'CLOTHING',
          links: ['Tanks', 'Compressions', 'Hoodies & Jackets', 'Shorts', 'Jeans', 'Joggers & Pants', 'Underwear']
        },
        {
          title: 'COLLECTIONS',
          links: ['Premium', 'Oversize Tee', 'Essentials', 'Seamless', 'Active Wear']
        }
      ]
    },
    women: {
      title: 'WOMEN',
      columns: [
        {
          title: 'SHOP ALL',
          links: ['T-Shirts', 'Tops', 'Sports Bras', 'Leggings', 'New Arrivals', 'Best Sellers']
        },
        {
          title: 'CLOTHING',
          links: ['Tanks', 'Compressions', 'Hoodies & Jackets', 'Shorts', 'Leggings', 'Joggers & Pants', 'Underwear']
        },
        {
          title: 'COLLECTIONS',
          links: ['Premium', 'Seamless', 'Active Wear', 'Yoga Collection', 'Essentials']
        }
      ]
    },
    accessories: {
      title: 'ACCESSORIES',
      columns: [
        {
          title: 'SHOP ALL',
          links: ['Bags', 'Caps', 'Belts', 'Socks', 'Sunglasses']
        },
        {
          title: 'CATEGORIES',
          links: ['Gym Bags', 'Backpacks', 'Wallets', 'Watches', 'Jewelry']
        }
      ]
    }
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      {/* Top Bar */}
      <div className="bg-gray-600 text-white text-center py-2 px-4 text-sm">
        <p>BLACK FRIDAY SALE - UP TO 50% OFF | FREE SHIPPING ON ORDERS OVER $50</p>
      </div>

      {/* Main Navbar */}
      <div className="px-20">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <div className="flex-shrink-0 z-10 cursor-pointer">
            <a href="/">
              <img src={Logo} alt="TRENDORA" className="h-7 md:h-9" />
            </a>
          </div>

          {/* Desktop Menu - Absolute Center */}
          <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div
                key={key}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                {key === 'men' ? (
                  <Link to="/mens" className="flex items-center space-x-1 text-gray-800 hover:text-gray-600 font-bold text-lg transition-colors">
                    <span>{menu.title}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                ) : key === 'women' ? (
                  <Link to="/womens" className="flex items-center space-x-1 text-gray-800 hover:text-gray-600 font-bold text-lg transition-colors">
                    <span>{menu.title}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                ) : (
                  <button className="flex items-center space-x-1 text-gray-800 hover:text-gray-600 font-bold text-lg transition-colors">
                    <span>{menu.title}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <a href="#" className="text-gray-800 hover:text-gray-600 font-bold text-lg transition-colors">
              GIFTS
            </a>
          </div>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center space-x-6 z-10">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-5 h-5 text-gray-900" />
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const value = e.target.search.value.trim();
                  if (value) {
                    navigate(`/search?query=${encodeURIComponent(value)}`);
                  }
                }}
                className="w-full"
              >
                <input
                  name="search"
                  type="text"
                  placeholder="Search For a product..."
                  className="pl-10 pr-4 py-2 border border-gray-500 rounded-full focus:outline-none focus:border-black transition-colors text-sm"
                />
              </form>
            </div>
            <div className="relative flex items-center">
              <div className="relative" tabIndex={-1} onBlur={handleProfileBlur}>
                <button
                  className="text-gray-800 hover:text-gray-600 transition-colors rounded-full border border-black p-1 flex items-center"
                  onClick={handleProfileClick}
                  aria-haspopup="true"
                  aria-expanded={showProfileDropdown}
                  tabIndex={0}
                >
                  <User className="w-5 h-5" />
                </button>
                {/* Dropdown for Log Out only if logged in */}
                {isLoggedIn && showProfileDropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-full min-w-[8rem] max-w-[12rem] bg-gray-800 border border-transparent rounded-lg shadow-lg py-2 z-50 flex justify-center">
                    <button
                      onClick={() => { setShowProfileDropdown(false); handleLogout(); }}
                      className="w-full max-w-xs text-left px-4 py-2 bg-red-600 text-white hover:bg-red-700 font-semibold text-sm rounded"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button className="text-gray-800 hover:text-gray-600 transition-colors relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button className="text-gray-800">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-800 relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Drawer Popup */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      {/* Mega Menu Desktop */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden lg:block absolute left-0 right-0 bg-white shadow-lg border-t"
            onMouseEnter={() => handleMouseEnter(activeMegaMenu)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="py-5">
              <div className="grid grid-cols-3 gap-60 max-w-6xl mx-auto px-20">
                {menuItems[activeMegaMenu].columns.map((column, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <h3 className="font-bold text-lg mb-4 text-gray-900">{column.title}</h3>
                    <ul className="space-y-2">
                      {column.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <a href="#" className="text-gray-600 hover:text-black text-lg transition-all duration-200 block py-1 hover:underline underline-offset-2 uppercase">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div key={key} className="border-b pb-4">
                {key === 'men' ? (
                  <Link
                    to="/mens"
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900"
                  >
                    <span>{menu.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeMegaMenu === key ? 'rotate-180' : ''}`} />
                  </Link>
                ) : key === 'women' ? (
                  <Link
                    to="/womens"
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900"
                  >
                    <span>{menu.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeMegaMenu === key ? 'rotate-180' : ''}`} />
                  </Link>
                ) : (
                  <button
                    onClick={() => setActiveMegaMenu(activeMegaMenu === key ? null : key)}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900"
                  >
                    <span>{menu.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeMegaMenu === key ? 'rotate-180' : ''}`} />
                  </button>
                )}
                {activeMegaMenu === key && (
                  <div className="mt-4 space-y-4">
                    {menu.columns.map((column, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-sm mb-2 text-gray-900">{column.title}</h4>
                        <ul className="space-y-2 ml-4">
                          {column.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                              <a href="#" className="text-gray-600 text-sm hover:text-gray-900">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="#" className="block font-medium text-gray-900">
              GIFTS
            </a>
            <div className="pt-4 border-t flex items-center space-x-4">
              <div className="relative w-full" tabIndex={-1} onBlur={handleProfileBlur}>
                <button
                  className="flex items-center space-x-2 text-gray-800 w-full"
                  onClick={handleProfileClick}
                  aria-haspopup="true"
                  aria-expanded={showProfileDropdown}
                  tabIndex={0}
                >
                  <div className="rounded-full border border-black p-1">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-sm">Account</span>
                </button>
                {isLoggedIn && showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={() => { setShowProfileDropdown(false); handleLogout(); }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold text-sm"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;