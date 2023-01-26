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
      await queryInterface.bulkInsert('roles', [
        {
          name: 'public',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'admin',
          created_at: new Date(),
          updated_at: new Date()
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
      await queryInterface.bulkDelete('roles', {
        name: {
          [Op.or]: ['admin','public',]
        } 
      }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }
};
