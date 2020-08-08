const {Router} = require('express');


module.exports = function ({ReportController}) {
    const router = Router();

    router.post('/atencion', ReportController.atencion.bind(ReportController));

    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})});
    return router;
};
