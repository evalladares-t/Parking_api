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
        const iduser=entity.iduser;
        entity = mapper(this.entityToMap, entity);
        const createdEntity = await this._entityRepository.store(entity);
        const emit = {"state":0};
        await this.parkingRepository.update(entity.idparking, emit);
        const totalticket = await this.ticketRepository.indexdep();
        let name=0;
        if(totalticket!=null){
            const rows = mapper(Ticket, totalticket);
            name='EV-'+(rows.idticket+1);
            const idvehiclespace= createdEntity.idvehiclespace; 
            const ticketdata = {name,iduser,idvehiclespace}
            await this.ticketRepository.store(ticketdata);
        }else{
            const idticket=1;
            name='EV-1';
            const idvehiclespace= createdEntity.idvehiclespace; 
            const ticketdata = {idticket,name,iduser,idvehiclespace}
            await this.ticketRepository.store(ticketdata);
        }
        
        return mapper(this.entityToMap, createdEntity.toJSON());
    }

    async salida(id, entity) {        
        const updatedEntity = await this._entityRepository.update(id, entity);
        const emit = {"state":1};
        await this.parkingRepository.update(id, emit);
        return mapper(this.entityToMap, updatedEntity);
    }

    async reporte(start,end) {
        const vehiclespace= await (this._entityRepository.reporte(start,end));
        //console.log(vehiclespace);
        
       //const vehicle = await (this._entityRepository.reporte().tb_vehiclespace.tb_vehicle); 
        
        const result = vehiclespace.map(entity => mapper(this.entityToMap, entity.toJSON()));
        //console.log(result);
        return result;
    }
}

module.exports = VehicleSpaceBusiness;