
const BaseService = require("./base.service");

class UserService extends BaseService {
    constructor({ UserBusiness }) {
        super(UserBusiness);
    }

    async showdep(id) {
        const entity = await this._entityBusiness.showdep(id);
        return entity;
    }

    async login(name_user,pass) {
        const result =await this._entityBusiness.login(name_user,pass);
        //console.log(result)
        const entity = result.user;
        const validate = result.validate;
        //console.log(validate)
        return {entity,validate};
    }

    async updatedep(id, entity) {
        const updatedEntity = await this._entityBusiness.updatedep(id, entity);
        return updatedEntity;
    }

    async storedep(entity) {
        const createdEntity = await this._entityBusiness.storedep(entity);
        return createdEntity;
    }
}

module.exports = UserService;