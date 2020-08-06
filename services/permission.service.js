
const BaseService = require("./base.service");

class PermissionService extends BaseService {
    constructor({ PermissionBusiness }) {
        super(PermissionBusiness);
    }

    async showdep(idprofile) {
        const entity = await this._entityBusiness.showdep(idprofile);
        return entity;
    }

}

module.exports = PermissionService;