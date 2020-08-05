const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Permission } = require("./models");

class PermissionBusiness extends BaseBusiness {
    constructor({ PermissionRepository }) {
        super(PermissionRepository, Permission);
    }

}

module.exports = PermissionBusiness;