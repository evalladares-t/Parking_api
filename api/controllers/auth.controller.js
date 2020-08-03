//const {UsuarioDTO} = require('../dtos');
const jwt = require('jsonwebtoken');
const mapper = require('automapper-js');
class AuthController{
    constructor({UserService}) {
        this._userService = UserService;
    }

    async login (req, res) {
        const { name_user, pass } = req.body;
        const result = await this._userService.login(name_user,pass);
        console.log(result.entity.pass)

        if(result.entity!=null){  
            if(!result.validate){
                res.json({
                    'success': false,
                    'message': 'Contraseña incorrecta',
                })
            }
            else{
                var token = jwt.sign( result.entity.iduser, process.env.JWT_SECRET);
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