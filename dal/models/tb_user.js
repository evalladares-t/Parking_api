'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_user extends Model {
    
    static associate(models) {
      tb_user.hasMany(models.tb_ticket,{
        foreignKey: 'idticket',
        as:'tb_ticket'
      });
    }
  };
  tb_user.init({
    iduser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      comment:'IDENTIFICADOR UNICO'
    },
    name:{ 
      type: DataTypes.STRING(50),
      comment:'NOMBRE DEL USUARIO'
    },
    last_name:{
      type: DataTypes.STRING(50),
      comment:'APELLIDOS DEL USUARIO'
    },
    dni: {
      type: DataTypes.STRING(50),
      comment:'DNI DEL USUARIO'
    },
    name_user: {
      type: DataTypes.STRING(50),
      comment:'NOMBRE DEL ACCESO DE USUARIO'
    },
    pass: {
      type: DataTypes.STRING(50),
      comment:'CONTRASEÑA DEL ACCESO DE USUARIO'
    },
    imgurl: {
      type: DataTypes.STRING(70),
      comment:'DIRECCION URL DE LA FOTO DEL USUARIO'
    },
    std: {
      type: DataTypes.BOOLEAN,
      comment:'ESTADO 1=ACTIVO  0= DESCATIVADO'
    },
    idprofile:{
      type: DataTypes.INTEGER,
      comment:'IDENTIFICADOR DE PROFILE'
    },
  }, {
    comment: 'TABLA MAESTRO DE LOS USUARIOS DEL SISTEMA',
    sequelize,
    modelName: 'tb_user',
  });
  return tb_user;
};