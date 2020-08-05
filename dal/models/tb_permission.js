'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_permission.belongsTo(models.tb_menu,{
        foreignKey: 'idmenu',
        as:'tb_menu'
      });
      tb_permission.belongsTo(models.tb_profile,{
        foreignKey: 'idprofile',
        as:'tb_profile'
      });
    }
  };
  tb_permission.init({
    idpermission: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      comment:'IDENTIFICADOR UNICO'
    },
    state: {
      type:DataTypes.BOOLEAN,
      comment:'ESTADO DE PERMISO'
    },
    idprofile: {
      type: DataTypes.INTEGER,
      comment:'IDENTIFICADOR DE PROFILE'
    },
    idmenu: {
      type: DataTypes.INTEGER,
      comment:'IDENTIFICADOR DE MENU'
    },
  }, {
    comment: 'TABLA MAESTRO DE LOS PERMISOS DEL SISTEMA',
    sequelize,
    modelName: 'tb_permission',
  });
  return tb_permission;
};