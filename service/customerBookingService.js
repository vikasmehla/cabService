const connection=require('../database.js').connection;
const jwtDecode = require('jwt-decode'); 
const responseSend = require('../library/error');
const ConstantMsg = require('../constants').errorMessage.eng
const jwt = require('jsonwebtoken');
const dataBase=require('../database2.js');
//const ObjectID = require('mongodb').ObjectID;
module.exports={
    checkToken: async (req) => {
        try {
            const tokenVerify1 = await jwt.verify(req, 'customer')
            if (tokenVerify1) {
                let id6 = tokenVerify1.id;
                const collection9  = await new Promise( (resolve, reject)=>{
                    connection.query("SELECT * FROM customerbooking  WHERE customer_id=?",[id6], (err, rows, fields)=>{
                        if(err){
                            return reject(err);
                        }
                        return    resolve(rows);
                    });
                })
                if (collection9) {
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
    checkCancelStatus: async (req) => {
        try {
            const decoded = jwtDecode(req.headers.token);
            let id9 = decoded.id;
          const collection15 =  await new Promise( (resolve, reject)=>{
              connection.query("SELECT * FROM customerbooking  WHERE customer_id=? AND bookingname = ?",[id9,req.payload.bookingname], (err, rows, fields)=>{
                  if(err){
                      return reject(err);
                  }
                  return    resolve(rows);
              });
          })
          if(collection15[0].cancelstatus==1){
                  return true;
              } 
              else
              {
                 return false;
              }
        }
        catch (error) {
           
            return ConstantMsg.invalidToken;
        }
    },

   checkBooking: async (req,res) => {
    try{
      const decoded = jwtDecode(req.headers.token);
      let id7 = decoded.id
      const  bookingname1= req.payload.bookingname;
    const collection11 =  await new Promise( (resolve, reject)=>{
        connection.query("SELECT * FROM customerbooking  WHERE (customer_id=? AND bookingname = ?)",[id7, bookingname1], (err, rows, fields)=>{
            if(err){
                return reject(err);
            }
            return    resolve(rows);
        });
    })
    console.log(collection11)
    if(collection11.length==0){
            return true;
        } 
        else
        {
           return false;
        }
    }
    catch(error){
     
        return error;
    }
     }, 

createBooking: async (req,res)=>{
    try {
        const decoded = jwtDecode(req.headers.token);
        console.log(decoded)
        const  id8 = decoded.id;
        let bookingData = {
            customer_id:id8,
            bookingtype:req.payload.bookingtype,
            bookingname:req.payload.bookingname,
            createdat: new Date(),
            modifiedat: new Date()
        }
        const customerBookingData = await new Promise( (resolve, reject)=>{
            connection.query("INSERT INTO customerbooking SET ?" ,[bookingData], (err, rows, fields)=>{
                if(err){
                    return reject(err);
                }
                return    resolve(rows);
            });
        })
            return customerBookingData
    } catch (error) {
        console.log(error)   
    }
   
},
createBookingHistory: async (req,res)=>{
    try {
        const decoded = jwtDecode(req.headers.token);
        console.log(decoded)
        const  id10 = decoded.id;
        let bookingData2 = {
            customer_id:id10,
            booking_id:req.payload.booking_id,
            pickuplocation: req.payload.pickuplocation,
            droplocation: req.payload.droplocation,
            createdat: new Date()
        }
        const creatingBookingHistoryCollection=  await db.collection('bookinghistory').insertOne(bookingData2);
            return creatingBookingHistoryCollection
    } catch (error) {
        console.log(error)   
    }
   
},

createBookingAddress: async (req,res)=>{
    try {
        let bookingData1 = {
            booking_id:req.payload.booking_id,
           pickuplocation: req.payload.pickuplocation,
           droplocation: req.payload.droplocation,
            createdat: new Date(),
            modifiedat: new Date()
        }
        const customerBookingData1 = connection.query('INSERT INTO bookingaddress SET ?', [bookingData1])  
            return customerBookingData1.values
    } catch (error) {
        console.log(error)   
    }
   
},
createBookingHistory1: async (req,res)=>{
    try {
        const decoded = jwtDecode(req.headers.token);
        console.log(decoded)
        const  id11 = decoded.id;
        const bookingname4 = req.payload.bookingname;
        const collection16  = await new Promise( (resolve, reject)=>{
            connection.query(" SELECT * FROM customerbooking  WHERE customer_id=? AND bookingname=?",[id11, bookingname4], (err, rows, fields)=>{
                if(err){
                    return reject(err);
                }
                return    resolve(rows);
            });
        })
    const customerBooking = collection16[0].id;
        let bookingData3 = {
            customer_id:id11,
            booking_id: customerBooking,
            modifiedat: new Date()
        }
        const creatingBookingHistoryCollection1=  await db.collection('bookinghistory').insertOne(bookingData3);
            return creatingBookingHistoryCollection1
    } catch (error) {
        console.log(error)   
    }
   
},

updateBookingTypeByToken: async (req)=>{
    try {
        const decoded = jwtDecode(req.headers.token);
        let id5 = decoded.id;
        const bookingname3 = req.payload.bookingname;
        const bookingtype1 = req.payload.bookingtype;
const collection10= connection.query("UPDATE  customerbooking SET bookingtype=?  WHERE customer_id=? AND bookingname=?",[bookingtype1,id5,bookingname3]);
  if(collection10){
               return  "booking type updated successfully"
                }
                else{
                    return ConstantMsg.problemInBookingTypeUpdation;
                }
    } catch (error) {
        throw error
    }
},
bookingsByToken: async(req,res)=>{
     try{
        const decoded = jwtDecode(req.headers.token);
        const  id6 = decoded.id;
        const collection12  = await new Promise( (resolve, reject)=>{
            connection.query(" SELECT * FROM customerbooking   LEFT JOIN bookingaddress ON customerbooking.id = bookingaddress.booking_id  WHERE customerbooking.customer_id=? LIMIT ? OFFSET ?",[id6,req.payload.limit,req.payload.offset], (err, rows, fields)=>{
                if(err){
                    return reject(err);
                }
                return    resolve(rows);
            });
        })
     return collection12;
     }
     catch(error){
        return error;
    }
 },

 

 cancelBookingByToken: async(req,res)=>{
    try{
        const decoded = jwtDecode(req.headers.token);
        const  id7 = decoded.id;
        
    const collection13 = await  connection.query("UPDATE customerbooking SET cancelstatus = true WHERE customer_id = ? AND bookingname = ?",[id7,req.payload.bookingname])
    if(collection13){
        return  "booking cancelled  successfully"
         }
         else{
             return ConstantMsg.problemInCancelationBooking;
         }
        }
    catch(error){
        return error;
    }
},
createBookingHistory2: async (req,res)=>{
    try {
        const decoded = jwtDecode(req.headers.token);
        console.log(decoded)
        const  id12 = decoded.id;
        const bookingname5 = req.payload.bookingname;
        const collection17  = await new Promise( (resolve, reject)=>{
            connection.query(" SELECT * FROM customerbooking  WHERE customer_id=? AND bookingname=?",[id12, bookingname5], (err, rows, fields)=>{
                if(err){
                    return reject(err);
                }
                return    resolve(rows);
            });
        })
    const customerBooking1 = collection17[0].id;
        let bookingData4 = {
            customer_id:id12,
            booking_id: customerBooking1,
            canceledat: new Date()
        }
        const creatingBookingHistoryCollection2=  await db.collection('bookinghistory').insertOne(bookingData4);
            return creatingBookingHistoryCollection2
    } catch (error) {
        console.log(error)   
    }
   
},
}



   
