
const BaseService = require("./base.service");

class TypeVehicleService extends BaseService {
    constructor({ TypeVehicleBusiness }) {
        super(TypeVehicleBusiness);
    }

    async indexep() {
        const result = await this._entityBusiness.indexdep();        
        return result;
    }

    async showdep(id) {
        const entity = await this._entityBusiness.showdep(id);
        return entity;
    }

}

module.exports = TypeVehicleService;