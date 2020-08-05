const {asClass,createContainer,asFunction,asValue} = require('awilix');

//app start
const StartUp = require('./startup');
const Server = require('./server');
const config = require('../config/environments');

//Routes
const Routes = require('./routes');
const UserRoutes = require('./routes/user.routes');
const MenuRoutes = require('./routes/menu.routes');
const PermissionRoutes = require('./routes/permission.routes');
const ProfileRoutes = require('./routes/profile.routes');
const TicketRoutes = require('./routes/ticket.routes');
const VehicleSpaceRoutes = require('./routes/vehiclespace.routes');
const VehicleRoutes = require('./routes/vehicle.routes');
const TypeVehicleRoutes = require('./routes/typevehicle.routes');
const ParkingRoutes = require('./routes/parking.routes');

//Controllers
const { UserController, 
    MenuController, 
    PermissionController,
    ProfileController,
    TicketController,
    VehicleSpaceController,
    VehicleController,
    TypeVehicleController,
    ParkingController,
    AuthController} = require('./controllers');

//Middleware
const {AuthMiddleware} =require('./middlewares')

//Service
const {MenuService,
    UserService,
    PermissionService,
    ProfileService,
    TicketService,
    VehicleSpaceService,
    VehicleService,
    TypeVehicleService,
    ParkingService} = require('./../services');

//Domain
const {MenuBusiness,
    UserBusiness,
    PermissionBusiness,
    ProfileBusiness,
    TicketBusiness,
    VehicleSpaceBusiness,
    VehicleBusiness,
    TypeVehicleBusiness,
    ParkingBusiness} = require('./../domain');

//Repository
const {MenuRepository,
    UserRepository,
    PermissionRepository,
    ProfileRepository,
    TicketRepository,
    VehicleSpaceRepository,
    VehicleRepository,
    TypeVehicleRepository,
    ParkingRepository} = require('./../dal/repositories');

//conf db
const db = require('../dal/models');


const container = createContainer();


container
    .register({
    //App start
        app:asClass(StartUp).singleton(),
        server : asClass(Server).singleton(),
        router : asFunction(Routes).singleton(),
    })
    .register({
        config : asValue(config)
    })
    .register({
        db : asValue(db)
    })
    .register({
    //Api Routes
        UserRoutes : asClass(UserRoutes).singleton(),
        MenuRoutes : asClass(MenuRoutes).singleton(),
        PermissionRoutes : asClass(PermissionRoutes).singleton(),
        ProfileRoutes : asClass(ProfileRoutes).singleton(),
        TicketRoutes : asClass(TicketRoutes).singleton(),
        VehicleSpaceRoutes : asClass(VehicleSpaceRoutes).singleton(),
        VehicleRoutes : asClass(VehicleRoutes).singleton(),
        TypeVehicleRoutes : asClass(TypeVehicleRoutes).singleton(),
        ParkingRoutes : asClass(ParkingRoutes).singleton(),
    //Api Controller
        AuthController : asClass(AuthController).singleton(),
        UserController : asClass(UserController).singleton(),
        MenuController : asClass(MenuController).singleton(),    
        PermissionController : asClass(PermissionController).singleton(), 
        ProfileController : asClass(ProfileController).singleton(),
        TicketController : asClass(TicketController).singleton(),
        VehicleSpaceController : asClass(VehicleSpaceController).singleton(),
        VehicleController : asClass(VehicleController).singleton(),
        TypeVehicleController : asClass(TypeVehicleController).singleton(),
        ParkingController : asClass(ParkingController).singleton(),    
        
    })
    .register({
        //Middleware
            AuthMiddleware : asClass(AuthMiddleware).singleton(),
    }) 
    .register({
        //Service
            UserService : asClass(UserService).singleton(),
            MenuService : asClass(MenuService).singleton(),
            PermissionService : asClass(PermissionService).singleton(),            
            ProfileService : asClass(ProfileService).singleton(),
            TicketService : asClass(TicketService).singleton(),
            VehicleSpaceService : asClass(VehicleSpaceService).singleton(),
            VehicleService : asClass(VehicleService).singleton(),
            TypeVehicleService : asClass(TypeVehicleService).singleton(),
            ParkingService : asClass(ParkingService).singleton(), 
    })    
    .register({
        //Domain
            UserBusiness : asClass(UserBusiness).singleton(),
            MenuBusiness : asClass(MenuBusiness).singleton(),
            PermissionBusiness : asClass(PermissionBusiness).singleton(),
            ProfileBusiness : asClass(ProfileBusiness).singleton(),
            TicketBusiness : asClass(TicketBusiness).singleton(),
            VehicleSpaceBusiness : asClass(VehicleSpaceBusiness).singleton(),
            VehicleBusiness : asClass(VehicleBusiness).singleton(),
            TypeVehicleBusiness : asClass(TypeVehicleBusiness).singleton(),
            ParkingBusiness : asClass(ParkingBusiness).singleton(), 
    })
    .register({
        //Repository
            UserRepository : asClass(UserRepository).singleton(),
            MenuRepository : asClass(MenuRepository).singleton(),
            PermissionRepository : asClass(PermissionRepository).singleton(),
            ProfileRepository : asClass(ProfileRepository).singleton(),
            TicketRepository : asClass(TicketRepository).singleton(),
            VehicleSpaceRepository : asClass(VehicleSpaceRepository).singleton(),
            VehicleRepository : asClass(VehicleRepository).singleton(),
            TypeVehicleRepository : asClass(TypeVehicleRepository).singleton(),
            ParkingRepository : asClass(ParkingRepository).singleton(), 
    })



module.exports = container;


