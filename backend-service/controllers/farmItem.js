const models = require('../models');

async function createFarmItem(data, customerId) {
    try {
        const customerExists = await models.Customer.findByPk(customerId);
        if(!customerExists) throw new Error('Customer not exists');
        const categoryExists = await models.Category.findByPk(data.categoryId);
        if(!categoryExists) throw new Error('Category not found');
        const farmItemExists = await models.FarmItems.findOne({where: {name:data.name, categoryId: data.categoryId}});
        if(farmItemExists) throw new Error('Farm Item already exists');
        const farmItem = await models.FarmItems.create({
            ...data,
            customerId
        });
        return farmItem;
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function listFarmItems(data, customerId) {
    try {
        let queryObj = { customerId: customerId }
        const customerExists = await models.Customer.findByPk(customerId);
        if(!customerExists) throw new Error('Customer not exists');
        if (data.categoryId) {
            const categoryExists = await models.Category.findByPk(data.categoryId);
            if(!categoryExists) throw new Error('Category not found');
            queryObj.categoryId = data.categoryId
        }
        const farmItems = await models.FarmItems.findAndCountAll({
            where: queryObj,
            include: [
                {
                    model: models.Category,
                    attributes: ['id', 'name']
                },
                {
                    model: models.FarmItemActivities
                }
            ]
        })
        let response = farmItems.rows.map(ele => {
            let totalAmount = 0;
            totalAmount = ele.FarmItemActivities.reduce((itemSum, activity) => {
                return itemSum + parseFloat(activity.amount);
            }, 0);
        
            return ({
                id: ele.id,
                name: ele.name,
                itemCode: ele.itemCode,
                species: ele.species,
                dateOfBirth: ele.dateOfBirth,
                healthStatus: ele.healthStatus,
                feedingSchedule: ele.feedingSchedule,
                Category: ele.Category,
                totalActivitiesAmount: totalAmount,
                FarmItemActivities: ele.FarmItemActivities
            })

        })
        return {
            count: farmItems.count,
            rows: response,
          };
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function editFarmItem(farmItemId, data, customerId) {
    try {
        const customerExists = await models.Customer.findByPk(customerId);
        if(!customerExists) throw new Error('Customer not exists');
        const farmItemExists = await models.FarmItems.findOne({where: {id: farmItemId}});
        if(!farmItemExists) throw new Error('Farm Item not exists');
        await models.FarmItems.update(data, { where: { id: farmItemId } })
        return {
            farmItemId,
            name: data.name
        }
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function destroyFarmItem(farmItemId) {
    try {
        const farmItemExists = await models.FarmItems.findOne({where: {id: farmItemId}});
        if(!farmItemExists) throw new Error('Farm Item not exists');
        await models.FarmItems.destroy({ where: {id: farmItemId }});
        return {
            id: farmItemId
        }
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function listCategories() {
    try {
        const categories = await models.Category.findAll()
        return categories;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    createFarmItem,
    listFarmItems,
    editFarmItem,
    destroyFarmItem,
    listCategories
}