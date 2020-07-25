'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_user extends Model {
    
    static associate(models) {
      // define association here
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
      type: DataTypes.STRING,
      comment:'NOMBRE DEL USUARIO'
    },
    last_name:{
      type: DataTypes.STRING,
      comment:'APELLIDOS DEL USUARIO'
    },
    dni: {
      type: DataTypes.STRING,
      comment:'DNI DEL USUARIO'
    },
    name_user: {
      type: DataTypes.STRING,
      comment:'NOMBRE DEL ACCESO DE USUARIO'
    },
    pass: {
      type: DataTypes.STRING,
      comment:'CONTRASEÑA DEL ACCESO DE USUARIO'
    },
    imgurl: {
      type: DataTypes.STRING,
      comment:'DIRECCION URL DE LA FOTO DEL USUARIO'
    },
    std: {
      type: DataTypes.BOOLEAN,
      comment:'ESTADO 1=ACTIVO  0= DESCATIVADO'
    },
    idprofile: DataTypes.INTEGER
  }, {
    comment: 'TABLA MAESTRO DE LOS USUARIOS DEL SISTEMA',
    sequelize,
    modelName: 'tb_user',
  });
  return tb_user;
};