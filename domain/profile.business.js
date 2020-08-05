const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Profile, Permission } = require("./models");

class ProfileBusiness extends BaseBusiness {
    constructor({ ProfileRepository }) {
        super(ProfileRepository, Profile);
    }

    async showdep(id) {
        const entity = await this._entityRepository.show(id);
        if (!entity) return null;
        const profile = mapper(this.entityToMap, entity.toJSON());
        let permission = null;
        if(entity.tb_permission){
            permission = mapper(Permission, entity.tb_permission);
        }
        return {profile,permission}
    }


}

module.exports = ProfileBusiness;