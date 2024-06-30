const models = require("../models");
const logger = require("../services/logger");
const Op = require("sequelize").Op;

async function totalCount(data) {
  try {
    let queryObj = {};
    let activityQueryObj = {};
    if (data.categoryId) {
      queryObj.categoryId = data.categoryId;
    }
    const farmItems = await models.FarmItems.findAndCountAll({
      where: queryObj,
      include: [
        {
          model: models.FarmItemActivities,
        },
        {
          model: models.Category,
        },
      ],
    });
    if (data.categoryId) {
      let farmIds = farmItems.rows.map((ele) => ele.id);
      activityQueryObj.farmItemId = {
        [Op.in]: farmIds,
      };
    }
    const farmItemActivities = await models.FarmItemActivities.findAndCountAll({
      where: activityQueryObj,
    });

    let response = farmItems.rows.map((ele) => {
      let totalAmount = 0;
      totalAmount = ele.FarmItemActivities.reduce((itemSum, activity) => {
        return itemSum + parseFloat(activity.amount);
      }, 0);
      return {
        id: ele.id,
        name: ele.name,
        itemCode: ele.itemCode,
        species: ele.species,
        dateOfBirth: ele.dateOfBirth,
        healthStatus: ele.healthStatus,
        feedingSchedule: ele.feedingSchedule,
        Category: ele.Category,
        totalActivitiesAmount: totalAmount,
        farmItemActivitiesCount: Object.keys(ele.FarmItemActivities).length,
        FarmItemActivities: ele.FarmItemActivities,
      };
    });

    logger.info(`Total count records fetched successfully`);
    return {
      totalFarmItems: farmItems.rows.length,
      totalfarmItemActivities:
        farmItemActivities.rows.length || farmItemActivities.count,
      response,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  totalCount,
};
