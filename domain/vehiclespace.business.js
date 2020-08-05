const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
//const ParkingRepository = require('../dal/repositories/parking.repository')
const { VehicleSpace, Vehicle, Parking } = require("./models");

class VehicleSpaceBusiness extends BaseBusiness {
    constructor({ VehicleSpaceRepository,ParkingRepository }) {
        super(VehicleSpaceRepository, VehicleSpace);
        this.parkingRepository = ParkingRepository;
    }
    

    async showdep(id) {
        const entity = await this._entityRepository.show(id);
        if (!entity) return null;
        //console.log(entity)
        const vehiclespace = mapper(this.entityToMap, entity.toJSON());
        let vehicle = null;
        let parking = null;
        if(entity.tb_vehicle){
            vehicle = mapper(Vehicle, entity.tb_vehicle);
        }
        if(entity.tb_parking){
            parking = mapper(Parking, entity.tb_parking);
        }
        //console.log(parking)
        return {vehiclespace,vehicle, parking}
    }

    async storedep(entity) {
        entity = mapper(this.entityToMap, entity);
        console.log(entity.idparking)
        const createdEntity = await this._entityRepository.store(entity);
        const emit = {"state":0};
        await this.parkingRepository.update(entity.idparking, emit);
        return mapper(this.entityToMap, createdEntity.toJSON());
    }

}

module.exports = VehicleSpaceBusiness;