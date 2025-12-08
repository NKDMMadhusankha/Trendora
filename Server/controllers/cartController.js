const Cart = require('../models/Cart');

// Get cart for a user
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      // Return empty cart if none exists
      return res.json({ cart: { items: [] } });
    }
    
    // Filter out items with null products (deleted products)
    const originalLength = cart.items.length;
    cart.items = cart.items.filter(item => item.product !== null);
    
    // If items were removed, save the updated cart
    if (cart.items.length < originalLength) {
      console.log(`Cleaned ${originalLength - cart.items.length} invalid items from cart for user ${userId}`);
      await cart.save();
    }
    
    res.json({ cart });
  } catch (err) {
    console.error('Get cart error:', err);
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
    
    // Validate items array
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid items format' });
    }
    
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    
    // Filter and map valid items
    cart.items = items
      .filter(item => {
        // Ensure item has valid product reference
        if (!item || !item.product) {
          console.warn('Skipping item without product:', item);
          return false;
        }
        const productId = item.product._id || item.product;
        if (!productId) {
          console.warn('Skipping item with invalid product ID:', item);
          return false;
        }
        return true;
      })
      .map(item => ({
        product: item.product._id || item.product,
        quantity: item.quantity || 1,
        size: item.size
      }));
    
    await cart.save();
    res.json({ cart });
  } catch (err) {
    console.error('Cart sync error:', err);
    res.status(500).json({ error: 'Failed to sync cart', details: err.message });
  }
};
