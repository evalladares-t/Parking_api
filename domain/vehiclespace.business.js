const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
//const ParkingRepository = require('../dal/repositories/parking.repository')
const { VehicleSpace, Vehicle, Parking,Ticket } = require("./models");

class VehicleSpaceBusiness extends BaseBusiness {
    constructor({ VehicleSpaceRepository,ParkingRepository,TicketRepository }) {
        super(VehicleSpaceRepository, VehicleSpace);
        this.parkingRepository = ParkingRepository;
        this.ticketRepository = TicketRepository;
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
        //console.log(entity.idparking)
        const createdEntity = await this._entityRepository.store(entity);
        const emit = {"state":0};
        await this.parkingRepository.update(entity.idparking, emit);
        const totalticket = await this.ticketRepository.indexdep();
        let nameticket=0;
        if(totalticket!=null){
            const rows = totalticket.map(entity => mapper(this.Ticket, entity.toJSON()));            
        }
        
        const ticketdata = {name:'A',iduser:entity.iduser}
        //await this.ticketRepository.store(entity.idparking, ticketdata);
        return mapper(this.entityToMap, createdEntity.toJSON());
    }

    async salida(id, entity) {        
        const updatedEntity = await this._entityRepository.update(id, entity);
        const emit = {"state":1};
        await this.parkingRepository.update(id, emit);
        return mapper(this.entityToMap, updatedEntity);
    }

}

module.exports = VehicleSpaceBusiness;