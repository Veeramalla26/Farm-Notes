const { createFarmItem, listFarmItems, editFarmItem, destroyFarmItem } = require('../controllers/farmItem');
const Joi = require('joi');
const { func } = require('joi');

const addFarmItemSchema = Joi.object({
    name: Joi.string().label('Name').required(),
    categoryId: Joi.number().label('Category Id').required()
});

const updateFarmItemSchema = Joi.object({
    name: Joi.string().label('Name').required()
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
        const result = await listFarmItems(req.customerId);
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

module.exports = {
    addFarmItem,
    getFarmItems,
    updateFarmItem,
    deleteFarmItem
}