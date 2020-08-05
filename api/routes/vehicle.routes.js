const {Router} = require('express');


module.exports = function ({VehicleController}) {
    const router = Router();

    router.get('/', VehicleController.index.bind(VehicleController));
    router.get('/:id', VehicleController.show.bind(VehicleController));
    router.post('/', VehicleController.store.bind(VehicleController));
    router.patch('/:id', VehicleController.update.bind(VehicleController));
    router.delete('/:id', VehicleController.destroy.bind(VehicleController));
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})});
    return router;
};
