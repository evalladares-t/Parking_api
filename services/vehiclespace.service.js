
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
    
    async salida(id, entity) {
        const updatedEntity = await this._entityBusiness.salida(id, entity);
        return updatedEntity;
    }
}

module.exports = VehicleSpaceService;