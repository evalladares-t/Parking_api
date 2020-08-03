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

    async updatedep(req,res){
        const {body} = req;
        const {id} = req.params;
        await this._serviceBase.updatedep(id,body);
        return res.status(201).json({
            'message':'Se actualizo correctamente',
            'data' : {
                id
            }
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

module.exports = UserController;