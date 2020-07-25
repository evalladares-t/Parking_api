
const BaseService = require("./base.service");

class MenuService extends BaseService {
    constructor({ MenuBusiness }) {
        super(MenuBusiness);
    }

    async showdep(id) {
        const entity = await this._entityBusiness.showdep(id);
        return entity;
    }
}

module.exports = MenuService;