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
    const { category, search, page = 1, limit = 10 } = req.query;
    const query = {};
    if (category) query.category = category;

    let mongoQuery;
    if (search) {
      const normalizedSearch = search.trim();
      const escapedSearch = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      mongoQuery = Product.find({
        ...query,
        $or: [
          { name: { $regex: escapedSearch, $options: 'i' } },
          { description: { $regex: escapedSearch, $options: 'i' } }
        ]
      });
    } else {
      mongoQuery = Product.find(query);
    }

    const total = await Product.countDocuments(mongoQuery.getQuery());
    const products = await mongoQuery
      .skip((page - 1) * limit)
      .limit(Number(limit));

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
    res.json({
      products: productsWithSignedUrls,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });
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