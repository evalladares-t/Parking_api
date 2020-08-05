const BaseController = require("./base.controller");
const {ProfileDTO, PermissionDTO} = require('../dtos');
const Resource = "profile";
const mapper = require('automapper-js');
class ProfileController extends BaseController{
    constructor({ProfileService}) {
        super(ProfileService,ProfileDTO,Resource)
    }

    async showdep(req,res){
        const {id} = req.params;
        let result = await this._serviceBase.showdep(id);
        if(!result){
            res.json({'message':'Recurso no encotrado'})
        }
        const profile = mapper(this._DTO,result.profile);
        const permission = (result.permission)?mapper(PermissionDTO,result.permission):null;
        return res.json({
            profile,
            permission
        })
    }
}

module.exports = ProfileController;