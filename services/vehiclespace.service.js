
const BaseService = require("./base.service");

class VehicleSpaceService extends BaseService {
    constructor({ VehicleSpaceBusiness }) {
        super(VehicleSpaceBusiness);
    }

    async showdep(id) {
        const entity = await this._entityBusiness.showdep(id);
        return entity;
    }

    async storedep(entity) {
        const createdEntity = await this._entityBusiness.storedep(entity);
        return createdEntity;
    }
    
}

module.exports = VehicleSpaceService;