const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCustomer, updateCustomer, resetPassword, customerListing } = require('./customer');
const { validateToken, checkRole } = require('../controllers/customer');
const { addFarmItem, getFarmItems, updateFarmItem, deleteFarmItem, getCategories } = require('./farmItem');
const { addFarmItemActivities, getFarmItemActivities, updateFarmItemActivities, deleteFarmItemActivities } = require('./farmItemActivities');
const { getTotalCount } = require('./admin')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateToken, getCustomer);
router.put('/profile', validateToken, updateCustomer);
router.post('/reset-password', resetPassword);

router.get('/categories', validateToken, getCategories)

router.post('/farmItems', validateToken, checkRole(['User']), addFarmItem);
router.get('/farmItems', validateToken, getFarmItems);
router.put('/farmItems/:id', validateToken, checkRole(['User']), updateFarmItem);
router.delete('/farmItems/:id', validateToken, checkRole(['User']), deleteFarmItem);

router.post('/farmItemActivities', validateToken, checkRole(['User']), addFarmItemActivities);
router.get('/farmItemActivities', validateToken, getFarmItemActivities);
router.put('/farmItemActivities/:id', validateToken, checkRole(['User']), updateFarmItemActivities);
router.delete('/farmItemActivities/:id', validateToken, checkRole(['User']), deleteFarmItemActivities);

router.get('/users', validateToken, customerListing);
router.get('/totalCount', validateToken, getTotalCount)

module.exports = router;