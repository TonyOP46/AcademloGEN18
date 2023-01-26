'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Profiles, { as: 'profile', foreignKey: 'user_id' })
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email_verified: {
      type: DataTypes.DATE
    },
    token: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'first_name', 'last_name', 'email', 'username', 'email_verified', 'token']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
      no_password: {
        attributes: { exclude: ['password'] }
      }
    }
  })

  return Users
}