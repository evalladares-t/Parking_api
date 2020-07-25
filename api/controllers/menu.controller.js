const BaseController = require("./base.controller");
const {UsuarioDTO,MultimediaDTO,AtencionDTO,RegistroModuloDTO} = require('../dtos');
const Resource = "usuario";
const mapper = require('automapper-js');
class UsuarioController extends BaseController{
    constructor({MenuService}) {
        super(MenuService,UsuarioDTO,Resource)
    }

    async showdep(req,res){
        const {id} = req.params;
        let result = await this._serviceBase.showdep(id);
        if(!result){
            res.json({'message':'Recurso no encotrado'})
        }
        const usuario = mapper(this._DTO,result.usuario);
        const multimedia = (result.multimedia)?mapper(MultimediaDTO,result.multimedia):null;
        const atencion = (result.atencion)?mapper(AtencionDTO,result.atencion):null;
        const registromodulo = (result.registromodulo)?mapper(RegistroModuloDTO,result.registromodulo):null;
        return res.json({
            usuario,
            multimedia,
            atencion,
            registromodulo
        })
    }

}

module.exports = UsuarioController;