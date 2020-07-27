const {asClass,createContainer,asFunction,asValue} = require('awilix');

//app start
const StartUp = require('./startup');
const Server = require('./server');
const config = require('../config/environments');

//Routes
const Routes = require('./routes');
const UserRoutes = require('./routes/user.routes');
const MenuRoutes = require('./routes/menu.routes');

//Controllers
const { UserController, 
    MenuController} = require('./controllers');

//Middleware
const {AuthMiddleware} =require('./middlewares')

//Service
const {MenuService,
    UserService} = require('./../services');

//Domain
const {MenuBusiness,
    UserBusiness} = require('./../domain');

//Repository
const {MenuRepository,
    UserRepository} = require('./../dal/repositories');

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
    //Api Controller
        UserController : asClass(UserController).singleton(),
        MenuController : asClass(MenuController).singleton(),        
    })
    .register({
        //Middleware
            AuthMiddleware : asClass(AuthMiddleware).singleton(),
    }) 
    .register({
        //Service
            UserService : asClass(UserService).singleton(),
            MenuService : asClass(MenuService).singleton(),
    })    
    .register({
        //Domain
            UserBusiness : asClass(UserBusiness).singleton(),
            MenuBusiness : asClass(MenuBusiness).singleton(),
    })
    .register({
        //Repository
            UserRepository : asClass(UserRepository).singleton(),
            MenuRepository : asClass(MenuRepository).singleton(),
    })



module.exports = container;
