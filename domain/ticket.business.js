const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Ticket } = require("./models");

class TicketBusiness extends BaseBusiness {
    constructor({ TicketRepository }) {
        super(TicketRepository, Ticket);
    }

}

module.exports = TicketBusiness;