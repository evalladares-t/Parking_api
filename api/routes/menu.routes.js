const {Router} = require('express');


module.exports = function ({MenuController}) {
    const router = Router();

    router.get('/', MenuController.index.bind(MenuController));
    router.get('/lista', MenuController.indexdep.bind(MenuController));
    router.get('/:id', MenuController.show.bind(MenuController));
    router.post('/', MenuController.store.bind(MenuController));
    router.patch('/:id', MenuController.update.bind(MenuController));
    router.delete('/:id', MenuController.destroy.bind(MenuController));
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})});
    return router;
};
