
const BaseRepository = require("./base.repository");
class UsuarioRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_user");
    }

    index(offset,limit) {
        const result = this._db[this.entity].findAndCountAll({
            offset,limit,order:[
                'iduser'
            ],
            attributes:{ exclude: ['pass'] }
        });
        return result
    }

    login(name_user) {

        const result = this._db[this.entity].findOne({
            where:{name_user}
        })
        return result
    }

    storedep(entity) {
        return this._db[this.entity].create(entity)
    }

    async show(iduser) {
        const result = await this._db[this.entity].findOne({ where: { iduser },
            include:[{
                model: this._db["tb_profile"],
                as:'tb_profile'
            }],
            include:[{
                model: this._db["tb_ticket"],
                as:'tb_ticket'
            }] 
        });
        
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