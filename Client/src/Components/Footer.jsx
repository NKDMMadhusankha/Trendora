import React from 'react';
import { Truck, Shield, RotateCcw, TreePine, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t-2 border-black bg-black text-white" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>

      {/* Footer Links Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-1 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Locations */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase">Locations</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">STORE LOCATOR</a></li>
                <li className="text-gray-400">
                  123 Main Street,<br />
                  Colombo 01,<br />
                  Sri Lanka
                </li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase">About Us</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">FAQS</a></li>
                <li><a href="#" className="hover:text-white">SHIPPING & RETURNS</a></li>
                <li><a href="#" className="hover:text-white">ABOUT US</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">PRIVACY POLICY</a></li>
                <li><a href="#" className="hover:text-white">TERMS OF SERVICE</a></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>
                  <a href="tel:+94773605553" className="hover:text-white flex items-center gap-2">
                    <span>📞</span> +94773605553
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@trendora.com" className="hover:text-white flex items-center gap-2">
                    <span>✉️</span> hello@trendora.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Collections, Careers and Social Media */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-700">
            {/* Our Collections */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase">Our Collections</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">MEN</a></li>
                <li><a href="#" className="hover:text-white">WOMEN</a></li>
                <li><a href="#" className="hover:text-white">ACCESSORIES</a></li>
              </ul>
            </div>

            {/* Careers */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase">Careers</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">JOIN TRENDORA TEAM</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase">Follow Us</h4>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} fill="currentColor" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} fill="currentColor" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="TikTok"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;