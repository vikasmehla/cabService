const Hapi = require('hapi');
const routeIndex = require('./route/index.js');
const controllerIndex = require('./controller/index.js');
const Inert = require('inert');
const Vision = require('vision');
const hapiSwagger = require('hapi-swagger');
const server =  Hapi.server({ port: 7000, host: 'localhost' });
const databaseConnection = require('./database2.js');

const swaggerOption ={
    info:{
        title:'API'
    }
};

const init = async () => {
   
    try{
        await server.register([
            Inert,
            Vision,
            {
                plugin: hapiSwagger,
                options: swaggerOption
            }
        ]);
        server.route(routeIndex.customerRoute);
        server.route(routeIndex.customerBookingRoute);
        server.route(routeIndex.driverRoute);
        server.route(routeIndex.adminRoute);
       controllerIndex.adminController.createAdmin();
       await databaseConnection.databaseConnection();
  
    await server.start();
   
    }
    catch(error){

        throw error;
    }
};
// process.on('unhandledRejection',(err)=>{
//      console.log(err)
//     process.exit(1);
// })

// process.on('uncaughtException',(err)=>{
//     console.log(err)
//    process.exit(1);
// })

init();

 console.log("server started");
