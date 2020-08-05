//const {UsuarioDTO} = require('../dtos');
const jwt = require('jsonwebtoken');
const mapper = require('automapper-js');
class AuthController{
    constructor({UserService}) {
        this._userService = UserService;
    }
    //pass master : $2b$08$btxTxotTturjDOyUNSKcqede1hYOaOCXzWLxcHstECRx6XuIkdFWu
    //toker master : eyJhbGciOiJIUzI1NiJ9.MQ.fGaUARI99DDadCuNm4ZUhaB6Bpx8KiJsnCLTisJ0bp4
    async login (req, res) {
        const { name_user, pass } = req.body;
        const result = await this._userService.login(name_user,pass);
        if(result.entity!=null){  
            if(!result.validate){
                res.json({
                    'success': false,
                    'message': 'Contraseña incorrecta',
                })
            }
            else{
                var token = jwt.sign( result.entity.iduser, process.env.JWT_SECRET);
                const emit = {"token":token}
                await this._userService.update(result.entity.iduser,emit);
                res.json({
                    'success': true,
                    'message': 'Usuario correcto',
                    'token':token
                })
            }
        }
        else{
            res.json({
                'success': false,
                'message': 'Usuario no encontrado',
            }) 
        }
    };
}
module.exports = AuthController;