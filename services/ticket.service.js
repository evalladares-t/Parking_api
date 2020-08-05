
const BaseService = require("./base.service");

class TicketService extends BaseService {
    constructor({ TicketBusiness }) {
        super(TicketBusiness);
    }

}

module.exports = TicketService;