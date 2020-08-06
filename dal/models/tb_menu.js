'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_menu.hasMany(models.tb_permission,{
        foreignKey: 'idmenu',
        as:'tb_permission'
      });
    }
  };
  tb_menu.init({
    idmenu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      comment:'IDENTIFICADOR UNICO'
    },
    text: {
      type:DataTypes.STRING(50),
      comment:'NOMBRE DEL REGISTRO MENU'
    },
    icon: {
      type:DataTypes.STRING(50),
      comment:'NOMBRE DEL ICONO DEL MENU'
    },
    owner: {
     type: DataTypes.INTEGER,
     comment:'DUEÑO DEL REGISTRO MENU'
    },
    route:{
      type: DataTypes.STRING(50),
      comment:'RUTA PARA EL FRONT'
    }
  }, {
    comment: 'TABLA MAESTRO DEL MENU DEL SISTEMA',
    sequelize,
    modelName: 'tb_menu',
  });
  return tb_menu;
};