'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_ticket.init({
    idticket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      comment:'IDENTIFICADOR UNICO'
    },
    name:{
      type: DataTypes.INTEGER,
      comment:'NOMBRE DEL TICKET'
    },
    iduser: {
      type: DataTypes.INTEGER,
      comment:'IDENTIFICADOR DE USUARIO'
    },
    idvehiclespace: {
      type: DataTypes.INTEGER,
      comment:'IDENTIFICADOR DE ESPACIO DE VEHICULO'
    },
  }, {
    comment: 'TABLA MAESTRO DE LOS TICKETS DEL SISTEMA',
    sequelize,
    modelName: 'tb_ticket',
  });
  return tb_ticket;
};