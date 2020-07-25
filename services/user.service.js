
const BaseService = require("./base.service");

class UserService extends BaseService {
    constructor({ UserBusiness }) {
        super(UserBusiness);
    }

    async showdep(id) {
        const entity = await this._entityBusiness.showdep(id);
        return entity;
    }
}

module.exports = UserService;