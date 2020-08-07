const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Vehicle } = require("./models");

class VehicleBusiness extends BaseBusiness {
    constructor({ VehicleRepository }) {
        super(VehicleRepository, Vehicle);
    }

    async showdep(id) {
        const entity = await this._entityRepository.show(id);
        //console.log(entity)
        if (!entity) return null;
        const typevehicle = mapper(this.entityToMap, entity.typevehicle.toJSON());
        let vehicle = null;
        if(entity.tb_vehicle){
            vehicle = mapper(Vehicle, entity.vehicle.tb_vehicle);
        }
        //console.log(entity)
        return {typevehicle,vehicle}
    }
}

module.exports = VehicleBusiness;