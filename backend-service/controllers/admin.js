const models = require('../models');
const logger = require('../services/logger');
const Op = require('sequelize').Op;

async function totalCount(data) {
    try {
        let queryObj = {}
        let activityQueryObj = {}
        if(data.categoryId) {
            queryObj.categoryId = data.categoryId
        }
        const farmItems = await models.FarmItems.findAndCountAll({
            where: queryObj,
            include: [
                {
                    model: models.FarmItemActivities
                }
            ]
        })
        if(data.categoryId) {
            let farmIds = farmItems.rows.map(ele => ele.id)
            activityQueryObj.farmItemId = {
                [Op.in]: farmIds
            }
        }
        const farmItemActivities = await models.FarmItemActivities.findAndCountAll({
            where: activityQueryObj
        })
        const response = farmItems.rows.reduce((acc, item) => {
            let name = item.name
            if (!acc[name]) {
              acc[name] = 0
            }
            acc[name] = Object.keys(item.FarmItemActivities).length;
            // logger.info(`Data fetched category wise successfuly`);
            return acc;
          }, {});

          return {
            totalFarmItems: farmItems.rows.length,
            totalfarmItemActivities: farmItemActivities.rows.length || farmItemActivities.count,
            response
          }
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

module.exports = {
    totalCount
}