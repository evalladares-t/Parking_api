const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Profile } = require("./models");

class ProfileBusiness extends BaseBusiness {
    constructor({ ProfileRepository }) {
        super(ProfileRepository, Profile);
    }

}

module.exports = ProfileBusiness;