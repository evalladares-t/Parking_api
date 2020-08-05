const {Router} = require('express');


module.exports = function ({VehicleSpaceController}) {
    const router = Router();

    router.get('/', VehicleSpaceController.index.bind(VehicleSpaceController));
    router.get('/:id', VehicleSpaceController.showdep.bind(VehicleSpaceController));
    router.post('/', VehicleSpaceController.storedep.bind(VehicleSpaceController));
    router.patch('/:id', VehicleSpaceController.update.bind(VehicleSpaceController));
    router.delete('/:id', VehicleSpaceController.destroy.bind(VehicleSpaceController));
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})});
    return router;
};
