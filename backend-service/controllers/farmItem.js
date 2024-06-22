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
        console.log(error);
        throw error;
    }
}

async function listFarmItems(customerId) {
    try {
        const customerExists = await models.Customer.findByPk(customerId);
        if(!customerExists) throw new Error('Customer not exists');
        const farmItems = await models.FarmItems.findAndCountAll({
            where: { customerId },
            include: [
                {
                    model: models.Category,
                    attributes: ['id', 'name']
                }
            ]
        })
        return farmItems;
    } catch(error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        throw error;
    }
}

async function listCategories() {
    try {
        const categories = await models.Category.findAll()
        return categories;
    } catch (error) {
        console.log(error);
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