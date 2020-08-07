const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Parking } = require("./models");

class ParkingBusiness extends BaseBusiness {
    constructor({ ParkingRepository }) {
        super(ParkingRepository, Parking);
    }

    async available() {
        const result= await (this._entityRepository.available());
        //console.log(result)
        const rows = result.map(entity => mapper(this.entityToMap, entity.toJSON()));
        return rows;
    }

}

module.exports = ParkingBusiness;