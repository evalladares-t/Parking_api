const BaseController = require("./base.controller");
const {VehicleDTO} = require('../dtos');
const Resource = "vehicle";
const mapper = require('automapper-js');
class VehicleController extends BaseController{
    constructor({VehicleService}) {
        super(VehicleService,VehicleDTO,Resource)
    }
}

module.exports = VehicleController;