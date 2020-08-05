'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_parking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_parking.hasMany(models.tb_vehiclespace,{
        foreignKey: 'idparking',
        as:'tb_vehiclespace'
      });
      
    }
  };
  tb_parking.init({
    idparking: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      comment:'IDENTIFICADOR UNICO'
    },
    name: {
      type: DataTypes.STRING(50),
      comment:"NOMBRE DEL ESPACIO DE PARKING"
    },
    state: {
      type: DataTypes.STRING(50),
      comment:"ESTADO DEL ESPACIO DE PARKING"
    },
  }, {
    comment: 'TABLA MAESTRO DE PARKING DEL SISTEMA',
    sequelize,
    modelName: 'tb_parking',
  });
  return tb_parking;
};