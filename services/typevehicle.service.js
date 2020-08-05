
const BaseService = require("./base.service");

class TypeVehicleService extends BaseService {
    constructor({ TypeVehicleBusiness }) {
        super(TypeVehicleBusiness);
    }

    async showdep(id) {
        const entity = await this._entityBusiness.showdep(id);
        return entity;
    }

}

module.exports = TypeVehicleService;