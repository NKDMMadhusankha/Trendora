const Cart = require('../models/Cart');

// Get cart for a user
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get cart' });
  }
};

// Add or update item in cart
exports.addOrUpdateItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity, size } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    // Check if item exists
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && item.size === size
    );
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ product: productId, quantity, size });
    }
    await cart.save();
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add/update cart item' });
  }
};

// Remove item from cart
exports.removeItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = cart.items.filter(item => !(item.product.toString() === productId && item.size === size));
    await cart.save();
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = [];
    await cart.save();
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};

// Sync full cart from frontend
exports.syncCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    cart.items = items.map(item => ({
      product: item.product._id || item.product,
      quantity: item.quantity,
      size: item.size
    }));
    await cart.save();
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to sync cart' });
  }
};
