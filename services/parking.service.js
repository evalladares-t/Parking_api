
const BaseService = require("./base.service");

class ParkingService extends BaseService {
    constructor({ ParkingBusiness }) {
        super(ParkingBusiness);
    }

    async available() {
        const result = await this._entityBusiness.available();
        const rows = result;
        return rows;
    }

}

module.exports = ParkingService;