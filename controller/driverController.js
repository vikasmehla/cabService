const async=require('async');
const serviceIndex = require('../service/index.js');
const responseSend = require('../library/error');
const ConstantMsg = require('../constants').errorMessage.eng
const jwt = require('jsonwebtoken');

module.exports = {
         driverRegistration: async (req)=>{
             try{
                 
           let status20 = await serviceIndex.driverService.emailCheck(req.payload.email);
           
            if(status20.length==0){
            let status21 = await serviceIndex.driverService.phoneCheck(req.payload.phone);
            if(status21.length==0){
    
          const createDriver=  await serviceIndex.driverService.createDriver(req.payload);
        
            return responseSend.sendSuccess(req.query,createDriver)
          }
           else{
           return ConstantMsg.phoneExist;
           }
             }
           else{
            return ConstantMsg.emailExist;   
            }
             }
             catch(error){
                 return responseSend.sendError(error);
             }

        },
        resendOtp: async (req)=>{
            try{
                let status16 = await serviceIndex.driverService.driverSignInEmailCheck(req.payload.email);
                if(status16==false){
                    return ConstantMsg.userNotExist;         
                     }
                else{
                    let status14 = await serviceIndex.driverService.driverSignInStatusCheck1(req.payload.email);
                if(status14==true){
                    return ConstantMsg.statusAlreadyVerified;
                }
                else{
                    let status15 = await serviceIndex.driverService.resendOTP(req);
                          data4 = {
                              email: req.payload.email,
                              OTP: status15
                          }
                           return responseSend.sendSuccess(req.query,data4)
                
              }
            }
        
        }
            catch(error){
                return responseSend.sendError(error);
            }
        },

        verification: async (req)=>{
            try{
                let status13 = await serviceIndex.driverService.driverSignInEmailCheck(req.payload.email);
                if(status13==false){
                    return ConstantMsg.userNotExist;         
                     }
                else{
                    let status14 = await serviceIndex.driverService.driverSignInStatusCheck1(req.payload.email);
                if(status14==true){
                    return ConstantMsg.statusAlreadyVerified;
                }
                else{
                    let status28 = await serviceIndex.driverService.verifyOTP(req);
                    console.log(status28)
                    if(status28==true){
                           let status5 = await serviceIndex.driverService.updateStatus(req)
                           console.log(status5)
                           return responseSend.sendSuccess(req.query,status5)
                    }
                    else{
                        return ConstantMsg.otpIsNotCorrect;
                    }
                
              }
            }
        }
            catch(error){
                return responseSend.sendError(error);
            }
        },

        driverSignIn: async (req,res)=>{
            try{
          
          let status25 = await serviceIndex.driverService.driverSignInEmailCheck(req.payload.email);
           if(status25==false){
                 return ConstantMsg.userNotExist;         
                  }
            else{
                let status26 = await serviceIndex.driverService.driverSignInStatusCheck(req);
                if(status26==false){
                    return ConstantMsg.statusNotVerified;
                }
                else{
              let status27 = await serviceIndex.driverService.driverSignInPasswordCheck(req);
              if(status27== false){
                  return ConstantMsg.passwordNotExist;
              }
              else{
                  const privatekey = 'driver';
                  const email1 = status27.email;
                  const username2= status27.username
                  const id1 = status27.id;
                  const token5 = jwt.sign({driverid:id1},privatekey, {algorithm:'HS256'})
                  data2 = {
                    username:username2,
                    email:email1,
                    token: token5
                }
                  return responseSend.sendSuccess(req.query,data2)
              } 
            }
        }
        }
            catch(error){
                return responseSend.sendError(error);
            }
 
        },
        updationPasswordByToken: async (req,res)=>{
            try{ 
           const tokenId10 = await serviceIndex.driverService.checkToken(req.headers.token);
           if(tokenId10==true){
          const driverPasswordUpdateByToken= await serviceIndex.driverService.updatePasswordByToken(req);
          return responseSend.sendSuccess(req.query,driverPasswordUpdateByToken)
        }
          else{
              return tokenId10
          }
            }
            catch(error){
                return error;
            }

       },
       updationAddressByToken: async (req,res)=>{
        try{ 
       const tokenId11 = await serviceIndex.driverService.checkToken(req.headers.token);
       if(tokenId11==true){
      const driverAddressUpdateByToken= await serviceIndex.driverService.updateAddressByToken(req);
      return responseSend.sendSuccess(req.query,driverAddressUpdateByToken)
    }
      else{
          return tokenId11
      }
        }
        catch(error){
            return error;
        }

   },
   getAllBookingsOfDriverByToken: async (req,res)=>{
    try{ 
   const tokenId12 = await serviceIndex.driverService.checkToken(req.headers.token);
   if(tokenId12==true){
    let status45 = await serviceIndex.driverService.checkValidDriverId(req); 
    console.log(status45)
    if(status45==false){
     return ConstantMsg.driver_idNotExist; 
    }
    else{
  const driverBookingsByToken= await serviceIndex.driverService.driverBookingsByToken(req);
  return responseSend.sendSuccess(req.query,driverBookingsByToken)
}
   }
  else{
      return tokenId12
  }
    }
    catch(error){
        return error;
    }

},

    };
