'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmItemActivities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FarmItemActivities.belongsTo(models.FarmItems, {
        foreignKey: 'farmItemId'
      }),
      FarmItemActivities.belongsTo(models.Customer, {
        foreignKey: 'customerId'
      })
    }
  }
  FarmItemActivities.init({
    customerId: DataTypes.INTEGER,
    farmItemId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    age: DataTypes.FLOAT,
    healthStatus: DataTypes.STRING,
    lastFarmActivityDate: DataTypes.DATE,
    nextFarmActivityDate: DataTypes.DATE,
    feedingSchedule: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FarmItemActivities',
  });
  return FarmItemActivities;
};