
const BaseRepository = require("./base.repository");
class UsuarioRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_user");
    }

    index(offset,limit) {
        const result = this._db[this.entity].findAndCountAll({
            offset,limit,order:[
                'iduser'
            ]
        });
        return result
    }

    login(name_user) {

        const result = this._db[this.entity].findOne({
            where:{name_user}
        });
        return result
    }

    storedep(entity) {
        return this._db[this.entity].create(entity);
    }

    show(iduser) {
        const result = this._db[this.entity].findOne({ where: { iduser } });
        return result
    }

    update(iduser, entity) {
        entity.iduser = parseInt(iduser);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { iduser } });
    }

    destroy(iduser) {
        return this._db[this.entity].destroy({ where: { iduser } });
    }
}

module.exports = UsuarioRepository;