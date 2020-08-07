const BaseController = require("./base.controller");
const {ParkingDTO} = require('../dtos');
const Resource = "parking";
const mapper = require('automapper-js');
class ParkingController extends BaseController{
    constructor({ParkingService}) {
        super(ParkingService,ParkingDTO,Resource)
    }

    async available(req,res){
        const result = await this._serviceBase.available();
        //console.log(result)
        let rows = result;
        rows = rows.map(rows => mapper(this._DTO,rows));        
        return res.json({                        
            'data' : rows,
        })
    }

}

module.exports = ParkingController;