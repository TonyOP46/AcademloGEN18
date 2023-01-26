//Seeder creado

//noten que es igual a una migración!

'use strict';
const { Op } = require("sequelize");
const {v4: uuid4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('countries', [
        {
          name: "Colombia",
          unique: true,
          allowNull: false,
          type: Sequelize.TEXT,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], { transaction })

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('countries', null, { 
      }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }
};