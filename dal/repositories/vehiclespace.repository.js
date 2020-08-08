
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
    }//2020-07-27T10:42:22.000Z

    async reporte(inicio,fin) {
        const result = await this._db[this.entity].findAll({
            include:[{
                model:this._db["tb_vehicle"],
                as:'tb_vehicle'
            }]
        });
        //console.log(result)
        return result
    }

    async show(idvehiclespace) {
        const result = await this._db[this.entity].findOne({ where: { idvehiclespace },
            include:[{
                model: this._db["tb_vehicle"],
                as:'tb_vehicle'
            },{
                model: this._db["tb_parking"],
                as:'tb_parking'
            }],
            
        });
        return result
    }

    update(idvehiclespace, entity) {
        entity.idvehiclespace = parseInt(idvehiclespace);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idvehiclespace } });
    }

    destroy(idvehiclespace) {
        return this._db[this.entity].destroy({ where: { idvehiclespace } });
    }
}

module.exports = VehicleSpaceRepository;