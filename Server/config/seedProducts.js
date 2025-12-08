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
  {
    name: 'Graphic Print Tee',
    description: 'Trendy graphic print t-shirt for casual outings.',
    price: 2199,
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Linen Shorts',
    description: 'Lightweight linen shorts for summer comfort.',
    price: 2599,
    imageUrl: 'https://images.unsplash.com/photo-1591271300850-6ca7f3b93089?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Sports Tank Top',
    description: 'Moisture-wicking tank top for workouts.',
    price: 1899,
    imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Wool Overcoat',
    description: 'Elegant wool overcoat for formal occasions.',
    price: 15999,
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500',
    category: 'Men',
    sizes: ['M', 'L', 'XL']
  },
  {
    name: 'Printed Swim Shorts',
    description: 'Colorful swim shorts for beach days.',
    price: 2299,
    imageUrl: 'https://images.unsplash.com/photo-1519368358672-25b03afee3bf?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Thermal Long Sleeve',
    description: 'Warm thermal shirt for cold weather activities.',
    price: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Cotton Chinos',
    description: 'Classic cotton chinos for smart casual looks.',
    price: 3999,
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Plaid Flannel Shirt',
    description: 'Classic plaid flannel shirt for casual wear.',
    price: 3199,
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
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
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500', // Updated to a valid Unsplash blouse image
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
  },
  {
    name: 'Boho Midi Dress',
    description: 'Bohemian style midi dress with floral patterns.',
    price: 4599,
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Ruffle Sleeve Top',
    description: 'Chic ruffle sleeve top for a feminine look.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Wide Leg Trousers',
    description: 'Elegant wide leg trousers for office or casual wear.',
    price: 3999,
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Denim Skirt',
    description: 'Classic denim skirt with button front.',
    price: 2999,
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Peplum Blouse',
    description: 'Stylish peplum blouse for a flattering silhouette.',
    price: 2799,
    imageUrl: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Faux Fur Vest',
    description: 'Trendy faux fur vest for layering.',
    price: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Printed Palazzo Pants',
    description: 'Comfortable palazzo pants with vibrant prints.',
    price: 3199,
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Sleeveless Maxi Dress',
    description: 'Elegant sleeveless maxi dress for summer.',
    price: 4299,
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },

  // Kids Products
  {
    name: 'Kids Cotton T-Shirt',
    description: 'Soft and comfortable cotton t-shirt for everyday wear.',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Denim Jeans',
    description: 'Durable denim jeans with adjustable waist for growing kids.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1606841466616-795c2c8dec72?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Hoodie',
    description: 'Cozy fleece hoodie to keep your child warm.',
    price: 2299,
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Shorts',
    description: 'Comfortable shorts perfect for play and sports.',
    price: 1499,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1691367782367-2bd37f646abc?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Dress',
    description: 'Pretty dress for special occasions and parties.',
    price: 2999,
    imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Joggers',
    description: 'Athletic joggers for active kids.',
    price: 1899,
    imageUrl: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Polo Shirt',
    description: 'Classic polo shirt for a smart casual look.',
    price: 1699,
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Winter Jacket',
    description: 'Warm winter jacket with hood and pockets.',
    price: 4499,
    imageUrl: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Leggings',
    description: 'Stretchy and comfortable leggings for all-day wear.',
    price: 1399,
    imageUrl: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Graphic Tee',
    description: 'Fun graphic t-shirt with colorful prints.',
    price: 1499,
    imageUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Tracksuit',
    description: 'Complete tracksuit set for sports and leisure.',
    price: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Rain Jacket',
    description: 'Waterproof jacket to keep dry on rainy days.',
    price: 2799,
    imageUrl: 'https://images.unsplash.com/photo-1558140275-6b7b7bf2cfa1?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids School Uniform Shirt',
    description: 'Crisp white shirt perfect for school.',
    price: 1599,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1663126441273-07d4d172c41d?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Swim Shorts',
    description: 'Quick-dry swim shorts for beach and pool.',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Party Dress',
    description: 'Elegant party dress for special celebrations.',
    price: 3799,
    imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Cargo Pants',
    description: 'Practical cargo pants with multiple pockets.',
    price: 2199,
    imageUrl: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Sports Jersey',
    description: 'Breathable sports jersey for active play.',
    price: 1799,
    imageUrl: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Sweater',
    description: 'Warm knit sweater for cooler weather.',
    price: 2599,
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Skirt',
    description: 'Cute and comfortable skirt for everyday wear.',
    price: 1699,
    imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Pyjama Set',
    description: 'Soft and cozy pyjama set for bedtime.',
    price: 2299,
    imageUrl: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=500',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
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
