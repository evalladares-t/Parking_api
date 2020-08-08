const BaseController = require("./base.controller");
const {ParkingDTO} = require('../dtos');
const jsreport = require('jsreport');
const mapper = require('automapper-js');
const Moment = require('moment');
const { extendMoment } =require('moment-range');

class Reportcontroller {
    constructor({VehicleSpaceService,TypeVehicleService}) {
        this._vehiclespaceservice = VehicleSpaceService;
        this._typevehicleservie=TypeVehicleService;
    }

    async atencion(req,res){        
        const {start,end}=req.body;
        const fechai=formatDate(Date.parse(start)).datetoday;
        const fechaf=""+formatDate(Date.parse(end)).datetoday;
        const type_vehicle = await this._typevehicleservie.indexep();
        const result = await this._vehiclespaceservice.reporte();
        const moment = extendMoment(Moment);
        const newresult = [];
        let aa=0;
        const rango=moment.range(start,end);
        result.forEach(element => {
            if(rango.contains(element.start)){
                newresult[aa]=element;
                aa++;
            }
        });
        //console.log(newresult);
        let kkk = 0;
        let aaa=0;
        let mount=0;
        const col1=[];
        const col2=[];
        type_vehicle.forEach(e => {
            aaa=0;
            mount=0;
            newresult.forEach(x => {                
                if(e.idtypevehicle==x.tb_vehicle.idtypevehicle){
                    aaa++;
                    if(x.cost!=0 && x.cost!=null){                        
                        mount=mount+x.cost;                        
                    }
                }                
            });
            col1[kkk]=aaa;
            col2[kkk]=mount;
            kkk++;
        });
        let i=0;
        let subtotal=0;
        let total=0;
        let igv=0;
        const datafinal=[];
        type_vehicle.forEach(element => {
            let hora=0;
            let monto=0;
            if(!col2[i].isNaN){
                monto =col2[i]
            }
            
            subtotal=monto*0.82;
            igv=monto*0.18+igv;
            total=subtotal+total;
            datafinal[i]={'idtypevehicle':element.idtypevehicle,
                        'name':element.name,
                        'price':element.price,
                        'mount':monto,
                        'hour':col2[i]/col1[i]
                    }            
            i++;
        });
        const datafinal2={'data':datafinal,'total':Math.round(total),'subtotal':Math.round(igv)}
        //datafinal.push({'total':total})
        console.log(datafinal2)

        jsreport.render({ 
            template:{
                content: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">                    
                    <style>                        
                        .clearfix:after {
                            content: "";
                            display: table;
                            clear: both;
                        }                        
                        a {
                            color: #0087C3;
                            text-decoration: none;
                        }
                        
                        body {
                            margin-right:15px
                            position: relative;
                            width: 20cm;  
                            height: 25cm; 
                            margin: 0 auto; 
                            color: #555555;
                            background: #FFFFFF; 
                            font-family: Arial, sans-serif; 
                            font-size: 14px; 
                            font-family: SourceSansPro;
                        }
                        
                        header {
                            padding: 10px 0;
                            margin-bottom: 20px;
                            border-bottom: 1px solid #AAAAAA;
                        }
                        
                        #logo {
                            float: left;
                            margin-top: 8px;
                        }
                        
                        #logo img {
                            height: 70px;
                        }
                        
                        #company {
                            float: right;
                            text-align: right;
                        }                                                
                        #details {
                            margin-bottom: 50px;
                        }
                        
                        #client {
                            padding-left: 6px;
                            border-left: 6px solid #0087C3;
                            float: left;
                        }                        
                        #client .to {
                            color: #777777;
                        }
                        
                        h2.name {
                            font-size: 1.4em;
                            font-weight: normal;
                            margin: 0;
                        }
                        
                        #invoice {
                            float: right;
                            text-align: right;
                        }
                        
                        #invoice h1 {
                            color: #0087C3;
                            font-size: 2.4em;
                            line-height: 1em;
                            font-weight: normal;
                            margin: 0  0 10px 0;
                        }
                        
                        #invoice .date {
                            font-size: 1.1em;
                            color: #777777;
                        }
                        
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            border-spacing: 0;
                            margin-bottom: 20px;
                        }
                        
                        table th,
                        table td {
                            padding: 20px;
                            background: #EEEEEE;
                            text-align: center;
                            border-bottom: 1px solid #FFFFFF;
                        }
                        
                        table th {
                            white-space: nowrap;        
                            font-weight: normal;
                        }
                        
                        table td {
                            text-align: right;
                        }
                        
                        table td h3{
                            color: #57B223;
                            font-size: 1.2em;
                            font-weight: normal;
                            margin: 0 0 0.2em 0;
                        }
                        
                        table .no {
                            color: #FFFFFF;
                            font-size: 1.6em;
                            background: #57B223;
                        }
                        
                        table .desc {
                            text-align: left;
                        }
                        
                        table .unit {
                            background: #DDDDDD;
                        }
                        
                        table .qty {
                        }
                        
                        table .total {
                            background: #57B223;
                            color: #FFFFFF;
                        }
                        
                        table td.unit,
                        table td.qty,
                        table td.total {
                            font-size: 1.2em;
                        }
                        
                        table tbody tr:last-child td {
                            border: none;
                        }
                        
                        table tfoot td {
                            padding: 10px 20px;
                            background: #FFFFFF;
                            border-bottom: none;
                            font-size: 1.2em;
                            white-space: nowrap; 
                            border-top: 1px solid #AAAAAA; 
                        }
                        
                        table tfoot tr:first-child td {
                            border-top: none; 
                        }
                        
                        table tfoot tr:last-child td {
                            color: #57B223;
                            font-size: 1.4em;
                            border-top: 1px solid #57B223; 
                        
                        }
                        
                        table tfoot tr td:first-child {
                            border: none;
                        }
                        
                        #thanks{
                            font-size: 2em;
                            margin-bottom: 50px;
                        }
                        
                        #notices{
                            padding-left: 2px;
                            border-left: 2px solid #0087C3;  
                        }
                        
                        #notices .notice {
                            font-size: 1.2em;
                        }
                        
                        footer {
                            color: #777777;
                            width: 100%;
                            height: 30px;
                            position: absolute;
                            bottom: 0;
                            border-top: 1px solid #AAAAAA;
                            padding: 8px 0;
                            text-align: center;
                        }    
                    </style>
                    </head>
                    <body>
                    <header class="clearfix">
                        <div id="logo">
                        <img src="../resource/logo.png">
                        </div>
                        <div id="company">
                        <h2 class="name">Park-aquí</h2>
                        <div>455 Foggy Heights, AZ 85004, US</div>
                        <div>(602) 519-0450</div>
                        <div><a href="mailto:company@example.com">company@example.com</a></div>
                        </div>
                        </div>
                    </header>
                    <main>
                        <div id="details" class="clearfix">
                        <div id="client">
                            <div class="to">Gerente general:</div>
                            <h2 class="name">Edward Valladares</h2>
                            <div class="address">tlf: 955583671</div>
                            <div class="email"><a href="mailto:evalladarestav@gmail.com">evalladarestav@gmail.com</a></div>
                        </div>
                        <div id="invoice">
                            <h1>Reporte de atención</h1>
                            <div class="date">Fecha inicio: {{fechai}}</div>
                            <div class="date">Fecha final: {{fechaf}}</div>
                        </div>
                        </div>
                        <table border="0" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                            <th class="no">#</th>
                            <th class="desc">TIPO DE VEHICULO</th>
                            <th class="unit">PRECIO POR UNIDAD/H</th>
                            <th class="qty">CANTIDAD POR UNIDAD/H</th>
                            <th class="total">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>               
                            {{#each rows.data}}                      
                                <tr>
                                <td class="no">{{idtypevehicle}}</td>
                                <td class="desc">{{name}}</td>
                                <td class="unit">S/.{{price}}</td>
                                <td class="qty">{{hour}}</td>
                                <td class="total">S/.{{mount}}</td>
                                </tr>                               
                            {{/each}}
                        </tbody>
                        <tfoot>
                            <tr>
                            <td colspan="2"></td>
                            <td colspan="2">IGV</td>
                            <td>S/.{{rows.subtotal}}</td>
                            </tr>
                            <td colspan="2"></td>
                            <td colspan="2">MONTO TOTAL</td>
                            <td>S/.{{rows.total}}</td>
                            </tr>
                        </tfoot>
                        </table>
                        <div id="thanks">Gracias a ti!</div>
                        <div id="notices">
                        <div>Nota:</div>
                        <div class="notice">Aquí puede ir una observación.</div>
                        </div>
                    </main>
                    <footer>
                        La factura se creó en una computadora y es válida sin la firma y el sello.
                    </footer>
                    </body>
                </html>`,
                engine: 'handlebars',
                recipe: 'chrome-pdf',                
            },                 
            data:{   
                fechai:fechai,
                fechaf:fechaf,
                rows:datafinal2,                    
            },    
        }).then((out)=>{
            out.stream.pipe(res);  
            //console.log(data.placa)              
        }).catch((e)=>{
            res.send(e);
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

module.exports = Reportcontroller;