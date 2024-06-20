const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCustomer, updateCustomer, resetPassword, customerListing } = require('./customer')
const { validateToken, checkRole } = require('../controllers/customer')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateToken, getCustomer);
router.put('/profile', validateToken, updateCustomer);
router.post('/reset-password', resetPassword);

router.get('/users', validateToken, checkRole(['Admin']), customerListing);

module.exports = router;