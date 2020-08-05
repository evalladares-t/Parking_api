const BaseController = require("./base.controller");
const {ParkingDTO} = require('../dtos');
const Resource = "parking";
const mapper = require('automapper-js');
class ParkingController extends BaseController{
    constructor({ParkingService}) {
        super(ParkingService,ParkingDTO,Resource)
    }
}

module.exports = ParkingController;