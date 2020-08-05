const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { TypeVehicle, Vehicle} = require("./models");

class TypeVehicleBusiness extends BaseBusiness {
    constructor({ TypeVehicleRepository }) {
        super(TypeVehicleRepository, TypeVehicle);
    }

    async showdep(id) {
        const entity = await this._entityRepository.show(id);
        if (!entity) return null;
        //console.log(entity)
        const typevehicle = mapper(this.entityToMap, entity.toJSON());
        let vehicle = null;
        if(entity.tb_vehicle){
            vehicle = mapper(Vehicle, entity.tb_vehicle);
        }
        return {typevehicle,vehicle}
    }
    
}

module.exports = TypeVehicleBusiness;