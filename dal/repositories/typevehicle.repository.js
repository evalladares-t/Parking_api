
const BaseRepository = require("./base.repository");
class TypeVehicleRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_typevehicle");
    }

    index(offset,limit) {
        const result = this._db[this.entity].findAndCountAll({
            offset,limit,order:[
                'idtypevehicle'
            ]
        });
        return result
    }

    show(idtypevehicle) {
        const result = this._db[this.entity].findOne({ where: { idtypevehicle } });

        return result
    }

    update(idtypevehicle, entity) {
        entity.iduser = parseInt(idtypevehicle);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idtypevehicle } });
    }

    destroy(iduser) {
        return this._db[this.entity].destroy({ where: { idtypevehicle } });
    }
}

module.exports = TypeVehicleRepository;
