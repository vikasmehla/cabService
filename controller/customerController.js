const async=require('async');
const serviceIndex = require('../service/index.js');
const responseSend = require('../library/error');
const ConstantMsg = require('../constants').errorMessage.eng
const jwt = require('jsonwebtoken');

module.exports = {
         registration: async (req)=>{
             try{
                 
           let status1 = await serviceIndex.customerService.emailCheck(req.payload.email);
           
            if(status1.length==0){
            let status2 = await serviceIndex.customerService.phoneCheck(req.payload.phone);
            if(status2.length==0){
    
          const createCustomer=  await serviceIndex.customerService.createUser(req.payload);
        
            return responseSend.sendSuccess(req.query,createCustomer)
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
                let status16 = await serviceIndex.customerService.customerSignInEmailCheck(req.payload.email);
                if(status16==false){
                    return ConstantMsg.userNotExist;         
                     }
                else{
                    let status14 = await serviceIndex.customerService.customerSignInStatusCheck1(req.payload.email);
                if(status14==true){
                    return ConstantMsg.statusAlreadyVerified;
                }
                else{
                    let status15 = await serviceIndex.customerService.resendOTP(req);
                          data3 = {
                              email: req.payload.email,
                              OTP: status15
                          }
                           return responseSend.sendSuccess(req.query,data3)
                
              }
            }
        
        }
            catch(error){
                return responseSend.sendError(error);
            }
        },


        verification: async (req)=>{
            try{
                let status13 = await serviceIndex.customerService.customerSignInEmailCheck(req.payload.email);
                if(status13==false){
                    return ConstantMsg.userNotExist;         
                     }
                else{
                    let status14 = await serviceIndex.customerService.customerSignInStatusCheck1(req.payload.email);
                if(status14==true){
                    return ConstantMsg.statusAlreadyVerified;
                }
                else{
                    let status15 = await serviceIndex.customerService.verifyOTP(req);
                    console.log(status15)
                    if(status15==true){
                           let status5 = await serviceIndex.customerService.updateStatus(req)
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

        customerSignIn: async (req,res)=>{
            try{
          
          let status6 = await serviceIndex.customerService.customerSignInEmailCheck(req.payload.email);
           if(status6==false){
                 return ConstantMsg.userNotExist;         
                  }
            else{
                let status7 = await serviceIndex.customerService.customerSignInStatusCheck(req);
                if(status7==false){
                    return ConstantMsg.statusNotVerified;
                }
                else{
              let status8 = await serviceIndex.customerService.customerSignInPasswordCheck(req);
              if(status8== false){
                  return ConstantMsg.passwordNotExist;
              }
              else{
                  const privatekey = 'customer';
                  const email1 = status8.email;
                  const username2= status8.username
                  const id1 = status8.id;

                  const token2 = jwt.sign({id:id1},privatekey, {algorithm:'HS256'})
                  data2 = {
                      username:username2,
                      email:email1,
                      token: token2
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
           const tokenId = await serviceIndex.customerService.checkToken(req.headers.token);
           if(tokenId==true){
          const passwordUpdateByToken= await serviceIndex.customerService.updatePasswordByToken(req);
          return responseSend.sendSuccess(req.query,passwordUpdateByToken)
        }
          else{
              return tokenId
          }
            }
            catch(error){
                return error;
            }

       },
       updationAddressByToken: async (req,res)=>{
        try{ 
       const tokenId1 = await serviceIndex.customerService.checkToken(req.headers.token);
       if(tokenId1==true){
      const addressUpdateByToken= await serviceIndex.customerService.updateAddressByToken(req);
      return responseSend.sendSuccess(req.query,addressUpdateByToken)
    }
      else{
          return tokenId1
      }
        }
        catch(error){
            return error;
        }

   },
   getCustomerAndBookingsByToken: async (req,res)=>{
    try{ 
   const tokenId4 = await serviceIndex.customerService.checkToken(req.headers.token);
   if(tokenId4==true){
  const customerAndBookingsByToken= await serviceIndex.customerService.customerAndBookingsByToken(req);
  return responseSend.sendSuccess(req.query,customerAndBookingsByToken)
}
  else{
      return tokenId4
  }
    }
    catch(error){
        return error;
    }

},
    };
