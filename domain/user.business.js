const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { User, Profile, Ticket } = require("./models");
const bcrypt = require("bcrypt");

class UserBusiness extends BaseBusiness {
    constructor({ UserRepository }) {
        super(UserRepository, User);
    }

    async showdep(id) {
        const entity = await this._entityRepository.show(id);
        if (!entity) return null;
        const user = mapper(this.entityToMap, entity.toJSON());
        let profile = null;
        let ticket = null;
        if(entity.tb_profile){
            profile = mapper(Profile, entity.tb_profile);            
        }
        
        if(entity.tb_ticket){
            ticket = mapper(Ticket, entity.tb_ticket);
        }
        //console.log(ticket)
        return { user, profile, ticket}
    }

    async login(name_user, pass) {
        const entity = await this._entityRepository.login(name_user);        
        if (!entity) return {user:null,"validate":false}
        const user = mapper(this.entityToMap, entity.toJSON());
        const validate = await bcrypt.compare(pass,user.pass)
        
        return {user, validate}
        
    }

    async updatedep(id, entity) {
        entity.pass= await bcrypt.hash(entity.pass, bcrypt.genSaltSync(8));
        const updatedEntity = await this._entityRepository.update(id, entity);
        return mapper(this.entityToMap, updatedEntity);
    }

    async storedep(entity) {
        entity = mapper(this.entityToMap, entity);
        entity.pass= await bcrypt.hash(entity.pass, bcrypt.genSaltSync(8));
        const createdEntity = await this._entityRepository.storedep(entity);
        return mapper(this.entityToMap, createdEntity.toJSON());
    }
}

module.exports = UserBusiness;