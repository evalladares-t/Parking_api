
const BaseRepository = require("./base.repository");
class UsuarioRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_menus");
    }

    index(offset,limit) {
        const result = this._db[this.entity].findAndCountAll({
            offset,limit,order:[
                'idmenu'
            ]
        });
        return result
    }

    show(idmenu) {
        const result = this._db[this.entity].findOne({ where: { idmenu } });

        return result
    }

    update(idmenu, entity) {
        entity.iduser = parseInt(idmenu);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idmenu } });
    }

    destroy(iduser) {
        return this._db[this.entity].destroy({ where: { idmenu } });
    }
}

module.exports = UsuarioRepository;