require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const AWS = require('aws-sdk');
const https = require('https');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to download image from URL
const downloadImage = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    });
  });
};

// Function to upload image to S3
const uploadToS3 = async (imageBuffer, productId) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `products/${productId}_${Date.now()}.jpg`,
    Body: imageBuffer,
    ContentType: 'image/jpeg',
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) reject(err);
      else resolve(data.Location);
    });
  });
};

// Main function
const uploadAllImages = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get all products with external URLs (Unsplash)
    const products = await Product.find({
      imageUrl: { $regex: 'unsplash.com', $options: 'i' }
    });

    console.log(`Found ${products.length} products with Unsplash images`);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`\n[${i + 1}/${products.length}] Processing: ${product.name}`);
      
      try {
        // Download image from Unsplash
        console.log('  Downloading image...');
        const imageBuffer = await downloadImage(product.imageUrl);
        
        // Upload to S3
        console.log('  Uploading to S3...');
        const s3Url = await uploadToS3(imageBuffer, product._id);
        
        // Update product with new S3 URL
        product.imageUrl = s3Url;
        await product.save();
        
        console.log(`  ✓ Success! New URL: ${s3Url}`);
      } catch (error) {
        console.error(`  ✗ Error processing ${product.name}:`, error.message);
      }
    }

    console.log('\n✓ All images uploaded to S3!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

uploadAllImages();
