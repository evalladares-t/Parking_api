
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

    show(idticket) {
        const result = this._db[this.entity].findOne({ where: { idticket } });

        return result
    }

    update(idticket, entity) {
        entity.iduser = parseInt(idticket);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idticket } });
    }

    destroy(iduser) {
        return this._db[this.entity].destroy({ where: { idticket } });
    }
}

module.exports = TicketRepository;
