
const BaseRepository = require("./base.repository");
class PermissionRepository extends BaseRepository {
    constructor({ db }) {
        super(db, "tb_permission");
    }

    index(offset,limit) {
        const result = this._db[this.entity].findAndCountAll({
            offset,limit,order:[
                'idpermission'
            ]
        });
        return result
    }

    async showdep(idprofile) {
        const result = await this._db[this.entity].findAll({
            where: { idprofile },
            order:[
                'idpermission'
            ]},
            
        );
        return result
    }

    async show(idpermission) {
        const result = await this._db[this.entity].findOne({ where: { idpermission } });
        return result
    }

    async update(idpermission, entity) {
        entity.idpermission = parseInt(idpermission);
        delete entity.updatedAt;
        return await this._db[this.entity].update(entity, { where: { idpermission } });
    }

    destroy(idpermission) {
        return this._db[this.entity].destroy({ where: { idpermission } });
    }
}

module.exports = PermissionRepository;