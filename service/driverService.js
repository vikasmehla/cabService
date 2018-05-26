const connection = require('../database.js').connection;
const ConstantMsg = require('../constants').errorMessage.eng
const responseSend = require('../library/error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtDecode = require('jwt-decode');
const saltRounds = 10;
const randomize = require('randomatic');

module.exports = {
    emailCheck: async (req) => {
        try {
            return new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM driver  WHERE email=?",[req], (err, rows, fields)=>{
                    if(err){
                        return reject(err);
                    }
                    
                  return    resolve(rows);
                    
                });
            })
        }
        catch (error) {
            return error;
        }
    },
    phoneCheck: async (req) => {
        try {
            return new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM driver  WHERE phone=?",[req], (err, rows, fields)=>{
                    if(err){
                        return reject(err);
                    }
                    
                   return  resolve(rows);
                    
                });
            })
        }
        catch (error) {
            return error;
        }
    },
    createDriver: async (req) => {
        try {
           // let senderid='sanghi';
            // let route='https://control.msg91.com/user/index.php#send_sms';
            // let dialcode='+91';
            // msg91.sendOne(authkey,number,message,senderid,route,dialcode,function(response){
            // console.log(response);
            //
            // console.log("otp:"+message);
            // });
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.password, salt);
            const OTP = randomize('0000');
            console.log("OTP-"+OTP);
            req.phone = req.countrycode+req.phone;
            const driverData ={
                status: 'false',
                otp: OTP,
                username: req.username,
                email: req.email,
                password: hash,
                phone: req.phone,
                city: req.city,
                state: req.state,
                pincode: req.pincode,
                createdat: new Date(),
                modifiedat: new Date(),
            }
           const driverData1 = connection.query('INSERT INTO driver SET ?', driverData)  
           const data = driverData1.values;
           delete data.password;
           delete data.otp;
            return data
        }
        catch (error) {
            return error;
        }
    },
    driverSignInStatusCheck1: async (req) => {
        try {
            const collection10 = await new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM driver  WHERE email=?",[req], (err, rows, fields)=>{
                    if(err){
                        return reject(err);
                    }
                    
                    return    resolve(rows);
                    
                });
            })
           if(collection10[0].status==1){
               return true;
           }
           else{
               return false;
           }
        }
        catch (error) {
            return error;
        }
    },

    resendOTP: async (req)=>{
        try {
            const OTP1 = randomize('0000');
            console.log("OTP-"+OTP1);
            let email4 = req.payload.email;
   const collection33= connection.query("UPDATE driver SET otp = ?  WHERE email=?",[OTP1,email4]);
      if(collection33){
                   return  OTP1
                    }
                    else{
                        return ConstantMsg.problemInOtpUpdation;
                    }
        } catch (error) {
            throw error
        }
    },
    verifyOTP: async (req) =>{
        
        try {
            const collection11 = await new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM driver  WHERE email=?",[req.payload.email], (err, rows, fields)=>{
                    if(err){
                        return reject(err);
                    }
                    
                    return    resolve(rows);
                    
                });
            })
           if(collection11[0].otp==req.payload.otp){
               return true;
           }
           else{
               return false;
           }
            
        }
        catch (error) {
            return ConstantMsg.invalidToken;
        }
    
    },
    updateStatus: async (req)=>{
        try {
        
            let email3 = req.payload.email;
   const collection24= connection.query("UPDATE  driver SET status= true  WHERE email=?",[email3]);
      if(collection24){
                   return  " driver verified successfully"
                    }
                    else{
                        return ConstantMsg.problemInStatusUpdation;
                    }
        } catch (error) {
            throw error
        }
    },
    driverSignInEmailCheck: async (req) => {
        try {
            return new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM driver  WHERE email=?",[req], (err, rows, fields)=>{
                    if(err){
                        return reject(err);
                    }
                    
                    return    resolve(rows);
                    
                });
            })
        }
        catch (error) {
            return error;
        }
    },
    driverSignInStatusCheck: async (req) => {
        try {
            const collection25 = await new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM driver  WHERE email=?",[req.payload.email], (err, rows, fields)=>{
                    if(err){
                        return reject(err);
                    }
                    
                    return    resolve(rows);
                    
                });
            })
           if(collection25[0].status==1){
               return true;
           }
           else{
               return false;
           }
        }
        catch (error) {
            return error;
        }
    },
    driverSignInPasswordCheck: async (req) => {
        try {
                const collection26 = await new Promise( (resolve, reject)=>{
                    connection.query("SELECT * FROM driver  WHERE email=?",[req.payload.email], (err, rows, fields)=>{
                        if(err){
                            return reject(err);
                        }
                        return    resolve(rows);
                    });
                })
                const password4=collection26[0].password;
                const password5= req.payload.password;
                const password6= await bcrypt.compare(password5,password4);
                const id6= collection26[0].driverid;
                const email7 = collection26[0].email;
                const username7 = collection26[0].username;
                 data3 = {
                     id:id6,
                     email:email7,
                     username:username7
                 }
               if(password6==false){
                   return false;
               }
               else{
                   return data3;
               }
            }
        
        catch (error) {
            return error;
        }
    },
    checkToken: async (req) => {
        
        try {
            
            const tokenVerify7 = await jwt.verify(req, 'driver')
            
            console.log(tokenVerify7);
            if (tokenVerify7) {
                const decoded = jwtDecode(req);
                let id12 = decoded.driverid;
                const collection27  = await new Promise( (resolve, reject)=>{
                    connection.query("SELECT * FROM driver  WHERE driverid=?",[id12], (err, rows, fields)=>{
                        if(err){
                            return reject(err);
                        }
                        return    resolve(rows);
                    });
                })
                if (collection27) {
                    return true
                }
                else {
                    return ConstantMsg.invalidToken;
                }
            }

            else {

                return ConstantMsg.invalidToken;
            }
        }
        catch (error) {
            return ConstantMsg.invalidToken;
        }
    },
    updatePasswordByToken: async (req)=>{
        try {
            const decoded = jwtDecode(req.headers.token);
            let id13 = decoded.driverid;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash3 = bcrypt.hashSync(req.payload.password, salt);
            console.log(hash3)
   const collection28= connection.query("UPDATE driver SET password=?  WHERE driverid=?",[hash3,id13]);
      if(collection28){
                   return  "password updated successfully"
                    }
                    else{
                        return ConstantMsg.problemInPasswordUpdation;
                    }
        } catch (error) {
            throw error
        }
    },
    updateAddressByToken: async (req)=>{
        try {
           
            const decoded2 = jwtDecode(req.headers.token);
            let id14 = decoded2.driverid;
           const city2 = req.payload.city;
           const state2 = req.payload.state;
           const pincode2 = req.payload.pincode;
         
   const collection29= connection.query("UPDATE driver SET city=?,state=?,pincode=?  WHERE driverid=?",[city2,state2,pincode2,id14]);
      if(collection29){
                   return  "address updated successfully"
                    }
                    else{
                        return ConstantMsg.problemInAddressUpdation;
                    }
        } catch (error) {
            throw error
        }
    },
    checkValidDriverId: async(req,res)=>{
        try{
            const decoded = jwtDecode(req.headers.token);
            let id16= decoded.driverid;
            console.log(id16)
   const collection32= await new Promise( (resolve, reject)=>{
    connection.query("SELECT * FROM driver  WHERE driverid=? ",[id16], (err, rows, fields)=>{
        if(err){
            return reject(err);
        }
        return    resolve(rows);
    });
})
      if(collection32.length==0){
                   return  false
                    }
                    else{
                        return true
                    }
        }
        catch(error){
           return error;
       }
    },

    driverBookingsByToken: async (req)=>{
        try {
           
            const decoded = jwtDecode(req.headers.token);
            let id15= decoded.driverid;
            const collection31 = await new Promise( (resolve, reject)=>{
                connection.query(" SELECT * FROM driver   LEFT JOIN customerbooking ON driver.driverid = customerbooking.driver_id  WHERE driver.driverid=? LIMIT ? OFFSET ?",[id15,req.payload.limit,req.payload.offset], (err, rows, fields)=>{
                    if(err){
                        return reject(err);
                    }
                    return    resolve(rows);
                });
            })
        
                            return collection31;
                    }

         catch (error) {
            throw error
        }
    },
    
       
};
