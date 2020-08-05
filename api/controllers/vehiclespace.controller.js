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
        console.log(result)
        const vehiclespace = mapper(this._DTO,result.vehiclespace);
        const vehicle = (result.vehicle)?mapper(VehicleDTO,result.vehicle):null;
        const parking = (result.parking)?mapper(ParkingDTO,result.parking):null;
        return res.json({
            vehiclespace,
            vehicle,
            parking
        })
    }

    async storedep(req,res){
        const {body} = req;
        const store = await this._serviceBase.storedep(body);
        const result = mapper(this._DTO,store);
        return res.status(201).json({
            'data' : result
        })
    }

}

module.exports = VehicleSpaceController;