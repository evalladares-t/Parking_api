const BaseController = require("./base.controller");
const {MenuDTO} = require('../dtos');
const Resource = "menu";
const mapper = require('automapper-js');
class MenuController extends BaseController{
    constructor({MenuService}) {
        super(MenuService,MenuDTO,Resource)
    }

}

module.exports = MenuController;