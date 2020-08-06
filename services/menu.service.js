
const BaseService = require("./base.service");

class MenuService extends BaseService {
    constructor({ MenuBusiness }) {
        super(MenuBusiness);
    }

    async indexdep(offset,limit) {
        const result = await this._entityBusiness.indexdep(offset,limit);
        const rows = result.rows;
        const count = result.count;
        return {rows,count};
    }
}

module.exports = MenuService;