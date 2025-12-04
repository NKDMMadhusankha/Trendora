import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      name: "David James",
      role: "Fashion Enthusiast",
      text: "Trendora has completely transformed my wardrobe! The quality and style of their clothing are unmatched. I always receive compliments when wearing their pieces.",
      avatar: "DJ",
      span: "md:col-span-2"
    },
    {
      name: "Emma Robertson",
      role: "Style Blogger",
      text: "I've been shopping at Trendora for over a year now, and I can't imagine buying clothes anywhere else. Their collections are always on-trend and affordable.",
      avatar: "ER",
      span: "md:col-span-1"
    },
    {
      name: "Sarah Martinez",
      role: "Small Business Owner",
      text: "Trendora's professional wear collection is perfect for my business meetings. The fit is impeccable and the fabrics are premium quality. Highly recommend!",
      avatar: "SM",
      span: "md:col-span-1"
    },
    {
      name: "Alex Jin",
      role: "Model",
      text: "What truly sets Trendora apart is their attention to detail and exceptional customer service. Every piece feels luxurious and the shopping experience is seamless.",
      avatar: "AJ",
      span: "md:col-span-1"
    },
    {
      name: "Daniel Hannes",
      role: "Creative Director",
      text: "Trendora keeps my style fresh and modern. Their seasonal collections never disappoint. It's my go-to store for both casual and formal wear.",
      avatar: "DH",
      span: "md:col-span-1"
    },
    {
      name: "Ryan Parker",
      role: "Fashion Consultant",
      text: "With Trendora, I rarely have concerns about quality or fit. They provide excellent customer support and their return policy is hassle-free. The variety of styles suits every occasion.",
      avatar: "RP",
      span: "md:col-span-2"
    },
    {
      name: "Jennifer Lee",
      role: "Lifestyle Influencer",
      text: "We rely on Trendora for our wardrobe essentials. The perfect blend of comfort and style makes it ideal for creating versatile outfits.",
      avatar: "JL",
      span: "md:col-span-1"
    },
    {
      name: "Mark Julio",
      role: "Designer",
      text: "I truly feel confident in Trendora's clothing. Thank you for making fashion accessible and stylish! The craftsmanship is evident in every stitch.",
      avatar: "MJ",
      span: "md:col-span-1"
    },
    {
      name: "Mark Julio",
      role: "Designer",
      text: "I truly feel confident in Trendora's clothing. Thank you for making fashion accessible and stylish! The craftsmanship is evident in every stitch.",
      avatar: "MJ",
      span: "md:col-span-1"
    },
    {
      name: "Patricia Green",
      role: "Retail Manager",
      text: "Trendora seamlessly blends contemporary fashion with timeless elegance. Their clothing has become an essential part of my daily style.",
      avatar: "PG",
      span: "md:col-span-1"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen py-20 px-4" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16" 
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-400"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-400"></div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl text-black mb-4" 
            style={{ fontWeight: 'bold', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            WHAT OUT CUSTOMERS ARE SAYING
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto" 
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover why fashion lovers choose Trendora for their wardrobe essentials. 
            Read what our satisfied customers have to say about their shopping experience.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`bg-gray-200 rounded-2xl p-6 border border-gray-300 shadow-md hover:border-gray-400 hover:shadow-xl transition-all duration-300 ${testimonial.span}`}
              style={{ 
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              variants={cardVariants}
            >
              {/* Quote Icon */}
              <motion.div 
                className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <svg
                  className="w-5 h-5 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </motion.div>

              {/* Testimonial Text */}
              <p className="text-black text-sm leading-relaxed mb-6" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                {testimonial.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold text-sm" 
                  style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <h4 className="text-black font-semibold text-sm" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-xs" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}