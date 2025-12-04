import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BannerImage from '../Images/banner.jpg';

const Banner = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const rotatingTexts = [
    'Own Your Look',
    'Express Yourself',
    'Define Your Style',
    'Show Your Vibe',
    'Be Bold, Be You',
    'Dress to Impress',
    'Unleash Your Style',
    'Make It Yours',
    'Style Without Limits'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[610px] md:h-[710px] lg:h-[810px] bg-black overflow-hidden"
    >
      {/* Left side - Black background (visible through the clipped image) */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Text Content on Left Side */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-0 top-0 h-full w-[55%] flex items-start pt-44 md:pt-52 lg:pt-72 px-20 z-10"
      >
        <div className="max-w-2xl">
          <h1 className="text-white font-bold leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <span className="text-3xl md:text-4xl lg:text-5xl block">STEP UP YOUR STYLE -  </span>
            <div className="text-3xl md:text-4xl lg:text-5xl block mt-2 h-24 md:h-28 lg:h-32">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="block"
                >
                  {rotatingTexts[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-1 bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors flex items-center gap-2" 
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
      
      {/* Right side - Image with clip-path */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute inset-0 bg-cover bg-right ml-96"
        style={{
          backgroundImage: `url(${BannerImage})`,
          clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 0% 100%)'
        }}
      ></motion.div>
    </motion.div>
  );
};

export default Banner;
