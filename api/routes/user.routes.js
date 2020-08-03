const {Router} = require('express');


module.exports = function ({UserController}) {
    const router = Router();

    router.get('/', UserController.index.bind(UserController));
    router.get('/:id', UserController.showdep.bind(UserController));
    router.post('/', UserController.storedep.bind(UserController));
    router.patch('/:id', UserController.updatedep.bind(UserController));
    router.delete('/:id', UserController.destroy.bind(UserController));
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})});
    return router;
};
