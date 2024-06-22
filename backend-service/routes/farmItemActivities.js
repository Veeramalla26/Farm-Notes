const { createFarmItemActivities, listFarmItemActivities, editFarmItemActivities, destroyFarmItemActivities } = require('../controllers/farmItemActivities');
const Joi = require('joi');

const addFarmItemActivitySchema = Joi.object({
    name: Joi.string().label('Name').required(),
    farmItemId: Joi.number().label('Farm Item Id').required(),
    species: Joi.string(),
    age: Joi.number().required(),
    healthStatus: Joi.string(),
    lastFarmActivityDate: Joi.date(),
    nextFarmActivityDate: Joi.date(),
    feedingSchedule: Joi.string(),
    notes: Joi.string()
});

const updateFarmItemActivitySchema = Joi.object({
    name: Joi.string().label('Name'),
    species: Joi.string(),
    age: Joi.number().required(),
    healthStatus: Joi.string(),
    lastFarmActivityDate: Joi.date(),
    nextFarmActivityDate: Joi.date(),
    feedingSchedule: Joi.string(),
    notes: Joi.string()
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
        const result = await listFarmItemActivities(req.customerId);
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