const BaseController = require("./base.controller");
const {VehicleSpaceDTO, VehicleDTO, ParkingDTO} = require('../dtos');
const Resource = "vehiclespace";
const mapper = require('automapper-js');
class VehicleSpaceController extends BaseController{
    constructor({VehicleSpaceService}) {
        super(VehicleSpaceService,VehicleSpaceDTO,Resource)
    }

    async showdep(req,res){
        const {id} = req.params;
        let result = await this._serviceBase.showdep(id);
        if(!result){
            res.json({'message':'Recurso no encotrado'})
        }
        //console.log(result)
        const vehiclespace = mapper(this._DTO,result.vehiclespace);
        const vehicle = (result.vehicle)?mapper(VehicleDTO,result.vehicle):null;
        const parking = (result.parking)?mapper(ParkingDTO,result.parking):null;
        return res.json({
            vehiclespace,
            vehicle,
            parking
        })
    }

}

module.exports = VehicleSpaceController;