
const BaseService = require("./base.service");

class UserService extends BaseService {
    constructor({ UserBusiness }) {
        super(UserBusiness);
    }

    async showdep(id) {
        const entity = await this._entityBusiness.showdep(id);
        return entity;
    }

    async login(name_user) {
        const entity = await this._entityBusiness.login(name_user);
        return entity;
    }

    async storedep(entity) {
        const createdEntity = await this._entityBusiness.storedep(entity);
        return createdEntity;
    }
}

module.exports = UserService;