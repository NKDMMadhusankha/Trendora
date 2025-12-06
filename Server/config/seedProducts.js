require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  // Men's Products
  {
    name: 'Classic Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt perfect for everyday wear. Breathable fabric with a relaxed fit.',
    price: 1999,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Slim Fit Denim Jeans',
    description: 'Modern slim fit jeans with stretch denim for comfort and style. Classic 5-pocket design.',
    price: 4999,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Casual Button-Down Shirt',
    description: 'Versatile button-down shirt suitable for both casual and semi-formal occasions.',
    price: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Premium Leather Jacket',
    description: 'Genuine leather jacket with classic biker style. Durable and stylish for all seasons.',
    price: 12999,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category: 'Men',
    sizes: ['M', 'L', 'XL']
  },
  {
    name: 'Comfortable Hoodie',
    description: 'Soft fleece hoodie with adjustable drawstring hood. Perfect for layering.',
    price: 3999,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Formal Dress Pants',
    description: 'Tailored dress pants with a modern fit. Ideal for office and formal events.',
    price: 4499,
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Athletic Joggers',
    description: 'Lightweight joggers with elastic waistband. Perfect for workouts or casual wear.',
    price: 2999,
    imageUrl: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Polo Shirt',
    description: 'Classic polo shirt with collar and button placket. Smart casual style.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Bomber Jacket',
    description: 'Trendy bomber jacket with ribbed cuffs and hem. Lightweight and stylish.',
    price: 6999,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
    category: 'Men',
    sizes: ['M', 'L', 'XL']
  },
  {
    name: 'Cargo Shorts',
    description: 'Practical cargo shorts with multiple pockets. Perfect for summer adventures.',
    price: 2799,
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'V-Neck Sweater',
    description: 'Soft knit sweater with V-neck design. Great for layering in cooler weather.',
    price: 3799,
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Track Jacket',
    description: 'Sporty track jacket with zip closure. Ideal for athletic and casual wear.',
    price: 4299,
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500',
    category: 'Men',
    sizes: ['M', 'L', 'XL']
  },

  // Women's Products
  {
    name: 'Floral Summer Dress',
    description: 'Beautiful floral print dress perfect for summer days. Lightweight and breathable fabric.',
    price: 3999,
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Elegant Blouse',
    description: 'Sophisticated blouse with delicate details. Perfect for office or evening wear.',
    price: 2999,
    imageUrl: 'https://images.unsplash.com/photo-1564257577154-75f0d06b881e?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'High-Waisted Skinny Jeans',
    description: 'Flattering high-waisted jeans with stretch denim. Comfortable all-day wear.',
    price: 4499,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Knit Cardigan',
    description: 'Cozy knit cardigan with button closure. Perfect for layering in any season.',
    price: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Maxi Skirt',
    description: 'Flowing maxi skirt with elastic waistband. Elegant and comfortable.',
    price: 3299,
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Denim Jacket',
    description: 'Classic denim jacket with button closure. Timeless style for any outfit.',
    price: 5999,
    imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Casual T-Shirt',
    description: 'Soft cotton t-shirt with a relaxed fit. Essential wardrobe staple.',
    price: 1799,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Evening Gown',
    description: 'Stunning evening gown with elegant draping. Perfect for special occasions.',
    price: 8999,
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L']
  },
  {
    name: 'Yoga Pants',
    description: 'Stretchy yoga pants with moisture-wicking fabric. Ideal for workouts or leisure.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Leather Handbag',
    description: 'Premium leather handbag with adjustable strap. Stylish and functional.',
    price: 7999,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
    category: 'Women',
    sizes: ['M']
  },
  {
    name: 'Wrap Dress',
    description: 'Flattering wrap dress with tie waist. Versatile for work or weekend.',
    price: 4299,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Cashmere Sweater',
    description: 'Luxurious cashmere sweater with crew neck. Soft and warm for chilly days.',
    price: 9999,
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L']
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products!`);
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
