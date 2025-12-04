const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
// Registration UI handled by frontend; no GET /register route
router.post('/register', authController.postRegister);

module.exports = router;