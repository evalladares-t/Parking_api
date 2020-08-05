const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const router = Router();
const apiRoute = Router();
apiRoute.use(cors()).use(bodyParser.json()).use(compression());

module.exports = function ({ AuthMiddleware,AuthController, UserRoutes, MenuRoutes, PermissionRoutes,
ProfileRoutes, TicketRoutes,VehicleSpaceRoutes,VehicleRoutes,TypeVehicleRoutes,ParkingRoutes}) {

    apiRoute.post('/login', AuthController.login.bind(AuthController));

    //Rutas generales
    apiRoute.use('/user', AuthMiddleware.authMiddleware, UserRoutes);
    apiRoute.use('/menu', AuthMiddleware.authMiddleware, MenuRoutes);
    apiRoute.use('/permission', AuthMiddleware.authMiddleware, PermissionRoutes);
    apiRoute.use('/profile', AuthMiddleware.authMiddleware, ProfileRoutes);
    apiRoute.use('/ticket', AuthMiddleware.authMiddleware, TicketRoutes);
    apiRoute.use('/vehiclespace', AuthMiddleware.authMiddleware, VehicleSpaceRoutes);
    apiRoute.use('/vehicle', AuthMiddleware.authMiddleware, VehicleRoutes);
    apiRoute.use('/typevehicle', AuthMiddleware.authMiddleware, TypeVehicleRoutes);
    apiRoute.use('/parking', AuthMiddleware.authMiddleware, ParkingRoutes);
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