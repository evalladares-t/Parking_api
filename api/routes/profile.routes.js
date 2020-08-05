const {Router} = require('express');


module.exports = function ({ProfileController}) {
    const router = Router();

    router.get('/', ProfileController.index.bind(ProfileController));
    router.get('/:id', ProfileController.show.bind(ProfileController));
    router.post('/', ProfileController.store.bind(ProfileController));
    router.patch('/:id', ProfileController.update.bind(ProfileController));
    router.delete('/:id', ProfileController.destroy.bind(ProfileController));
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})});
    return router;
};
