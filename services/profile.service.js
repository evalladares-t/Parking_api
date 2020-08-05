
const BaseService = require("./base.service");

class ProfileService extends BaseService {
    constructor({ ProfileBusiness }) {
        super(ProfileBusiness);
    }

    async showdep(id) {
        const entity = await this._entityBusiness.showdep(id);
        return entity;
    }
    
}

module.exports = ProfileService;