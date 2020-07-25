class BaseRepository {

    constructor(db, entity) {
        this._db = db;
        this.entity = entity;
    }

    store(entity) {
        return this._db[this.entity].create(entity);
    }
}

module.exports = BaseRepository;