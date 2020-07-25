
class BaseService {
    constructor(EntityBusiness) {
        this._entityBusiness = EntityBusiness;
    }

    async index(offset,limit) {
        const result = await this._entityBusiness.index(offset,limit);
        const rows = result.rows;
        const count = result.count;
        return {rows,count};
    }

    async show(id) {
        const entity = await this._entityBusiness.show(id);
        return entity;
    }

    async store(entity) {
        const createdEntity = await this._entityBusiness.store(entity);
        return createdEntity;
    }

    async update(id, entity) {
        const updatedEntity = await this._entityBusiness.update(id, entity);
        return updatedEntity;
    }

    async destroy(id) {
        const deletedEntity = await this._entityBusiness.destroy(id);
        return deletedEntity;
    }
}

module.exports = BaseService;