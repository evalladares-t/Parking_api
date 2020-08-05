const {Router} = require('express');


module.exports = function ({TicketController}) {
    const router = Router();

    router.get('/', TicketController.index.bind(TicketController));
    router.get('/:id', TicketController.show.bind(TicketController));
    router.post('/', TicketController.store.bind(TicketController));
    router.patch('/:id', TicketController.update.bind(TicketController));
    router.delete('/:id', TicketController.destroy.bind(TicketController));
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})});
    return router;
};
