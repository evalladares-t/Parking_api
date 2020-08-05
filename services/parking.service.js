
const BaseService = require("./base.service");

class ParkingService extends BaseService {
    constructor({ ParkingBusiness }) {
        super(ParkingBusiness);
    }

}

module.exports = ParkingService;