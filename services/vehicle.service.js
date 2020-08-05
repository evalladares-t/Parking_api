
const BaseService = require("./base.service");

class VehicleService extends BaseService {
    constructor({ VehicleBusiness }) {
        super(VehicleBusiness);
    }

}

module.exports = VehicleService;