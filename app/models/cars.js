'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cars.hasMany(models.Action, { foreignKey: "idcar" });
    }
  }
  Cars.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    size: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    deletedAt: "deletedAt",
    modelName: 'Cars',
  });
  return Cars;
};