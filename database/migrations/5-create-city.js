//migration de users creada por sequelize-cli y editada por nosotros
'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('cities', {

        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER  // Puede ser Integer o BigInt -> BigInt es mejor
        },
        name: {
          unique: true,
          allowNull: false,
          type: Sequelize.TEXT
        },
        state_id: {
          type: Sequelize.INTEGER,
          allowNull: false,

          foreigKey: true,
          references: {
            model: 'states',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at' // --> Asegurense de establecer el campo en snake_case aquí
          // o usando created_at en vez de createdAt en el Key
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
        }
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('cities', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}



