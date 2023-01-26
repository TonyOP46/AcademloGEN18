'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications_types.hasMany(models.publications, { as: 'publications_types', foreignKey: 'publication_type_id' })
    }
  }
  Publications_types.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT  // Puede ser Integer o BigInt -> BigInt es mejor
    },
    name: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,

    },
    description: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Publications_types',
    tableName: 'publication_types',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['name', 'description']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Publications_types;
};