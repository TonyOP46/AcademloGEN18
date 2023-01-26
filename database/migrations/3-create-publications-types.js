//migration de users creada por sequelize-cli y editada por nosotros
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('publication_types', {
        //elegir si usan UUID o Serial
        id: { // usando Serial
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT  // Puede ser Integer o BigInt -> BigInt es mejor
        },
        name: {
          unique: true,
          allowNull: false,
          type: Sequelize.TEXT
        },
        description: {
          type: Sequelize.TEXT
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
      await queryInterface.dropTable('publication_types', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};