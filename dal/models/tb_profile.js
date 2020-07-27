'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_profile.hasMany(models.tb_permission,{
        foreignKey: 'idprofile',
        as:'tb_permission'
      });
      tb_profile.hasMany(models.tb_user,{
        foreignKey: 'idprofile',
        as:'tb_user'
      });
    }
  };
  tb_profile.init({
    idprofile: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      comment:'IDENTIFICADOR UNICO'
    },
    name: {
      type: DataTypes.STRING(50),
      comment:'NOMBRE DE PERFIL'
    },
  }, {
    comment: 'TABLA MAESTRO DE LOS PERFILES DEL SISTEMA',
    sequelize,
    modelName: 'tb_profile',
  });
  return tb_profile;
};