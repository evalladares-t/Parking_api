const BaseController = require("./base.controller");
const {TicketDTO,UserDTO,VehicleSpaceDTO,VehicleDTO,ParkingDTO,TypeVehicleDTO} = require('../dtos');
const jsreport = require('jsreport');
const Resource = "ticket";
const mapper = require('automapper-js');
const fs = require('fs')
const path = require('path')

//const styleimport=fs.readFileSync(path.join(__rootDirectory, 'api/resource/style.css'))
class TicketController extends BaseController{
    constructor({TicketService}) {
        super(TicketService,TicketDTO,Resource)
    }

    async printpdf(req,res){
        const {id} = req.params;
        const store = await this._serviceBase.printpdf(id);
        //console.log(store)
        const ticket = mapper(this._DTO,store.ticket);
        const user = mapper(UserDTO,store.user);
        const vehiclespace = mapper(VehicleSpaceDTO,store.vehiclespace);
        const parking = mapper(ParkingDTO,store.parking);
        const vehicle = mapper(VehicleDTO,store.vehicle);
        const typevehicle = mapper(TypeVehicleDTO,store.typevehicle);        
        const startformat=formatDate(Date.parse(vehiclespace.start))
        
        //console.log(typevehicle);

        jsreport.render({ 
            template:{
                content: `<div  style="width:80%;padding:10px;border:1px solid black;margin-left:5%">                    
                <p style="text-align:center"><strong>Playa de estacionamiendo</strong></b></p>
                <p style="text-align:center;">{{typevehicle}} : {{placa}}</p>
                <hr>
                <table style="width:100%">
                <tr>
                <td>Ticket</td>
                <td style="margin-left:10%;text-align:left;">{{ticket}}</td>
                </tr>
                <br>
                <tr style="margin-top:10px">
                <td>Fecha Ingreso</td>
                <td style="margin-left:10%;text-align:left;">{{fecha}}</td>
                </tr>  
                <tr style="margin-top:10px">
                <td>Hora Ingreso</td>
                <td style="margin-left:10%;text-align:left;">{{hour}}</td>
                </tr>                  
                <tr>
                <td>Usuario</td>
                <td style="margin-left:10%;text-align:left;">{{username}}</td>
                </tr>
                </table>
                <hr>
                <p style="text-align:center">No pierda su ticket</p>
                </div>`,
                engine: 'handlebars',
                recipe: 'chrome-pdf',
                chrome:{
                    'height':'300px',
                    'width':'300px'
                },
            },                 
            data:{
                typevehicle:typevehicle.name,
                placa: vehicle.license_plate,
                ticket:ticket.idticket,
                typevehicle:typevehicle.name,
                fecha:startformat.datetoday,
                hour:startformat.datehours,
                username:user.name
            },       
        }).then((out)=>{
            out.stream.pipe(res);  
            //console.log(data.placa)              
        }).catch((e)=>{
            res.end(e);
        })
    }

    
}

function formatDate (data){
    var pad = function (num) {
      var norm = Math.floor(Math.abs(num))
      return (norm < 10 ? '0' : '') + norm
    }
    const date = new Date(data)
    const datetoday = date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
    const datehours = pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds())
    return {datetoday,datehours}
}

module.exports = TicketController;