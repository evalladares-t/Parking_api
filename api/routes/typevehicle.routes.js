const {Router} = require('express');


module.exports = function ({TypeVehicleController}) {
    const router = Router();

    router.get('/', TypeVehicleController.index.bind(TypeVehicleController));
    router.get('/:id', TypeVehicleController.showdep.bind(TypeVehicleController));
    router.post('/', TypeVehicleController.store.bind(TypeVehicleController));
    router.patch('/:id', TypeVehicleController.update.bind(TypeVehicleController));
    router.delete('/:id', TypeVehicleController.destroy.bind(TypeVehicleController));
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})});
    return router;
};
