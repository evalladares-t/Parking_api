const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Permission } = require("./models");

class PermissionBusiness extends BaseBusiness {
    constructor({ PermissionRepository }) {
        super(PermissionRepository, Permission);
    }

    async showdep(idprofile) {
        //console.log(idprofile)
        const entities = await this._entityRepository.showdep(idprofile);
        if (!entities) return null;
        //console.log(entity)
        const permission = entities.map(entity => mapper(this.entityToMap, entity.toJSON()));        
        return { permission}
    }


}

module.exports = PermissionBusiness;