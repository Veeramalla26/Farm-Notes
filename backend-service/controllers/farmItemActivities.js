const models = require('../models');
const Op = require('sequelize').Op;

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
        logger.error(error);
        throw error;
    }
}


async function listFarmItemActivities(data, customerId) {
    try {
        const customerExists = await models.Customer.findByPk(customerId);
        if(!customerExists) throw new Error('Customer not exists');
        let queryObj = { customerId: customerId }
        if (data.categoryId) {
            farmItems = await models.FarmItems.findAll({
                attributes: ['id'],
                where: { categoryId: data.categoryId }
            })
            farmItems = farmItems.map(ele => ele.id)
            queryObj = {
                ...queryObj,
                farmItemId: { [Op.in]: farmItems }
            }
        }
        const farmItemActivities = await models.FarmItemActivities.findAndCountAll({
            where: queryObj,
            include: [
                {
                    model: models.FarmItems,
                    include: [
                        {
                            model: models.Category,
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        })
        let response = farmItemActivities.rows.map(ele => {
            return ({
                id: ele.id,
                name: ele.name,
                amount: ele.amount,
                lastFarmActivityDate: ele.lastFarmActivityDate,
                nextFarmActivityDate: ele.nextFarmActivityDate,
                notes: ele.notes,
                FarmItem: ele.FarmItem,
                Category: ele.FarmItem.Category
            })

        })
        return {
            count: farmItemActivities.count,
            response
        };
    } catch (error) {
        logger.error(error);
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
        logger.error(error);
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
        logger.error(error);
        throw error;
    }
}

module.exports = {
    createFarmItemActivities,
    listFarmItemActivities,
    editFarmItemActivities,
    destroyFarmItemActivities
}