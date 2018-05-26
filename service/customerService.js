const connection = require('../database.js').connection;
const ConstantMsg = require('../constants').errorMessage.eng
const responseSend = require('../library/error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtDecode = require('jwt-decode');
const saltRounds = 10;
const randomize = require('randomatic');
const authkey = '205078An9jDkwbxc5ab33f8a';
const msg91 = require('msg91');
module.exports = {
    emailCheck: async (req) => {
        try {
            return new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM customer  WHERE email=?",[req], (err, rows, fields)=>{
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
                connection.query("SELECT * FROM customer  WHERE phone=?",[req], (err, rows, fields)=>{
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
    createUser: async (req) => {
        try {
            const OTP = randomize('0000');
            console.log("OTP-"+OTP);
        //     let number = req.phone;
        //     let message = OTP;
        //    let senderid='vikas1';
          // http://control.msg91.com/api/sendotp.php?authkey=yourauth&message=your%20verification%20code%20is%20%23%23OTP%23%23&sender=OTPSMS&mobile=918818888763
        //     let route='https://control.msg91.com/user/index.php#send_sms';
        //     let dialcode='91';
        //     msg91.sendone(authkey,number,message,senderid,route,dialcode,function(response){
        //     console.log(response);
            
        //     console.log("otp:"+message);
        //    });
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.password, salt);
            req.phone = req.countrycode+req.phone;
            const customerData ={
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
           const customerData1 = connection.query('INSERT INTO customer SET ?', customerData)  
           const data = customerData1.values
           delete data.password
           delete data.otp
            return data
        }
        catch (error) {
            return error;
        }
    },
    customerSignInStatusCheck1: async (req) => {
        try {
            const collection10 = await new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM customer  WHERE email=?",[req], (err, rows, fields)=>{
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
            let email3 = req.payload.email;
   const collection2= connection.query("UPDATE  customer SET otp = ?  WHERE email=?",[OTP1,email3]);
      if(collection2){
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
                connection.query("SELECT * FROM customer  WHERE email=?",[req.payload.email], (err, rows, fields)=>{
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
        
            let email2 = req.payload.email;
   const collection2= connection.query("UPDATE  customer SET status= true  WHERE email=?",[email2]);
      if(collection2){
                   return  "verified successfully"
                    }
                    else{
                        return ConstantMsg.problemInStatusUpdation;
                    }
        } catch (error) {
            throw error
        }
    },
    customerSignInEmailCheck: async (req) => {
        try {
            return new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM customer  WHERE email=?",[req], (err, rows, fields)=>{
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
    customerSignInStatusCheck: async (req) => {
        try {
            const collection4 = await new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM customer  WHERE email=?",[req.payload.email], (err, rows, fields)=>{
                    if(err){
                        return reject(err);
                    }
                    
                    return    resolve(rows);
                    
                });
            })
           if(collection4[0].status==1){
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
    customerSignInPasswordCheck: async (req) => {
        try {
                const collection5 = await new Promise( (resolve, reject)=>{
                    connection.query("SELECT * FROM customer  WHERE email=?",[req.payload.email], (err, rows, fields)=>{
                        if(err){
                            return reject(err);
                        }
                        return    resolve(rows);
                    });
                })
                const password3=collection5[0].password;
                const password1= req.payload.password;
                const password2 = await bcrypt.compare(password1,password3);
                const id1= collection5[0].id;
                const email7 = collection5[0].email;
                const username7 = collection5[0].username;
                 data3 = {
                     id:id1,
                     email:email7,
                     username:username7
                 }

               if(password2==false){
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
            
            const tokenVerify = await jwt.verify(req, 'customer')
            
            console.log(tokenVerify);
            if (tokenVerify) {
                const decoded = jwtDecode(req);
                let id2 = decoded.id;
                const collection6  = await new Promise( (resolve, reject)=>{
                    connection.query("SELECT * FROM customer  WHERE id=?",[id2], (err, rows, fields)=>{
                        if(err){
                            return reject(err);
                        }
                        return    resolve(rows);
                    });
                })
                if (collection6) {
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
            let id3 = decoded.id;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash2 = bcrypt.hashSync(req.payload.password, salt);
            console.log(hash2)
   const collection7= connection.query("UPDATE  customer SET password=?  WHERE id=?",[hash2,id3]);
      if(collection7){
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
            const decoded = jwtDecode(req.headers.token);
            let id4 = decoded.id;
           const city1 = req.payload.city;
           const state1 = req.payload.state;
           const pincode1 = req.payload.pincode;
   const collection8= connection.query("UPDATE  customer SET city=?,state=?,pincode=?  WHERE id=?",[city1,state1,pincode1,id4]);
      if(collection8){
                   return  "address updated successfully"
                    }
                    else{
                        return ConstantMsg.problemInAddressUpdation;
                    }
        } catch (error) {
            throw error
        }
    },
    customerAndBookingsByToken: async (req)=>{
        try {
           
            const decoded = jwtDecode(req.headers.token);
            let id5= decoded.id;
            const collection9  = await new Promise( (resolve, reject)=>{
                connection.query(" SELECT * FROM customer   LEFT JOIN customerbooking ON customer.id = customerbooking.customer_id  WHERE customer.id=? LIMIT ? OFFSET ?",[id5,req.payload.limit,req.payload.offset], (err, rows, fields)=>{
                    if(err){
                        return reject(err);
                    }
                    return    resolve(rows);
                });
            })
        
                            return collection9;
                    }

         catch (error) {
            throw error
        }
    },
    
    
       
};
