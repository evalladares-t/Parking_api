'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_vehiclespace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_vehiclespace.hasMany(models.tb_ticket,{
        foreignKey: 'idvehiclespace',
        as:'tb_ticket'
      });
      tb_vehiclespace.belongsTo(models.tb_vehicle,{
        foreignKey: 'idvehicle',
        as:'tb_vehicle'
      });
      tb_vehiclespace.belongsTo(models.tb_parking,{
        foreignKey: 'idparking',
        as:'tb_parking'
      });
    }
  };
  tb_vehiclespace.init({
    idvehiclespace: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      comment:'IDENTIFICADOR UNICO'
    },
    start: {
      type:DataTypes.DATE,
      comment:'HORA DE INICIO'
    },
    end: {
      type: DataTypes.DATE,
      comment:'HORA FINAL'
    },
    cost: {
      type:DataTypes.INTEGER,
      comment:'COSTO TOTAL A PAGAR'
    },
    idvehicle: {
      type: DataTypes.INTEGER,
      comment:'IDENTIFICADOR DE VEHICULO'
    },
    idparking: {
      type: DataTypes.INTEGER,
      comment:'IDENTIFICADOR DEL PARKING'
    },
  }, {
    comment: 'TABLA MAESTRO DEL ESPACIO DE VEHICULOS DEL SISTEMA',
    sequelize,
    modelName: 'tb_vehiclespace',
  });
  return tb_vehiclespace;
};