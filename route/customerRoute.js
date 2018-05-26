const async =require('async');
const Joi = require('joi');
const controllerIndex = require('../controller/index.js');


module.exports =[
     {
        method: 'POST',
        path: '/customer/customerRegistration',
       
        config: {
            description: 'customer Registration form',
            notes: 'return the customer values',
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
                    phone: Joi.string().min(10).max(12).error(new Error('phone must be between 10 to 12 characters')).required(),
                    city:  Joi.string().min(2).max(20).error(new Error('city not valid')).required(),
                    state:Joi.string().min(2).max(20).error(new Error('state not valid')).required(),
                    pincode:Joi.string().min(2).max(20).error(new Error('pincode not valid')).required()
                    
                
                }
        },
        handler:async  (req, res)=> {
           
           const signup= await controllerIndex.customerController.registration(req);
            return signup;
        }
   }
},
{
    method: 'POST',
    path: '/customer/verifyOTP',
    config: {
        description: 'customer verification form',
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
       const verifyOtp= await controllerIndex.customerController.verification(req);
        return verifyOtp;
    }
}
},
{
    method: 'POST',
    path: '/customer/resendOTP',
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
       const resendOtp= await controllerIndex.customerController.resendOtp(req);
        return resendOtp;
    }
}
},

{
    method: 'POST',
    path: '/customer/customerSignIn',
    config: {
        description: ' customer signIn form',
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
        
      const token2 = await controllerIndex.customerController.customerSignIn(req);
        
         console.log("customer Signin");
        return token2;
    }   
},
{
    method: 'PUT',
    path: '/customer/updateCustomerPasswordByToken',
    
    config: {
     description: 'update customer password form',
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
       
       
     const passwordUpdateByToken = await controllerIndex.customerController.updationPasswordByToken(req);
     
      console.log("update password by token");
     return passwordUpdateByToken;
 }
},
{
    method: 'PUT',
    path: '/customer/updateCustomerAddressByToken',
    
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
       
       
     const addressUpdateByToken = await controllerIndex.customerController.updationAddressByToken(req);
     
      console.log("update address by token");
     return addressUpdateByToken;
 }
},
{
    method: 'POST',
    path: '/customer/getCustomerAndBookingsByToken',
    
    config: {
     description: 'get customer and bookings form',
     notes: 'return the customer and bookings values',
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
 
    handler:async function (req, res) {
       
       
     const getCustomerAndBookingsByToken = await controllerIndex.customerController.getCustomerAndBookingsByToken(req);
     
      console.log("get Customer And Bookings By Token ");
     return getCustomerAndBookingsByToken;
 }
}
]