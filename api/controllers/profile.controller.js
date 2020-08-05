const BaseController = require("./base.controller");
const {ProfileDTO} = require('../dtos');
const Resource = "profile";
const mapper = require('automapper-js');
class ProfileController extends BaseController{
    constructor({ProfileService}) {
        super(ProfileService,ProfileDTO,Resource)
    }
}

module.exports = ProfileController;