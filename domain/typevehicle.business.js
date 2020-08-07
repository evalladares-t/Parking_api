const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { TypeVehicle, Vehicle} = require("./models");

class TypeVehicleBusiness extends BaseBusiness {
    constructor({ TypeVehicleRepository }) {
        super(TypeVehicleRepository, TypeVehicle);
    }

    
    
}

module.exports = TypeVehicleBusiness;