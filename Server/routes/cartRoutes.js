const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middleware/authMiddleware');

// Get user's cart
router.get('/', authenticate, cartController.getCart);
// Add or update item in cart
router.post('/item', authenticate, cartController.addOrUpdateItem);
// Remove item from cart
router.delete('/item', authenticate, cartController.removeItem);
// Clear cart
router.delete('/clear', authenticate, cartController.clearCart);

// Sync full cart from frontend
router.post('/sync', authenticate, cartController.syncCart);

module.exports = router;
