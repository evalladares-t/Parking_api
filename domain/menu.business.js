const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Menu } = require("./models");

class MenuBusiness extends BaseBusiness {
    constructor({ MenuRepository }) {
        super(MenuRepository, Menu);
    }
}

module.exports = MenuBusiness;