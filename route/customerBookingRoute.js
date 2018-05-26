const async =require('async');
const Joi = require('joi');
const controllerIndex = require('../controller');


module.exports =[
     {
        method: 'POST',
        path: '/booking/addBooking',
       
        config: {
            description: 'addBooking form',
            notes: 'return booking values',
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
                   
                   bookingtype : Joi.string().min(2).max(15).error(new Error('booking type must be between 2 to 15 characters')).required(),
                   bookingname: Joi.string().min(5).max(15).error(new Error('booking name must be between 5 to 15 characters')).required(),
                   pickuplocation: Joi.string().min(5).max(15).error(new Error('pickup location must be between 5 to 15 characters')).required(),
                   droplocation: Joi.string().min(5).max(15).error(new Error('drop location must be between 5 to 15 characters')).required(),
                   seats:Joi.number().integer().max(5).error(new Error('maximum seats allowed are 5')).required(),
                }
            }
        },
        handler:async function (req, res) {
            try{
               
           const addingBooking= await controllerIndex.customerBookingController.registeringBooking(req);
            
            return addingBooking;
            }
            catch(error){
              
                return error;
            }
        }
   },
{
   method: 'PUT',
   path: '/booking/updateBookingTypeByToken',
   
   config: {
    description: 'update booking type form',
    notes: 'return the updated values',
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
            bookingtype : Joi.string().min(2).max(15).error(new Error('booking type must be between 2 to 15 characters')).required(),
            bookingname: Joi.string().min(2).max(15).error(new Error('booking name must be between 5 to 15 characters')).required(),
           
           }
       }
   },

   handler:async function (req, res) {
       try{
  const updateBookingTypeByToken=  await controllerIndex.customerBookingController.updationBookingTypeByToken(req);
    
    
    return updateBookingTypeByToken
       }
       catch(error){
        return error;
    }
}
}, 
{
    method: 'POST',
    path: '/booking/getAllBookingsByToken',
    
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
    const bookingsByToken= await controllerIndex.customerBookingController.getAllBookingsByToken(req);
    return bookingsByToken;
     
       }
       catch(error){
        return error;
    }
 }
            
 
},
{
    method: 'PUT',
    path: '/booking/cancelBookingByToken',
    
    config: {
        description: 'cancel booking form',
        notes: 'return the cancel values',
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
            payload:{
                bookingname: Joi.string().min(2).max(15).error(new Error('booking name must be between 5 to 15 characters')).required(),
            }
        }
    },
    
    handler: async function (req, res) {
      try{ 
          
   const cancelBookingByToken = await controllerIndex.customerBookingController.cancelBookingByToken(req);
     return cancelBookingByToken
      }
      catch(error){
        return error;
    }
 }
            
 
}
]