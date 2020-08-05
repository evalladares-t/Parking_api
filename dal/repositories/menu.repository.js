
const BaseRepository = require("./base.repository");
class MenuRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_menu");
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
        entity.idmenu = parseInt(idmenu);
        delete entity.updatedAt;
        return this._db[this.entity].update(entity, { where: { idmenu } });
    }

    destroy(idmenu) {
        return this._db[this.entity].destroy({ where: { idmenu } });
    }
}

module.exports = MenuRepository;