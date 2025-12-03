import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BannerImage from '../Images/banner.jpg';

const Banner = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const rotatingTexts = [
    'Wear What Defines You',
    'Own Your Look',
    'Express Yourself',
    'Define Your Style',
    'Show Your Vibe',
    'Be Bold, Be You',
    'Wear Your Confidence',
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
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] bg-black overflow-hidden">
      {/* Left side - Black background (visible through the clipped image) */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Text Content on Left Side */}
      <div className="absolute left-0 top-0 h-full w-[55%] flex items-start pt-40 md:pt-48 lg:pt-56 px-40 z-10">
        <div className="max-w-2xl">
          <h1 className="text-white font-bold leading-tight">
            <span className="text-4xl md:text-5xl lg:text-6xl block">STEP UP YOUR STYLE -  </span>
            <div className="text-4xl md:text-5xl lg:text-6xl block mt-2 h-24 md:h-28 lg:h-32">
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
          <button className="mt-1 bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Right side - Image with clip-path */}
      <div 
        className="absolute inset-0 bg-cover bg-right ml-96"
        style={{
          backgroundImage: `url(${BannerImage})`,
          clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 0% 100%)'
        }}
      ></div>
    </div>
  );
};

export default Banner;
