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
    }
  }
  FarmItems.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FarmItems',
  });
  return FarmItems;
};