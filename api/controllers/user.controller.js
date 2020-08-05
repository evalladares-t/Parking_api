const BaseController = require("./base.controller");
const {UserDTO, ProfileDTO, TicketDTO} = require('../dtos');
const Resource = "usuario";
const mapper = require('automapper-js');

class UserController extends BaseController{
    constructor({UserService}) {
        super(UserService,UserDTO,Resource)
    }


    async showdep(req,res){
        const {id} = req.params;
        let result = await this._serviceBase.showdep(id);
        //console.log(result.usuario)
        if(!result){
            res.json({'message':'Sin datos a mostrar'})
        }
        const usuario = mapper(this._DTO,result.user);
        const profile = (result.profile)?mapper(ProfileDTO,result.profile):null;
        const ticket = (result.ticket)?mapper(TicketDTO,result.ticket):null;
        return res.json({
            usuario,
            profile,
            ticket
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