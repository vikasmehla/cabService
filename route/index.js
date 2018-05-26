const customerRoute= require('./customerRoute.js');
const customerBookingRoute= require('./customerBookingRoute.js');
const driverRoute = require('./driverRoute.js')
const adminRoute = require('./adminRoute.js')
//const allRoutes=[].concat(customerRoute,customerBookingRoute)
//module.exports = allRoutes;
module.exports = {
    customerRoute: customerRoute,
    customerBookingRoute: customerBookingRoute,
    driverRoute: driverRoute,
    adminRoute: adminRoute
}
