
const BaseRepository = require("./base.repository");
class VehicleRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_vehicle");
    }

    index(offset,limit) {
        const result = this._db[this.entity].findAndCountAll({
            offset,limit,order:[
                'idvehicle'
            ]
        });
        return result
    }

    show(idvehicle) {
        const result = this._db[this.entity].findOne({ where: { idvehicle } });

        return result
    }

    update(idvehicle, entity) {
        entity.iduser = parseInt(idvehicle);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idvehicle } });
    }

    destroy(iduser) {
        return this._db[this.entity].destroy({ where: { idvehicle } });
    }
}

module.exports = VehicleRepository;