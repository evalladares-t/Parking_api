const BaseController = require("./base.controller");
const {TicketDTO} = require('../dtos');
const Resource = "ticket";
const mapper = require('automapper-js');
class TicketController extends BaseController{
    constructor({TicketService}) {
        super(TicketService,TicketDTO,Resource)
    }
}

module.exports = TicketController;