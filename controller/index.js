const customerController= require('./customerController.js');
const customerBookingController= require('./customerBookingController.js');
const driverController = require('./driverController.js');
const adminController = require('./adminController.js')   

module.exports = {
    customerController: customerController,
    customerBookingController: customerBookingController,
    driverController: driverController,
    adminController: adminController
   
};