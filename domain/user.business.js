const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { User } = require("./models");

class UserBusiness extends BaseBusiness {
    constructor({ UserRepository }) {
        super(UserRepository, User);
    }

    async showdep(id) {
        const entity = await this._entityRepository.show(id);
        if (!entity) return null;
        const user = mapper(this.entityToMap, entity.toJSON());     
        return {user}
    }
    async login(name_user) {
        const entity = await this._entityRepository.login(name_user);
        if (!entity) return null;
        const user = mapper(this.entityToMap, entity.toJSON());     
        return {user}
    }

    async storedep(entity) {
        entity = mapper(this.entityToMap, entity);
        const createdEntity = await this._entityRepository.storedep(entity);
        return mapper(this.entityToMap, createdEntity.toJSON());
    }
}

module.exports = UserBusiness;