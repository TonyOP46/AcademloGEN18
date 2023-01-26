'use strict';

const {
  Model
} = require('sequelize');
('./countries');

module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Profiles.hasMany(models.publications, { as: 'publications', foreignKey: 'profile_id' })
      Profiles.hasMany(models.votes, { as: 'profilesVotes', foreignKey: 'profile_id' })

      Profiles.belongsTo(models.Users, { as: 'user', foreignKey: 'user_id' })
      Profiles.belongsTo(models.Roles, { as: 'role', foreignKey: 'role_id' })
      Profiles.belongsTo(models.Countries, { as: 'country', foreignKey: 'country_id' })

    }
  }
  Profiles.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,

      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
      onDelete: 'SET NULL' // Elijan como quieren que se comporte la DB
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,

      foreignKey: true,
      references: {
        model: 'Roles',
        key: 'id'
      },
      onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
      onDelete: 'SET NULL' // Elijan como quieren que se comporte la DB
    },
    image_url: {
      type: DataTypes.TEXT
    },
    code_phone: {
      type: DataTypes.BIGINT
    },
    phone: {
      type: DataTypes.BIGINT
    },
    country_id: {
      allowNull: false,
      type: DataTypes.BIGINT,

      foreignKey: true,
      references: {
        model: 'Countries',
        key: 'id'
      },
      onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
      onDelete: 'SET NULL' // Elijan como quieren que se comporte la DB
    },
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['id', 'coutry_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Profiles;
};