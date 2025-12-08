// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const Product = require('../models/Product');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `products/${Date.now()}_${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('S3 Upload Error:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ imageUrl: data.Location });
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, sizes } = req.body;
    const product = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      sizes,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    // Build query based on filters
    const query = {};
    if (category) {
      query.category = category;
    }
    
    let products = [];
    
    if (search) {
      const normalizedSearch = search.trim();
      const escapedSearch = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Priority 1: Exact phrase match in name (most relevant)
      products = await Product.find({
        ...query,
        name: { $regex: escapedSearch, $options: 'i' }
      });
      
      // Priority 2: If no exact phrase match, try in description
      if (products.length === 0) {
        products = await Product.find({
          ...query,
          description: { $regex: escapedSearch, $options: 'i' }
        });
      }
    } else {
      products = await Product.find(query);
    }
    // Generate signed URLs for each product image
    const productsWithSignedUrls = products.map(product => {
      const productObj = product.toObject();
      if (productObj.imageUrl) {
        if (productObj.imageUrl.includes(process.env.AWS_S3_BUCKET)) {
          const urlParts = productObj.imageUrl.split('.com/');
          if (urlParts.length > 1) {
            const key = urlParts[1];
            productObj.imageUrl = s3.getSignedUrl('getObject', {
              Bucket: process.env.AWS_S3_BUCKET,
              Key: key,
              Expires: 3600
            });
          }
        }
      }
      return productObj;
    });
    res.json({ products: productsWithSignedUrls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};