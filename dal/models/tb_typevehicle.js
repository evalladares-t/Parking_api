'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_typevehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_typevehicle.hasMany(models.tb_vehicle,{
        foreignKey: 'idtypevehicle',
        as:'tb_vehicle'
      });
    }
  };
  tb_typevehicle.init({
    idtypevehicle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      comment:'IDENTIFICADOR UNICO'
    },
    name: {
      type:DataTypes.STRING,
      comment:"NOMBRE DEL TIPO DE VEHICULO"
    },
    price: {
      type:DataTypes.INTEGER,
      comment:"PRECIO POR TIPO DE VEHICULO"
    }
  }, {
    comment: 'TABLA MAESTRO DE LOS TIPOS DE VEHICULOS DEL SISTEMA',
    sequelize,
    modelName: 'tb_typevehicle',
  });
  return tb_typevehicle;
};