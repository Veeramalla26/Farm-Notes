const express = require('express');
const router = express.Router();
const { register, login, getUser, updateUser, passwordReset, listCustomers } = require('../controllers/customer')

const Joi = require('joi');

const userCustomerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const registerCustomerSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword');


const updateProfileSchema = Joi.object({
    userName: Joi.string(),
    phoneNumber: Joi.string(),
    dateOfBirth: Joi.string(),
    address: Joi.string(),
    country: Joi.string(),
    pinCode: Joi.number()
});

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword');

async function registerUser(req, res) {
    try {
        const data = req.body;
        const { error, value } = registerCustomerSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await register(data);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function loginUser(req, res) {
    try {
        const data = req.body;
        const { error, value } = userCustomerSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await login(data);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getCustomer(req, res) {
    try {
        const data = req.customerId;
        const result = await getUser(data);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function updateCustomer(req, res) {
    try {
        const data = req.body;
        const { error, value } = updateProfileSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await updateUser(data, req.customerId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function resetPassword(req, res) {
    try {
        const data = req.body;
        const { error, value } = resetPasswordSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await passwordReset(data.email, data.password, data.confirmPassword);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function customerListing(req, res) {
    try {
        const result = await listCustomers();
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

module.exports = exports = {
    registerUser,
    loginUser,
    getCustomer,
    updateCustomer,
    resetPassword,
    customerListing
};