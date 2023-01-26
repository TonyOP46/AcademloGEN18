'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('profiles', {

        id: {
          allowNull: false,
          defaultValue: Sequelize.UUID,
          primaryKey: true,
          type: Sequelize.UUID
        },
        user_id: {
          unique: true,
          allowNull: false,
          type: Sequelize.UUID,

          foreignKey: true,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
          onDelete: 'SET NULL'
        },
        role_id: {
          allowNull: false,
          type: Sequelize.BIGINT,

          foreignKey: true,
          references: {
            model: 'roles',
            key: 'id'
          },
          onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
          onDelete: 'SET NULL'
        },
        image_url: {
          type: Sequelize.TEXT
        },
        code_phone: {
          type: Sequelize.BIGINT
        },
        phone: {
          type: Sequelize.BIGINT
        },
        country_id: {
          allowNull: false,
          type: Sequelize.BIGINT,

          foreignKey: true,
          references: {
            model: 'countries',
            key: 'id'
          },
          onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
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
      await queryInterface.dropTable('profiles', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}



