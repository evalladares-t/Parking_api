const {Router} = require('express');


module.exports = function ({ParkingController}) {
    const router = Router();

    router.get('/', ParkingController.index.bind(ParkingController));
    router.get('/:id', ParkingController.show.bind(ParkingController));
    router.post('/', ParkingController.store.bind(ParkingController));
    router.patch('/:id', ParkingController.update.bind(ParkingController));
    router.delete('/:id', ParkingController.destroy.bind(ParkingController));
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})});
    return router;
};
