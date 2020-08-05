
const BaseRepository = require("./base.repository");
class ProfileRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_profile");
    }

    index(offset,limit) {
        const result = this._db[this.entity].findAndCountAll({
            offset,limit,order:[
                'idprofile'
            ]
        });
        return result
    }

    async show(idprofile) {
        //const result = this._db[this.entity].findOne({ where: { idprofile } });
        const result = await this._db[this.entity].findOne({ where: { idprofile },
            include:[{
                model: this._db["tb_permission"],
                as:'tb_permission'
            }]
        });
        //console.log(prueba);
        return result
    }

    update(idprofile, entity) {
        entity.idprofile = parseInt(idprofile);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idprofile } });
    }

    destroy(idprofile) {
        return this._db[this.entity].destroy({ where: { idprofile } });
    }
}

module.exports = ProfileRepository;