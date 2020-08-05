'use strict';

const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_user extends Model {
    
    static associate(models) {
      tb_user.hasMany(models.tb_ticket,{
        foreignKey: 'iduser',
        as:'tb_ticket'
      });

      tb_user.belongsTo(models.tb_profile,{
        foreignKey: 'idprofile',
        as:'tb_profile'
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
      type: DataTypes.STRING(70),
      validate: {
        notEmpty:{
            msg: 'El password no puede ir vacío'
        }
      },
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
    idticket:{
      type: DataTypes.INTEGER,
      comment:'IDENTIFICADOR DE TICKET'
    },
  }, {
    /*instanceMethods: {
      generateHash = async function(password) {
        tb_user.pass = await bcrypt.hash(password, bcrypt.genSaltSync(10));
      },
      async validPassword(pass) {
          return  await bcrypt.compare(pass, this.pass);
      }
    },*/
    comment: 'TABLA MAESTRO DE LOS USUARIOS DEL SISTEMA',
    sequelize,
    modelName: 'tb_user',
  });

  /*tb_user.prototype.validPassword = async function(password) {
    console.log(this.pass);
    console.log(password);
    const xx = await bcrypt.compare(password, this.pass);
    //const xx = await bcrypt.compare(this.pass,password);
    console.log(xx)
    return  xx;
  }*/

  return tb_user;
};