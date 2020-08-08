const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { TypeVehicle, Vehicle} = require("./models");

class TypeVehicleBusiness extends BaseBusiness {
    constructor({ TypeVehicleRepository }) {
        super(TypeVehicleRepository, TypeVehicle);
    }

    async indexdep() {
        const result= await (this._entityRepository.indexdep());
        const entities = result;
        const rows = entities.map(entity => mapper(this.entityToMap, entity.toJSON()));
        return rows;
    }
    
}

module.exports = TypeVehicleBusiness;