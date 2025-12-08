exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate('items.product').sort({ orderDate: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
};
const Order = require('../models/Order');
const User = require('../models/User');
const sendOrderConfirmationEmail = require('../utils/sendOrderConfirmationEmail');

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

    // Refetch order to ensure orderNumber is present
    const savedOrder = await Order.findById(order._id).populate('items.product');

    // Fetch user email
    const user = await User.findById(userId);
    if (user && user.email) {
      await sendOrderConfirmationEmail({
        to: user.email,
        order: savedOrder,
      });
    }

    res.status(201).json({ message: 'Order placed successfully!', order: savedOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order.' });
  }
};
