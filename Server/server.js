require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const authController = require('./controllers/authController');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// MongoDB connection
console.log('MongoDB URL:', process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);
app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});