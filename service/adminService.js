const connection=require('../database.js').connection;
const jwtDecode = require('jwt-decode'); 
const responseSend = require('../library/error');
const ConstantMsg = require('../constants').errorMessage.eng
const jwt = require('jsonwebtoken');
const forEach = require('async-foreach').forEach;
const dataBase=require('../database2.js');
module.exports={
    checkAdmin: async () => {
        try {
            return new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM admin  ", (err, rows, fields)=>{
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
    createAdmin: async () => {
        try {

            // const salt = bcrypt.genSaltSync(saltRounds);
            // const hash = bcrypt.hashSync(vikas, salt);
            
            const adminData ={
                username: 'vikas',
                email: 'vikasmehla@gmail.com',
                password: '123456789' ,
                phone: '9466727173',
                role: 'admin',
                createdat: new Date(),
                modifiedat: new Date(),
            }
         connection.query('INSERT INTO admin SET ?', adminData)  

            return "success"
        }
        catch (error) {
            return error;
        }
    },

    adminSignInEmailCheck: async (req) => {
        try {
            return new Promise( (resolve, reject)=>{
                connection.query("SELECT * FROM admin  WHERE email=?",[req], (err, rows, fields)=>{
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
    adminSignInPasswordCheck: async (req) => {
        try {
                const collection41 = await new Promise( (resolve, reject)=>{
                    connection.query("SELECT * FROM admin  WHERE email=?",[req.payload.email], (err, rows, fields)=>{
                        if(err){
                            return reject(err);
                        }
                        return    resolve(rows);
                    });
                })
                const password4=collection41[0].password;
                const password5= req.payload.password;
               
                const id40= collection41[0].id;
                const email7 = collection41[0].email;
                const username7 = collection41[0].username;
                 data3 = {
                     id:id40,
                     email:email7,
                     username:username7
                 }
               if(password4!=password5){
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
            
            const tokenVerify42 = await jwt.verify(req, 'admin')
            
            console.log(tokenVerify42);
            if (tokenVerify42) {
                const decoded = jwtDecode(req);
                let id42 = decoded.adminid;
                const collection42  = await new Promise( (resolve, reject)=>{
                    connection.query("SELECT * FROM admin  WHERE adminid=?",[id42], (err, rows, fields)=>{
                        if(err){
                            return reject(err);
                        }
                        return    resolve(rows);
                    });
                })
                if (collection42) {
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
    customersByUsername: async(req,res)=>{
        try{
           const collection40  = await new Promise( (resolve, reject)=>{
               connection.query("SELECT * FROM customer  WHERE username=? LIMIT ? OFFSET ? ",[req.payload.username,req.payload.limit,req.payload.offset], (err, rows, fields)=>{
                   if(err){
                       return reject(err);
                   }
                   return    resolve(rows);
               });
           })
         
        return collection40;
        }
        catch(error){
           return error;
       }
    },
    customerDetail: async(req,res)=>{
        try{
           const collection41  = await new Promise( (resolve, reject)=>{
           connection.query("SELECT customer.id, customer.username, customer.email, customer.phone, customerbooking.driver_id, customerbooking.bookingname,bookingaddress.pickuplocation,bookingaddress.droplocation, driver.username, driver.email, driver.phone FROM customer LEFT JOIN customerbooking ON customer.id = customerbooking.customer_id LEFT JOIN bookingaddress ON customerbooking.id = bookingaddress.booking_id  LEFT JOIN driver ON customerbooking.driver_id=driver.driverid WHERE customer.id=?  GROUP BY customer.id ",[ req.payload.customer_id], (err, rows, fields)=>{
                   if(err){
                       return reject(err);
                   }
                   return    resolve(rows);
               });
           })
         console.log(collection41)
        return collection41;
        }
        catch(error){
           return error;
       }
    },
    checkValidBookingId: async(req,res)=>{
        try{
   const collection47= await new Promise( (resolve, reject)=>{
    connection.query("SELECT * FROM customerbooking  WHERE id=? ",[req.payload.booking_id], (err, rows, fields)=>{
        if(err){
            return reject(err);
        }
        return    resolve(rows);
    });
})
   
      if(collection47.length==0){
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
    checkValidDriverId: async(req,res)=>{
        try{
   const collection48= await new Promise( (resolve, reject)=>{
    connection.query("SELECT * FROM driver  WHERE driverid=? ",[req.payload.driver_id], (err, rows, fields)=>{
        if(err){
            return reject(err);
        }
        return    resolve(rows);
    });
})
   
      if(collection48.length==0){
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

    checkBooking: async(req,res)=>{
        try{
   const collection46= await new Promise( (resolve, reject)=>{
    connection.query("SELECT * FROM customerbooking  WHERE id=? ",[req], (err, rows, fields)=>{
        if(err){
            return reject(err);
        }
        return    resolve(rows);
    });
    console.log(collection46)
})
   const booking2 = collection46[0].driver_id;
      if(booking2!=null){
                   return  false
                    }
                    else{
                        return true
                    }
         
        return collection46;
        }
        catch(error){
           return error;
       }
    },

    createBookingHistory1: async (req,res)=>{
        try {
            const id43 = req.payload.booking_id;
            const collection16  = await new Promise( (resolve, reject)=>{
                connection.query(" SELECT * FROM customerbooking  WHERE id=? ",[id43], (err, rows, fields)=>{
                    if(err){
                        return reject(err);
                    }
                    return    resolve(rows);
                });
            })
            console.log(collection16)
        const customerId = collection16[0].customer_id;
            let bookingData3 = {
                customer_id: customerId,
                driver_id: req.payload.driver_id,
              booking_id: id43,
                assignedat: new Date()
            }
            const creatingBookingHistoryCollection1=  await db.collection('bookinghistory').insertOne(bookingData3);
                return creatingBookingHistoryCollection1
        } catch (error) {
            console.log(error)   
        }
       
    },

    assignDriver: async(req,res)=>{
        try{
   const collection8= connection.query("UPDATE  customerbooking SET driver_id = ?  WHERE id=?",[req.payload.driver_id,req.payload.booking_id]);
      if(collection8){
        const collection70 = await new Promise( (resolve, reject)=>{
            connection.query("SELECT * FROM driver  WHERE driverid=?",[req.payload.driver_id], (err, rows, fields)=>{
                if(err){
                    return reject(err);
                }
                return    resolve(rows);
            });
        })
        const username8= collection70[0].username;
        const email8 = collection70[0].email;
        const phone8 = collection70[0].phone;
          data2 = {
              driver_id: req.payload.driver_id,
              booking_id: req.payload.booking_id,
              driverName: username8,
              driverEmail: email8,
              driverPhone: phone8
          }
                   return  data2
                    }
                    else{
                        return ConstantMsg.problemInAssigningDriver;
                    }
        }
        catch(error){
           return error;
       }
    },
    customersAll: async(req,res)=>{
        try{
           const collection42  = await new Promise( (resolve, reject)=>{
               connection.query("SELECT * FROM customer LIMIT ? OFFSET ? ",[req.payload.limit,req.payload.offset], (err, rows, fields)=>{
                   if(err){
                       return reject(err);
                   }
                   return    resolve(rows);
               });
           })
         
        return collection42;
        }
        catch(error){
           return error;
       }
    },
    driversAll: async(req,res)=>{
        try{
           const collection43  = await new Promise( (resolve, reject)=>{
             
               connection.query("SELECT * FROM driver LIMIT ? OFFSET ? ",[req.payload.limit,req.payload.offset], (err, rows, fields)=>{
                   if(err){
                       return reject(err);
                   }
                   return    resolve(rows);
               });
           })
         
        return collection43;
        }
        catch(error){
           return error;
       }
    },
    getAllDriverAllottedBookings: async(req,res)=>{
        try{
           const collection44  = await new Promise( (resolve, reject)=>{
           
               connection.query( " SELECT customerbooking.id, customerbooking.driver_id, customerbooking.customer_id, customerbooking.bookingname, driver.username AS driverName, driver.email AS driverEmail, driver.phone AS driverPhone FROM customerbooking   LEFT JOIN driver ON customerbooking.driver_id = driver.driverid  LIMIT ? OFFSET ? ",[req.payload.limit,req.payload.offset], (err, rows, fields)=>{
                   if(err){
                       return reject(err);
                   }
                   return    resolve(rows);
               });
           })
           let obj = []
          forEach(collection44, function(item, index, arr) {
               if(item.driver_id!=0){
                console.log(item)
                obj.push(item)
               }
              
          });
          return obj
        }
        catch(error){
           return error;
       }
    },

    bookingsAllFree: async(req,res)=>{
        try{
           const collection60  = await new Promise( (resolve, reject)=>{
             console.log(req.payload)
               connection.query("SELECT * FROM customerbooking WHERE driver_id = 0 LIMIT ? OFFSET ? ",[req.payload.limit,req.payload.offset], (err, rows, fields)=>{
                   if(err){
                       return reject(err);
                   }
                   return    resolve(rows);
               });
           })
        return collection60;
        }
        catch(error){
           return error;
       }
    },

    driversByUsername: async(req,res)=>{
        try{
           const collection49 = await new Promise( (resolve, reject)=>{
               connection.query("SELECT * FROM driver  WHERE username=? LIMIT ? OFFSET ? ",[req.payload.username,req.payload.limit,req.payload.offset], (err, rows, fields)=>{
                   if(err){
                       return reject(err);
                   }
                   return    resolve(rows);
               });
           })
         
        return collection49;
        }
        catch(error){
           return error;
       }
    },
    checkValidCustomerId: async(req,res)=>{
        try{
   const collection50= await new Promise( (resolve, reject)=>{
    connection.query("SELECT * FROM customer  WHERE id=? ",[req.payload.customer_id], (err, rows, fields)=>{
        if(err){
            return reject(err);
        }
        return    resolve(rows);
    });
})
   
      if(collection50.length==0){
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
    checkBookingHistory: async(req,res)=>{
        try{
            console.log(req.payload.customer_id)
            console.log(req.payload.booking_id)
            const collection51=await db.collection('bookinghistory').find({'customer_id':parseInt(req.payload.customer_id),'booking_id':parseInt(req.payload.booking_id)}).toArray();
            console.log(collection51)
            return collection51
          
        }
        catch(error){
           return error;
       }
    },
    checkBookingsHistoryOfCustomer: async(req,res)=>{
        try{
            console.log(req.payload.customer_id)
           const customer2 =parseInt( req.payload.customer_id);
            const collection52=await db.collection('bookinghistory').find({'customer_id':customer2}).limit(req.payload.limit).skip(req.payload.skip).toArray();
            
            console.log(collection52)
            return collection52;
          
        }
        catch(error){
           return error;
       }
    },

    globalSearch4: async(req,res)=>{
         try{
        // let userNameSearch=req.payload.username
        // console.log(userNameSearch)
        //    const collection53  = await new Promise( (resolve, reject)=>{
        //        connection.query("SELECT * FROM customer WHERE username LIKE"+'%'+userNameSearch+'%',[], (err, rows, fields)=>{
        //            if(err){
        //                return reject(err);
        //            }
        //            return    resolve(rows);
        //        });
        //    })
              const collection53  = await new Promise( (resolve, reject)=>{
                  connection.query("SELECT * FROM customer WHERE username =?",[req.payload.username], (err, rows, fields)=>{
                      if(err){
                          return reject(err);
                      }
                      return    resolve(rows);
                  });
              })
              let obj1 = []
              forEach(collection53, async function(item, index, arr) {
                    const id45 = collection53[index].id;
                    console.log(id45)
                  const collection54  = await new Promise( (resolve, reject)=>{
                   connection.query(" SELECT customer.id AS customerId, customer.username, customer.phone, customer.email,customerbooking.id AS bookingId, customerbooking.driver_id  FROM customer   LEFT JOIN customerbooking ON customer.id = customerbooking.customer_id  WHERE customer.id=?",[id45], (err, rows, fields)=>{
                       if(err){
                           return reject(err);
                       }
                       return    resolve(rows);
                   });
               })
               console.log("00000000",collection54)
                    obj1.push(collection54)
                   
                  
              });
              console.log(obj1)
              return obj1
        }
    
        catch(error){
           return error;
       }
    },
    globalSearch6: async(req,res)=>{
        try{
           const collection55  = await new Promise( (resolve, reject)=>{
               connection.query("SELECT * FROM driver WHERE username = ?  ",[req.payload.username], (err, rows, fields)=>{
                   if(err){
                       return reject(err);
                   }
                   return    resolve(rows);
               });
           })
           const id46 = collection55[0].driverid;

           const collection56  = await new Promise( (resolve, reject)=>{
            connection.query(" SELECT * FROM driver   LEFT JOIN customerbooking ON driver.driverid = customerbooking.driver_id  WHERE driver.driverid=?",[id46], (err, rows, fields)=>{
                if(err){
                    return reject(err);
                }
                return    resolve(rows);
            });
        })
        console.log(collection56)
        return collection56;
        }
        catch(error){
           return error;
       }
    },
};