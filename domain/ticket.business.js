const mapper = require("automapper-js");
const BaseBusiness = require("./base.business");
const { Ticket, User, VehicleSpace , Vehicle, TypeVehicle,Parking } = require("./models");

class TicketBusiness extends BaseBusiness {
    constructor({ TicketRepository,VehicleRepository, ParkingRepository,TypeVehicleRepository }) {
        super(TicketRepository,Ticket,ParkingRepository);
        this._vehicleRepository=VehicleRepository;
        this._parkingRepository=ParkingRepository;
        this._typeVehicleRepository=TypeVehicleRepository;
    }

    async printpdf(id) {
        const entity = await this._entityRepository.show(id);
        if (!entity) return null;
        const ticket = mapper(this.entityToMap, entity.toJSON());
        let user = null;
        let vehiclespace = null;        
        if(entity.tb_user){
            user = mapper(User, entity.tb_user);            
        }
        if(entity.tb_vehiclespace){
            vehiclespace = mapper(VehicleSpace, entity.tb_vehiclespace);
        }

        let vehicle = null;
        let typevehicle=null;
        let parking=null;

        const entity2 = await this._parkingRepository.show(vehiclespace.idparking);
    
        if(entity2){
            parking= mapper(Parking, entity2.toJSON());
        }

        const entityter = await this._vehicleRepository.showdep(vehiclespace.idvehicle);                
        if(entityter){            
            vehicle= mapper(Vehicle, entityter.toJSON());  
            typevehicle = mapper(TypeVehicle, entityter.tb_typevehicle.toJSON());         
        }
        //console.log(typevehicle)
        return {ticket,user,vehiclespace,parking,vehicle,typevehicle}
    }

}

module.exports = TicketBusiness;