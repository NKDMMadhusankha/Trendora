const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, totalPrice, orderDate } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items in order.' });
    }
    const order = new Order({
      user: userId,
      items: items.map(item => ({
        product: item.product._id,
        size: item.size,
        quantity: item.quantity,
      })),
      totalPrice,
      orderDate: orderDate || Date.now(),
    });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully!', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order.' });
  }
};
