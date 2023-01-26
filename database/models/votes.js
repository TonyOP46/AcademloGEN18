'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      votes.belongsTo(models.publications, { as: 'publications', foreignKey: 'publication_id' })
      votes.belongsTo(models.Profiles, { as: 'Profiles', foreignKey: 'profile_id' })
    }
  }
  votes.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    publication_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,

      foreigKey: true,
      references: {
        model: 'publications',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    profile_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,

      foreigKey: true,
      references: {
        model: 'profiles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
  }, {
    sequelize,
    modelName: 'votes',
    tableName: 'votes',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['publication_id', 'profile_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    }
  });

  return votes;
};