'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FarmItems.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      }),
      FarmItems.belongsTo(models.Customer, {
        foreignKey: 'customerId'
      })
      FarmItems.hasMany(models.FarmItemActivities, {
        foreignKey: 'farmItemId'
      })
    }
  }
  FarmItems.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    itemCode: DataTypes.STRING,
    species: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    healthStatus: DataTypes.STRING,
    feedingSchedule: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FarmItems',
  });
  return FarmItems;
};