const async =require('async');
const Joi = require('joi');
const controllerIndex = require('../controller/index.js');

module.exports = [
    {
        method: 'POST',
        path: '/admin/adminSignIn',
        config: {
            description: ' admin signIn form',
                notes: 'return the token  values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            
            validate: {
                payload: {
                    
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                }
            }
        },
        handler: async function (req, res) {
            
          const adminSignIn = await controllerIndex.adminController.adminSignIn(req);
            
             console.log("admin Signin");
            return adminSignIn;
        }   
    },
    {
        method: 'POST',
        path: '/admin/getAllCustomersByName',
        
        config: {
            description: 'get all customers form',
                notes: 'return all customers values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    username : Joi.string().min(2).max(15).error(new Error('username must be between 2 to 15 characters')).required(),
                    limit : Joi.number().integer().default(5),
                    offset : Joi.number().integer().default(0)
                   
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const customersByName= await controllerIndex.adminController.getAllCustomersByName(req);
        return customersByName;
         
           }
           catch(error){
            return error;
        }
     }
                
     
    },
    {
        method: 'POST',
        path: '/admin/getCustomerDetail',
        
        config: {
            description: 'get customer detail form',
                notes: 'return customer values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    customer_id : Joi.number().integer().error(new Error(' must be between 2 to 15 characters')).required()
                   
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const customerDetail= await controllerIndex.adminController.getCustomerDetail(req);
        return customerDetail;
         
           }
           catch(error){
            return error;
        }
     }
                
     
    },
    {
        method: 'PUT',
        path: '/admin/assignDriver',
        
        config: {
            description: 'assign driver form  ',
                notes: 'return driver values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    booking_id : Joi.string().error(new Error('enter valid booking id')).required(),
                    driver_id : Joi.string().error(new Error(' enter valid driver id')).required()
                   
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const assignDriver= await controllerIndex.adminController.assignDriver(req);
        return assignDriver;
         
           }
           catch(error){
            return error;
        }
     }
                
     
    },
    {
        method: 'POST',
        path: '/admin/getAllCustomers',
        
        config: {
            description: 'get all customers form',
                notes: 'return all customers values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    limit : Joi.number().integer().default(5),
                    offset : Joi.number().integer().default(0)
                   
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const customers= await controllerIndex.adminController.getAllCustomers(req);
        return customers;
         
           }
           catch(error){
            return error;
        }
     }
                
     
    },
    {
        method: 'POST',
        path: '/admin/getAllDrivers',
        
        config: {
            description: 'get all driver form',
                notes: 'return all driver values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    limit : Joi.number().integer().default(5),
                    offset : Joi.number().integer().default(0)
                   
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const drivers= await controllerIndex.adminController.getAllDrivers(req);
        return drivers;
         
           }
           catch(error){
            return error;
        }
     }
    },
    {
        method: 'POST',
        path: '/admin/getAllBookingsDriverAllotted',
        
        config: {
            description: 'get all bookings form',
                notes: 'return all bookings values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    limit : Joi.number().integer().default(5),
                    offset : Joi.number().integer().default(0)
                   
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const bookings= await controllerIndex.adminController.getAllDriverAllottedBookings(req);
        return bookings;
         
           }
           catch(error){
            return error;
        }
     }
    },
    {
        method: 'POST',
        path: '/admin/getAllBookingsDriverNotAllotted',
        
        config: {
            description: 'get all bookings driver not allotted form',
                notes: 'return all free bookings values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    limit : Joi.number().integer().default(5),
                    offset : Joi.number().integer().default(0)
                   
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const freeBookings= await controllerIndex.adminController.getAllFreeBookings(req);
        return freeBookings;
         
           }
           catch(error){
            return error;
        }
     }
    },
    {
        method: 'POST',
        path: '/admin/getAllDriversByName',
        
        config: {
            description: 'get all driver form',
                notes: 'return all driver values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    username : Joi.string().min(2).max(15).error(new Error('username must be between 2 to 15 characters')).required(),
                    limit : Joi.number().integer().default(5),
                    offset : Joi.number().integer().default(0)
                   
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const driversByName= await controllerIndex.adminController.getAllDriversByName(req);
        return driversByName;
         
           }
           catch(error){
            return error;
        }
     }
                
     
    },
    {
        method: 'POST',
        path: '/admin/historyOfCustomerAndBooking',
        
        config: {
            description: 'get all history of customer and booking form',
                notes: 'return all  history of customer and booking values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    customer_id : Joi.string().error(new Error('enter valid customer id')).required(),
                    booking_id : Joi.string().error(new Error(' enter valid booking id')).required()
                   
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const historyOfCustomerAndBooking= await controllerIndex.adminController.historyOfCustomerAndBooking(req);
        return historyOfCustomerAndBooking;
         
           }
           catch(error){
            return error;
        }
     }
                
     
    },
    {
        method: 'POST',
        path: '/admin/historyOfAllBookingOfCustomer',
        
        config: {
            description: 'get history of all booking of customer form',
                notes: 'return   history of all booking of customer values',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    customer_id : Joi.string().error(new Error('enter valid customer id')).required(),
                    limit : Joi.number().integer().default(5),
                    skip : Joi.number().integer().default(0)
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const historyOfBookingsOfCustomer= await controllerIndex.adminController.historyOfBookingsOfCustomer(req);
        return historyOfBookingsOfCustomer;
         
           }
           catch(error){
            return error;
        }
     }
                
     
    },
    {
        method: 'POST',
        path: '/admin/globalSearch',
        
        config: {
            description: 'global Search',
                notes: 'return   username value',
                tags: ['api'],
                plugins:{
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                    username : Joi.string().error(new Error('enter valid username')).required(),
                    limit : Joi.number().integer().default(5),
                    offset : Joi.number().integer().default(0)
                   }
            }
        },
        
        handler: async function (req, res) {
           try{
        const globalSearch1= await controllerIndex.adminController.globalSearch2(req);
        return globalSearch1;
         
           }
           catch(error){
            return error;
        }
     }
                
     
    },


]
