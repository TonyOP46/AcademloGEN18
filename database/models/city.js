'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      city.hasMany(models.publications, { as: 'city', foreignKey: 'city_id' })
      city.belongsTo(models.state, { as: 'state', foreignKey: 'state_id' })
    }
  }
  city.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER  // Puede ser Integer o BigInt -> BigInt es mejor
    },
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.TEXT
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      foreigKey: true,
      references: {
        model: 'state',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'

    },
  }, {
    sequelize,
    modelName: 'city',
    tableName: 'cities',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['id', 'name', 'state_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });

  return city;
};