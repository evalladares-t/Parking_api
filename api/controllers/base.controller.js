const mapper = require('automapper-js');

class baseController{
    constructor(ServiceBase,DTO,Resource) {
        this._serviceBase = ServiceBase;
        this._DTO = DTO;
        this._resource = Resource;
    }

    async index(req,res){
        const {offset,limit}=req.query;
        const {protocol, hostname} = req;
        if(limit){
            if(offset){
                const result = await this._serviceBase.index(offset, limit);
                let rows = result.rows;
                const count = result.count;
                rows = rows.map(rows => mapper(this._DTO,rows));
                const resultado = Response(count,parseInt(offset),parseInt(limit),protocol,hostname,this._resource);
                return res.json({
                    count,
                    previous: resultado.previous,
                    next: resultado.next,
                    'data' : rows,
                })
            }
            else{
                const result = await this._serviceBase.index('0', limit);
                let rows = result.rows;
                const count = result.count;
                rows = rows.map(rows => mapper(this._DTO,rows));
                const resultado = Response(count,0,parseInt(limit),protocol,hostname,this._resource);
                return res.json({
                    count,
                    previous: resultado.previous,
                    next: resultado.next,
                    'data' : rows,
                })
            }
        }
        else{
            if(offset){
                const result = await this._serviceBase.index(offset, '20');
                let rows = result.rows;
                const count = result.count;
                rows = rows.map(rows=> mapper(this._DTO,rows));
                const resultado = Response(count,parseInt(offset),20,protocol,hostname,this._resource);
                return res.json({
                    count,
                    previous: resultado.previous,
                    next: resultado.next,
                    'data' : rows,
                })
            }
            else {
                const result = await this._serviceBase.index('0', '20');
                let rows = result.rows;
                const count = result.count;
                rows = rows.map(rows=> mapper(this._DTO,rows));
                const resultado = Response(count,0,20,protocol,hostname,this._resource);
                return res.json({
                    count,
                    previous: resultado.previous,
                    next: resultado.next,
                    'data' : rows,
                })
            }
        }
    }

    async show(req,res){
        const {id} = req.params;
        let result = await this._serviceBase.show(id);
        result = mapper(this._DTO,result);
        return res.json({
            'data' : result
        })
    }

    async store(req,res){
        const {body} = req;
        const store = await this._serviceBase.store(body);
        const result = mapper(this._DTO,store);
        return res.status(201).json({
            'data' : result
        })
    }

    async update(req,res){
        const {body} = req;
        const {id} = req.params;
        await this._serviceBase.update(id,body);
        return res.status(201).json({
            'message':'Se actualizo correctamente',
            'data' : {
                id
            }
        })
    }

    async destroy (req,res){
        const {id} = req.params;
        const result = await this._serviceBase.destroy(id);
        return res.status(204).json({
            'data' : result
        })
    }
}

function Response(count,offset,limit,protocol,hostname,resource){
    if(count>20){
        if(offset>=0){
            if(offset===0){
                const previous = null;
                const next = `${protocol}://${hostname}:${process.env.PORT}/api/v1.0/${resource}?offset=${offset+20}&limit=${limit}`;
                return {previous,next}
            }
            if(offset<20 && offset>0){
                const previous = `${protocol}://${hostname}:${process.env.PORT}/${process.env.PORT}/api/v1.0/${resource}?offset=0&limit=${offset}`;
                const next = `${protocol}://${hostname}:${process.env.PORT}/api/v1.0/${resource}?offset=${offset+20}&limit=${limit}`;
                return {previous,next}
            }
            if(offset>=20){
                const previous = `${protocol}://${hostname}:${process.env.PORT}/api/v1.0/${resource}?offset=${offset-20}&limit=20`;
                if(count>offset+20) {
                    const next = `${protocol}://${hostname}:${process.env.PORT}/api/v1.0/${resource}?offset=${offset + 20}&limit=${limit}`;
                    return {previous, next}
                }
                else {
                    const next = null;
                    return {previous, next}
                }
            }
        }
    }
    else{
        if(offset>=0 && offset<=20){
            if(offset===0){
                const previous = null;
                const next = null;
                return {previous,next}
            }
            if(offset<=20 && offset>0){
                const previous = `${protocol}://${hostname}:${process.env.PORT}/api/v1.0/${resource}?offset=0&limit=${offset}`;
                const next = null;
                return {previous,next}
            }
        }
    }
}

module.exports = baseController;