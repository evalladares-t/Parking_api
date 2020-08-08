const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const router = Router();
const apiRoute = Router();
apiRoute.use(cors()).use(bodyParser.json()).use(compression());

module.exports = function ({ AuthMiddleware,AuthController, UserRoutes, MenuRoutes, PermissionRoutes,
ProfileRoutes, TicketRoutes,VehicleSpaceRoutes,VehicleRoutes,TypeVehicleRoutes,ParkingRoutes,ReportRoutes}) {

    apiRoute.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');        
        next();
     });

    apiRoute.post('/login', AuthController.login.bind(AuthController));

    //Rutas generales
    apiRoute.use('/user', AuthMiddleware.authMiddleware, UserRoutes);
    apiRoute.use('/reporte', ReportRoutes);
    apiRoute.use('/menu', AuthMiddleware.authMiddleware, MenuRoutes);
    apiRoute.use('/permission', AuthMiddleware.authMiddleware, PermissionRoutes);
    apiRoute.use('/profile', AuthMiddleware.authMiddleware, ProfileRoutes);
    apiRoute.use('/ticket',  TicketRoutes);
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
            'Login' : `${protocol}://${hostname}:${process.env.PORT}${url}/login`,
            'User': `${protocol}://${hostname}:${process.env.PORT}${url}/user`,
            'Menu': `${protocol}://${hostname}:${process.env.PORT}${url}/menu`,
            'permission': `${protocol}://${hostname}:${process.env.PORT}${url}/permission`,
            'profile': `${protocol}://${hostname}:${process.env.PORT}${url}/profile`,
            'ticket': `${protocol}://${hostname}:${process.env.PORT}${url}/ticket`,
            'vehiclespace': `${protocol}://${hostname}:${process.env.PORT}${url}/vehiclespace`,
            'vehicle': `${protocol}://${hostname}:${process.env.PORT}${url}/vehicle`,
            'typevehicle': `${protocol}://${hostname}:${process.env.PORT}${url}/typevehicle`,
            'parking': `${protocol}://${hostname}:${process.env.PORT}${url}/parking`,
        })
    });
    router.use('/api/v1.0', apiRoute);
    router.use('/*', (req, res) => {
        res.json({ 'message': 'Recurso no encotrado' })
    });
    return router;
};