const { createFarmItemActivities, listFarmItemActivities, editFarmItemActivities, destroyFarmItemActivities } = require('../controllers/farmItemActivities');
const Joi = require('joi');

const addFarmItemActivitySchema = Joi.object({
    name: Joi.string().label('Name').required(),
    farmItemId: Joi.number().label('Farm Item Id').required(),
    lastFarmActivityDate: Joi.date().allow(null, ''),
    nextFarmActivityDate: Joi.date().required(),
    notes: Joi.string().allow(null, ''),
    amount: Joi.number().required()
});

const updateFarmItemActivitySchema = Joi.object({
    name: Joi.string().label('Name'),
    lastFarmActivityDate: Joi.date().allow(null),
    nextFarmActivityDate: Joi.date().required(),
    notes: Joi.string(),
    amount: Joi.number().required()
});

const getFarmItemActivitySchema = Joi.object({
    categoryId: Joi.number().allow(null)
});

async function addFarmItemActivities(req, res) {
    try {
        const data = req.body;
        const { error, value } = addFarmItemActivitySchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await createFarmItemActivities(data, req.customerId);
        res.send(result);
    } catch (error) {
        res.status(400);
        res.send({
            error: error.message
        })
    }
}


async function getFarmItemActivities(req, res) {
    try {
        const data = req.query;
        if (data) {
            const { error, value } = getFarmItemActivitySchema.validate(data);
            if (error) {
                throw new Error(error.details[0].message);
            }
        }
        const result = await listFarmItemActivities(data, req.customerId);
        res.send(result);
    } catch (error) {
        res.status(400);
        res.send({
            error: error.message
        })
    }
}

async function updateFarmItemActivities(req, res) {
    try {
        const data = req.body;
        const { error, value } = updateFarmItemActivitySchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await editFarmItemActivities(req.params.id, data, req.customerId);
        res.send(result);
    } catch (error) {
        res.status(400);
        res.send({
            error: error.message
        })
    }
}

async function deleteFarmItemActivities(req, res) {
    try {
        const result = await destroyFarmItemActivities(req.params.id);
        res.send(result);
    } catch(error) {
        res.status(400);
        res.send({
            error: error.message
        })
    }
}

module.exports = {
    addFarmItemActivities,
    getFarmItemActivities,
    updateFarmItemActivities,
    deleteFarmItemActivities
}