const BaseController = require("./base.controller");
const {MenuDTO} = require('../dtos');
const Resource = "menu";
const mapper = require('automapper-js');
class MenuController extends BaseController{
    constructor({MenuService}) {
        super(MenuService,MenuDTO,Resource)
    }

    async indexdep(req,res){
        const {offset,limit}=req.query;
        const offsetI = parseInt(offset);
        const limitI = parseInt(limit);
        const {protocol, hostname} = req;
        if(limitI){
            if(offsetI){
                const result = await this._serviceBase.indexdep(offsetI, limitI);
                let rows = result.rows;
                const count = result.count;
                rows = rows.map(rows => mapper(this._DTO,rows));
                const resultado = Response(count,parseInt(offsetI),parseInt(limitI),protocol,hostname,this._resource);
                return res.json({
                    count,
                    previous: resultado.previous,
                    next: resultado.next,
                    'data' : rows,
                })
            }
            else{
                const result = await this._serviceBase.index(0, limitI);
                let rows = result.rows;
                const count = result.count;
                rows = rows.map(rows => mapper(this._DTO,rows));
                
                const resultado = Response(count,0,parseInt(limitI),protocol,hostname,this._resource);
                return res.json({
                    count,
                    previous: resultado.previous,
                    next: resultado.next,
                    'data' : rows,
                })
            }
        }
        else{
            if(offsetI){
                const result = await this._serviceBase.index(offsetI, 20);
                let rows = result.rows;
                const count = result.count;
                rows = rows.map(rows=> mapper(this._DTO,rows));
                const resultado = Response(count,parseInt(offsetI),20,protocol,hostname,this._resource);
                return res.json({
                    count,
                    previous: resultado.previous,
                    next: resultado.next,
                    'data' : rows,
                })
            }
            else {
                const result = await this._serviceBase.index(0, 20);
                let rows = result.rows;
                const count = result.count;
                rows = rows.map(rows=> mapper(this._DTO,rows));
                var nolimpio = [];
                var limpio = [];
                var padre =[];
                
                rows.forEach(element => {
                    if(element.owner!=null){
                        nolimpio.push(element)
                    }
                    else{
                        limpio.push(element);
                    }
                });
                
                for(var i=0;i<limpio.length;i++){
                    padre[i] = limpio[i];
                    padre[i].children=[]
                    var emit=0;
                    for(var j=0; j<nolimpio.length;j++){
                        if(limpio[i].idmenu===nolimpio[j].owner){
                            console.log(emit)
                            padre[i].children[emit]=nolimpio[j];
                            emit++;
                        }
                        else{
                            //padre[i].children=[]
                        }
                    }
                }

                //console.log(limpio[1].idmenu)

                const resultado = Responsedep(count,0,20,protocol,hostname,this._resource);
                return res.json({
                    count,
                    previous: resultado.previous,
                    next: resultado.next,
                    'data' : padre,
                })
            }
        }
    }

    
}

function Responsedep(count,offset,limit,protocol,hostname,resource){
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

module.exports = MenuController;