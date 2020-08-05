
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

    async show(idtypevehicle) {
        const result = await this._db[this.entity].findOne({ where: { idtypevehicle },
            include:[{
                model: this._db["tb_vehicle"],
                as:'tb_vehicle'
            }]
        });

        return result
    }

    update(idtypevehicle, entity) {
        entity.idtypevehicle = parseInt(idtypevehicle);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idtypevehicle } });
    }

    destroy(idtypevehicle) {
        return this._db[this.entity].destroy({ where: { idtypevehicle } });
    }
}

module.exports = TypeVehicleRepository;
