'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      publications.belongsTo(models.Profiles, { as: 'profile', foreignKey: 'profile_id' })
      publications.belongsTo(models.city, { as: 'city', foreignKey: 'city_id' })
      publications.belongsTo(models.Publications_types, { as: 'publications_type', foreignKey: 'publication_type_id' })

      publications.hasMany(models.votes, { as: 'publications', foreignKey: 'publication_id' })
    }
  }
  publications.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    profile_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,

      foreigKey: true,
      references: {
        model: 'Profiles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    },
    picture: {
      type: DataTypes.STRING
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      foreigKey: true,
      references: {
        model: 'city',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    img_url: {
      type: DataTypes.STRING
    },
    publication_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      foreigKey: true,
      references: {
        model: 'Publications_types',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
  }, {
    sequelize,
    modelName: 'publications',
    tableName: 'publications',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'profile_id', 'title', 'description',
          'content', 'picture', 'city_id', 'img_url', 'publication_type_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    }
  });
  return publications;
};