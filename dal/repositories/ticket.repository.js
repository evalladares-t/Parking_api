
const BaseRepository = require("./base.repository");
class TicketRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_ticket");
    }

    index(offset,limit) {
        const result = this._db[this.entity].findAndCountAll({
            offset,limit,order:[
                'idticket'
            ]
        });
        return result
    }

    async show(idticket) {
        const result = await this._db[this.entity].findOne({ where: { idticket },
            include:[{
                model: this._db["tb_user"],
                as:'tb_user',

            },{
                model: this._db["tb_vehiclespace"],
                as:'tb_vehiclespace',
                /*include:[{
                    model: this._db["tb_vehicle"],
                    as:'tb_vehicle',
                    include:[{
                        model: this._db["tb_typevehicle"],
                        as:'tb_typevehicle',      
                    }],
                },{
                    model: this._db["tb_parking"],
                    as:'tb_parking',
                    attributes: ['idparking','name'] ,
                }]  */              
            }],
        });
        //console.log(result)
        return result
    }

    printpdf(idticket) {
        const result = this._db[this.entity].findOne({ where: { idticket } });
        return result
    }

    update(idticket, entity) {
        entity.idticket = parseInt(idticket);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idticket } });
    }

    destroy(idticket) {
        return this._db[this.entity].destroy({ where: { idticket } });
    }
}

module.exports = TicketRepository;
