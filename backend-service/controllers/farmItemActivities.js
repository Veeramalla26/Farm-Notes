const { func } = require('joi');
const models = require('../models');

async function createFarmItemActivities(data, customerId) {
    try {
        const customerExists = await models.Customer.findByPk(customerId);
        if(!customerExists) throw new Error('Customer not exists');
        const farmItemExists = await models.FarmItems.findByPk(data.farmItemId);
        if(!farmItemExists) throw new Error('Category not found');
        const farmItemActivityExists = await models.FarmItemActivities.findOne({where: { farmItemId: data.farmItemId, name: data.name }});
        if(farmItemActivityExists) throw new Error('Farm Item Activity already exists');
        const farmItemActivity = await models.FarmItemActivities.create({
            ...data,
            customerId
        });
        return farmItemActivity;
    } catch(error) {
        console.log(error);
        throw error;
    }
}


async function listFarmItemActivities(customerId) {
    try {
        const customerExists = await models.Customer.findByPk(customerId);
        if(!customerExists) throw new Error('Customer not exists');
        const farmItemActivities = await models.FarmItemActivities.findAndCountAll({
            where: { customerId },
            include: [
                {
                    model: models.FarmItems,
                    attributes: ['id', 'name']
                }
            ]
        })
        return farmItemActivities;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function editFarmItemActivities(farmItemActivityId, data, customerId) {
    try {
        const customerExists = await models.Customer.findByPk(customerId);
        if(!customerExists) throw new Error('Customer not exists');
        const farmItemActivityExists = await models.FarmItemActivities.findOne({where: {id: farmItemActivityId}});
        if(!farmItemActivityExists) throw new Error('Farm Item Activity not exists');
        await models.FarmItemActivities.update(data, { where: { id: farmItemActivityId } })
        return {
            farmItemActivityId,
            ...data
        }
    } catch(error) {
        console.log(error);
        throw error;
    }
}

async function destroyFarmItemActivities(farmItemActivityId) {
    try {
        const farmItemActivityExists = await models.FarmItemActivities.findOne({where: {id: farmItemActivityId}});
        if(!farmItemActivityExists) throw new Error('Farm Item Activity not exists');
        await models.FarmItemActivities.destroy({ where: {id: farmItemActivityId }});
        return {
            id: farmItemActivityId
        }
    } catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createFarmItemActivities,
    listFarmItemActivities,
    editFarmItemActivities,
    destroyFarmItemActivities
}