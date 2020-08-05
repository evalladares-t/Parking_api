
const BaseRepository = require("./base.repository");
class ParkingRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_parking");
    }

    index(offset,limit) {
        const result = this._db[this.entity].findAndCountAll({
            offset,limit,order:[
                'idparking'
            ]
        });
        return result
    }

    show(idparking) {
        const result = this._db[this.entity].findOne({ where: { idparking } });

        return result
    }

    update(idparking, entity) {
        entity.idparking = parseInt(idparking);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idparking } });
    }

    destroy(idparking) {
        return this._db[this.entity].destroy({ where: { idparking } });
    }
}

module.exports = ParkingRepository;