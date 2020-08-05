const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Vehicle } = require("./models");

class VehicleBusiness extends BaseBusiness {
    constructor({ VehicleRepository }) {
        super(VehicleRepository, Vehicle);
    }

}

module.exports = VehicleBusiness;