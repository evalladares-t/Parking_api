const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const router = Router();
const apiRoute = Router();
apiRoute.use(cors()).use(bodyParser.json()).use(compression());

module.exports = function ({ AuthMiddleware,AuthController, UserRoutes, MenuRoutes }) {

    apiRoute.post('/login', AuthController.login.bind(AuthController));

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