const BaseController = require("./base.controller");
const {PermissionDTO} = require('../dtos');
const Resource = "permission";
const mapper = require('automapper-js');
class PermissionController extends BaseController{
    constructor({PermissionService}) {
        super(PermissionService,PermissionDTO,Resource)
    }
}

module.exports = PermissionController;