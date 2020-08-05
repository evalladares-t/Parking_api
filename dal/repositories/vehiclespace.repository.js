
const BaseRepository = require("./base.repository");
class VehicleSpaceRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_vehiclespace");
    }

    index(offset,limit) {
        const result = this._db[this.entity].findAndCountAll({
            offset,limit,order:[
                'idvehiclespace'
            ]
        });
        return result
    }

    show(idvehiclespace) {
        const result = this._db[this.entity].findOne({ where: { idvehiclespace } });

        return result
    }

    update(idvehiclespace, entity) {
        entity.iduser = parseInt(idvehiclespace);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idvehiclespace } });
    }

    destroy(iduser) {
        return this._db[this.entity].destroy({ where: { idvehiclespace } });
    }
}

module.exports = VehicleSpaceRepository;