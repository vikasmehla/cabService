const async =require('async');
const Joi = require('joi');
const controllerIndex = require('../controller/index.js');


module.exports =[
     {
        method: 'POST',
        path: '/driver/driverRegistration',
       
        config: {
            description: 'driver Registration form',
            notes: 'return the driver values',
            tags: ['api'],
            plugins:{
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: {
                    username: Joi.string().min(2).max(15).error(new Error('username must be between 5 to 15 characters')).required(),
                    email: Joi.string().email().min(5).max(20).error(new Error('email must be between 5 to 15 characters')).required(),
                    password: Joi.string().min(5).max(20).error(new Error('password must be between 5 to 15 characters')).required(),
                    countrycode: Joi.string().min(3).max(5).error(new Error('error in countrycode')).required(),
                    phone: Joi.number().integer().error(new Error('phone must be between 10 to 12 characters')).required(),
                    city:  Joi.string().min(2).max(20).error(new Error('city not valid')).required(),
                    state:Joi.string().min(2).max(20).error(new Error('state not valid')).required(),
                    pincode:Joi.string().min(2).max(20).error(new Error('pincode not valid')).required()
                    
                
                }
        },
        handler:async  (req, res)=> {
           
           const driverSignup= await controllerIndex.driverController.driverRegistration(req);
            return driverSignup;
        }
   }
},
{
    method: 'POST',
    path: '/driver/resendOTP',
    config: {
        description: 'resend otp form',
        notes: 'return otp  values',
        tags: ['api'],
        plugins:{
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            payload: {
                email: Joi.string().email().error(new Error('email  required')).required(),
            
            }
    },
    handler:async  (req, res)=> {
       const resendOtp= await controllerIndex.driverController.resendOtp(req);
        return resendOtp;
    }
}
},

{
    method: 'POST',
    path: '/driver/verifyOTP',
    config: {
        description: 'driver verification form',
        notes: 'return the verified  values',
        tags: ['api'],
        plugins:{
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            payload: {
                otp: Joi.number().integer().error(new Error('otp  required ')).required(),
                email: Joi.string().email().error(new Error('email  required')).required(),
            
            }
    },
    handler:async  (req, res)=> {
       const verifyOtp1= await controllerIndex.driverController.verification(req);
        return verifyOtp1;
    }
}
},
{
    method: 'POST',
    path: '/driver/driverSignIn',
    config: {
        description: ' driver signIn form',
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
        
      const token20 = await controllerIndex.driverController.driverSignIn(req);
        
         console.log("driver Signin");
        return token20;
    }   
},
{
    method: 'PUT',
    path: '/driver/updateDriverPasswordByToken',
    
    config: {
     description: 'update driver password form',
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
           password: Joi.string().required()
            
            }
        }
    },
 
    handler:async function (req, res) {
       
       
     const driverPasswordUpdateByToken = await controllerIndex.driverController.updationPasswordByToken(req);
     
      console.log("update password by token");
     return driverPasswordUpdateByToken;
 }
},
{
    method: 'PUT',
    path: '/driver/updateDriverAddressByToken',
    
    config: {
     description: 'update customer address form',
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
                city:  Joi.string().min(2).max(20).error(new Error('city not valid')).required(),
                state:Joi.string().min(2).max(20).error(new Error('state not valid')).required(),
                pincode:Joi.string().min(2).max(20).error(new Error('pincode not valid')).required()
            }
        }
    },
 
    handler:async function (req, res) {
       
       
     const driverAddressUpdateByToken = await controllerIndex.driverController.updationAddressByToken(req);
     
      console.log("update address by token");
     return driverAddressUpdateByToken;
 }
},
{
    method: 'POST',
    path: '/driver/getBookingsOfDriverByToken',
    
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
    const bookingsOfDriverByToken= await controllerIndex.driverController.getAllBookingsOfDriverByToken(req);
    return bookingsOfDriverByToken;
     
       }
       catch(error){
        return error;
    }
 }
            
 
},

]