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
}

module.exports = UserBusiness;