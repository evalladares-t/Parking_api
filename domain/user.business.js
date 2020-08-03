const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { User } = require("./models");
const bcrypt = require("bcrypt");

class UserBusiness extends BaseBusiness {
    constructor({ UserRepository }) {
        super(UserRepository, User);
    }

    async showdep(id) {
        const entity = await this._entityRepository.show(id);
        if (!entity) return null;
        const user = mapper(this.entityToMap, entity.toJSON());
        return { user }
    }

    async login(name_user, pass) {
        const entity = await this._entityRepository.login(name_user);        
        if (!entity) return null;
        const user = mapper(this.entityToMap, entity.toJSON());
        console.log(pass)
        await bcrypt.compare(pass,user.pass,function(e,r){
            if(e){
                console.log(e)
            }
            if(r){//$2b$10$R5UpNpgKLgqUXLu3jHcG3.pNiFVjG38MJfCX0cer2OZWFUgx4SxDe
                console.log(r)
            }
            else{
                console.log('passwords do not match')
            }
        })
        return { user }
    }

    async storedep(entity) {
        entity = mapper(this.entityToMap, entity);
        entity.pass= await bcrypt.hash(entity.pass, bcrypt.genSaltSync(8));
        const createdEntity = await this._entityRepository.storedep(entity);
        return mapper(this.entityToMap, createdEntity.toJSON());
    }
}

module.exports = UserBusiness;