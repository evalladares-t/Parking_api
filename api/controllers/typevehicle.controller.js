const BaseController = require("./base.controller");
const {TypeVehicleDTO, VehicleDTO} = require('../dtos');
const Resource = "typevehicle";
const mapper = require('automapper-js');
class TypeVehicleController extends BaseController{
    constructor({TypeVehicleService}) {
        super(TypeVehicleService,TypeVehicleDTO,Resource)
    }

    async showdep(req,res){
        const {id} = req.params;
        let result = await this._serviceBase.showdep(id);
        //console.log(result)
        if(!result){
            res.json({'message':'Recurso no encotrado'})
        }
        const typevehicle = mapper(this._DTO,result.typevehicle);
        const vehicle = (result.vehicle)?mapper(VehicleDTO,result.vehicle):null;
        return res.json({
            typevehicle,
            vehicle
        })
    }

}

module.exports = TypeVehicleController;