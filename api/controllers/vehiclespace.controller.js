const BaseController = require("./base.controller");
const {VehicleSpaceDTO} = require('../dtos');
const Resource = "typevehicle";
const mapper = require('automapper-js');
class VehicleSpaceController extends BaseController{
    constructor({VehicleSpaceService}) {
        super(VehicleSpaceService,VehicleSpaceDTO,Resource)
    }
}

module.exports = VehicleSpaceController;