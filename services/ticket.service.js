
const BaseService = require("./base.service");

class TicketService extends BaseService {
    constructor({ TicketBusiness }) {
        super(TicketBusiness);
    }

    async printpdf(id) {
        const result = await this._entityBusiness.printpdf(id);
        const ticket = result.ticket;
        const user = result.user;
        const vehiclespace = result.vehiclespace;
        const parking = result.parking;
        const vehicle = result.vehicle;
        const typevehicle = result.typevehicle;
        
        return {ticket,user,vehiclespace,parking,vehicle,typevehicle};
    }

}

module.exports = TicketService;