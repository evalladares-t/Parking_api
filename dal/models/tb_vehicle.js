'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_vehicle.hasMany(models.tb_vehiclespace,{
        foreignKey: 'idvehicle',
        as:'tb_vehiclespace'
      });
    }
  };
  tb_vehicle.init({
    idvehicle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      comment:'IDENTIFICADOR UNICO'
    },
    license_plate: {
      type: DataTypes.STRING(50),
      unique:true,
      comment:'PLACA VEHICULAR'
    },
    idtypevehicle: {
      type: DataTypes.INTEGER,
      comment:'PLACA VEHICULAR'
    },
    description: {
      type: DataTypes.STRING(50),
      comment:'DESCRIPCION DEL VEHICULO'
    },
    reference: {
      type: DataTypes.STRING(50),
      comment:'REFERENCIA U OBSERVACION DEL VEHICULO'
    },
  }, {
    comment: 'TABLA MAESTRO DE LOS VEHICULOS DEL SISTEMA',
    sequelize,
    modelName: 'tb_vehicle',
  });
  return tb_vehicle;
};