const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Parking } = require("./models");

class ParkingBusiness extends BaseBusiness {
    constructor({ ParkingRepository }) {
        super(ParkingRepository, Parking);
    }

}

module.exports = ParkingBusiness;