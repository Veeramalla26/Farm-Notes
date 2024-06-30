const { createFarmItem, listFarmItems, editFarmItem, destroyFarmItem, listCategories } = require('../controllers/farmItem');
const Joi = require('joi');

const addFarmItemSchema = Joi.object({
    name: Joi.string().label('Name').required(),
    categoryId: Joi.number().label('Category Id').required(),
    itemCode: Joi.string().required(),
    species: Joi.string().allow(null),
    dateOfBirth: Joi.date().allow(null),
    healthStatus: Joi.string().allow(null),
    feedingSchedule: Joi.string().allow(null)
});

const updateFarmItemSchema = Joi.object({
    name: Joi.string().label('Name').required(),
    species: Joi.string().allow(null),
    date: Joi.date().allow(null),
    healthStatus: Joi.string().allow(null),
    feedingSchedule: Joi.string().allow(null)
});

const getFarmItemSchema = Joi.object({
    categoryId: Joi.number().allow(null)
});

async function addFarmItem (req, res) {
    try {
        const data = req.body;
        const { error, value } = addFarmItemSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await createFarmItem(data, req.customerId);
        res.send(result);
    } catch(error) {
        res.status(400);
        res.send({
            error: error.message
        })
    }
}

async function getFarmItems (req, res) {
    try {
        const data = req.query;
        if (data) {
            const { error, value } = getFarmItemSchema.validate(data);
            if (error) {
                throw new Error(error.details[0].message);
            }
        }
        const result = await listFarmItems(data, req.customerId);
        res.send(result)
    } catch (error) {
        res.status(400);
        res.send({
            error: error.message
        })
    }
}

async function updateFarmItem(req, res) {
    try {
        const { error, value } = updateFarmItemSchema.validate(req.body);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await editFarmItem(req.params.id, req.body, req.customerId);
        res.send(result);
    } catch(error) {
        res.status(400);
        res.send({
            error: error.message
        })
    }
}

async function deleteFarmItem(req, res) {
    try {
        const result = await destroyFarmItem(req.params.id);
        res.send(result);
    } catch(error) {
        res.status(400);
        res.send({
            error: error.message
        })
    }
}

async function getCategories (req, res) {
    try {
        const result = await listCategories();
        res.send(result)
    } catch (error) {
        res.status(400);
        res.send({
            error: error.message
        })
    }
}

module.exports = {
    addFarmItem,
    getFarmItems,
    updateFarmItem,
    deleteFarmItem,
    getCategories
}