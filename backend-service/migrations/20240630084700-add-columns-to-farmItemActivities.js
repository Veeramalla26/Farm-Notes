'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('FarmItemActivities', 'amount', {
      type: Sequelize.DECIMAL(10,2),
      defaultValue: 0.00
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('FarmItemActivities', 'amount');
  }
};
