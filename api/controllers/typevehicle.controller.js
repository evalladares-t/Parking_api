const BaseController = require("./base.controller");
const {TypeVehicleDTO} = require('../dtos');
const Resource = "typevehicle";
const mapper = require('automapper-js');
class TypeVehicleController extends BaseController{
    constructor({TypeVehicleService}) {
        super(TypeVehicleService,TypeVehicleDTO,Resource)
    }
}

module.exports = TypeVehicleController;