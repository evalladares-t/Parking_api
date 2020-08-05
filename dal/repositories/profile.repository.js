
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

    show(idprofile) {
        const result = this._db[this.entity].findOne({ where: { idprofile } });

        return result
    }

    update(idprofile, entity) {
        entity.iduser = parseInt(idprofile);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idprofile } });
    }

    destroy(iduser) {
        return this._db[this.entity].destroy({ where: { idprofile } });
    }
}

module.exports = ProfileRepository;