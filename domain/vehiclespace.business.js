const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { VehicleSpace, Vehicle, Parking } = require("./models");

class VehicleSpaceBusiness extends BaseBusiness {
    constructor({ VehicleSpaceRepository }) {
        super(VehicleSpaceRepository, VehicleSpace);
    }

    async showdep(id) {
        const entity = await this._entityRepository.show(id);
        if (!entity) return null;
        //console.log(entity)
        const vehiclespace = mapper(this.entityToMap, entity.toJSON());
        let vehicle = null;
        let parking = null;
        if(entity.tb_vehicle){
            vehicle = mapper(Vehicle, entity.tb_vehicle);
        }
        if(entity.tb_parking){
            parking = mapper(Parking, entity.tb_parking);
        }
        //console.log(parking)
        return {vehiclespace,vehicle, parking}
    }

}

module.exports = VehicleSpaceBusiness;