const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCustomer, updateCustomer, resetPassword, customerListing } = require('./customer');
const { validateToken, checkRole } = require('../controllers/customer');
const { addFarmItem, getFarmItems, updateFarmItem, deleteFarmItem, getCategories } = require('./farmItem');
const { addFarmItemActivities, getFarmItemActivities, updateFarmItemActivities, deleteFarmItemActivities } = require('./farmItemActivities');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateToken, getCustomer);
router.put('/profile', validateToken, updateCustomer);
router.post('/reset-password', resetPassword);

router.get('/categories', validateToken, getCategories)

router.post('/farmItems', validateToken, addFarmItem);
router.get('/farmItems', validateToken, getFarmItems);
router.put('/farmItems/:id', validateToken, updateFarmItem);
router.delete('/farmItems/:id', validateToken, deleteFarmItem)

router.post('/farmItemActivities', validateToken, addFarmItemActivities);
router.get('/farmItemActivities', validateToken, getFarmItemActivities);
router.put('/farmItemActivities/:id', validateToken, updateFarmItemActivities);
router.delete('/farmItemActivities/:id', validateToken, deleteFarmItemActivities)

router.get('/users', validateToken, checkRole(['Admin']), customerListing);

module.exports = router;