const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Menu } = require("./models");

class MenuBusiness extends BaseBusiness {
    constructor({ MenuRepository }) {
        super(MenuRepository, Menu);
    }

    async indexdep(offset,limit) {
        const result= await (this._entityRepository.index(offset,limit));
        const entities = result.rows;
        const count = result.count;
        const rows = entities.map(entity => mapper(this.entityToMap, entity.toJSON()));
        console.log(rows.MenuModels.owner)
        return {rows,count};
    }

}

module.exports = MenuBusiness;