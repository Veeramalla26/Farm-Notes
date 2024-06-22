'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FarmItemActivities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      farmItemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'FarmItems',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      species: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.FLOAT
      },
      healthStatus: {
        type: Sequelize.STRING
      },
      lastFarmActivityDate: {
        type: Sequelize.DATE
      },
      nextFarmActivityDate: {
        type: Sequelize.DATE
      },
      feedingSchedule: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FarmItemActivities');
  }
};