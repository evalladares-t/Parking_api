const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const cors = require('cors');
const compression = require('compression');
const router = Router();
const apiRoute = Router();
apiRoute.use(cors()).use(bodyParser.json()).use(compression());

module.exports = function ({ AuthMiddleware,UserService, UserRoutes, MenuRoutes }) {

    apiRoute.post('/login', async (req, res) => {
        const { name_user, pass } = req.body;
        const result = await UserService.login(name_user,pass);

        if(result!=null){  
            //result.validPassword(pass);
            //console.log(ll)

            if(result.user.pass!=pass){
                res.json({
                    'success': false,
                    'message': 'Contraseña incorrecto',
                })
            }
            else{
                var token = jwt.sign( result.user.iduser, process.env.JWT_SECRET);
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
    });


    //Rutas generales
    apiRoute.use('/user', AuthMiddleware.authMiddleware, UserRoutes);
    apiRoute.use('/menu', AuthMiddleware.authMiddleware, MenuRoutes);
    apiRoute.use('/*', (req, res) => {
        res.json({ 'message': 'Recurso no encotrado' })
    });
    router.get('/api/v1.0', (req, res) => {
        const { protocol, hostname, url } = req;
        res.json({
            'User': `${protocol}://${hostname}:${process.env.PORT}${url}/user`,
            'Menu': `${protocol}://${hostname}:${process.env.PORT}${url}/menu`,
        })
    });
    router.use('/api/v1.0', apiRoute);
    router.use('/*', (req, res) => {
        res.json({ 'message': 'Recurso no encotrado' })
    });
    return router;
};