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
      // define association here
    }
  };
  tb_menu.init({
    idmenu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      comment:'IDENTIFICADOR UNICO'
    },
    name: {
      type:DataTypes.STRING,
      comment:'NOMBRE DEL REGISTRO MENU'
    },
    owner: {
     type: DataTypes.STRING,
     comment:'DUEÑO DEL REGISTRO MENU'
    }
  }, {
    sequelize,
    modelName: 'tb_menu',
  });
  return tb_menu;
};