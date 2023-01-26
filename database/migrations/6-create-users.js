'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
          validate: {
            isEmail: true,
            notEmpty: true
          }
        },
        username: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING,
          //validate: {
          //is: /^[a-z]+$/i
          //}
        },
        email_verified: {
          type: Sequelize.DATE
        },
        token: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at'
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
        }
      }, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }

  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('users', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }

  }
}