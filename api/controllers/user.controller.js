const BaseController = require("./base.controller");
const {UserDTO} = require('../dtos');
const Resource = "usuario";
const mapper = require('automapper-js');

class UserController extends BaseController{
    constructor({UserService}) {
        super(UserService,UserDTO,Resource)
    }


    async showdep(req,res){
        const {id} = req.params;
        let result = await this._serviceBase.showdep(id);
        if(!result){
            res.json({'message':'Recurso no encotrado'})
        }
        const usuario = mapper(this._DTO,result.iduser);
        return res.json({
            usuario
        })
    }

}

module.exports = UserController;