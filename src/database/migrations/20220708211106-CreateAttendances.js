'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('attendances', { 
      petId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'pet_id',
        references: {
          model: 'pets',
          key: 'id',
        },
        primaryKey: true,
      },
      vetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'vet_id',
        references: {
          model: 'vets',
          key: 'id',
        },
        primaryKey: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('attendances');
  }
};