const {Router} = require('express');


module.exports = function ({PermissionController}) {
    const router = Router();

    router.get('/', PermissionController.index.bind(PermissionController));
    router.get('/:id', PermissionController.show.bind(PermissionController));
    router.post('/', PermissionController.store.bind(PermissionController));
    router.patch('/:id', PermissionController.update.bind(PermissionController));
    router.delete('/:id', PermissionController.destroy.bind(PermissionController));
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})});
    return router;
};
