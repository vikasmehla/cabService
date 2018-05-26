const customerService= require('./customerService.js');
const customerBookingService= require('./customerBookingService.js');
 const driverService = require('./driverService.js')  
const adminService = require('./adminService.js');
module.exports = {
    customerService: customerService,
    customerBookingService: customerBookingService,
    driverService: driverService,
    adminService: adminService
   
};