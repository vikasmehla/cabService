const async = require('async');
const serviceIndex = require('../service');
const responseSend = require('../library/error');
const ConstantMsg = require('../constants').errorMessage.eng
const jwt = require('jsonwebtoken');


module.exports = {
    createAdmin: async () =>{
        try{
           let status10 = await serviceIndex.adminService.checkAdmin();
           if(status10.length!=0){
            return ConstantMsg.adminExist;
           }
           else {
            let status11 = await serviceIndex.adminService.createAdmin();
            return responseSend.sendSuccess(req.query,status11)
           }
        } 
        catch(error){
            return error;
        }
    },
    adminSignIn: async (req,res)=>{
        try{
      
      let status41 = await serviceIndex.adminService.adminSignInEmailCheck(req.payload.email);
       if(status41==false){
             return ConstantMsg.adminNotExist;         
              }
            else{
          let status42 = await serviceIndex.adminService.adminSignInPasswordCheck(req);
          if(status42== false){
              return ConstantMsg.passwordNotExist;
          }
          else{
              const privatekey = 'admin';
              const email1 = status42.email;
              const username2= status42.username
              const id1 = status42.id;
              const token42 = jwt.sign({adminid:id1},privatekey, {algorithm:'HS256'})
              data2 = {
                username:username2,
                email:email1,
                token: token42
            }
              return responseSend.sendSuccess(req.query,data2)
          } 
        }
    }
    
        catch(error){
            return responseSend.sendError(error);
        }

    },
    getAllCustomersByName: async (req, res) => {
        try {
            let tokenId43 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId43)
                if(tokenId43==true){
            const customersByName = await serviceIndex.adminService.customersByUsername(req);
            return responseSend.sendSuccess(req.query, customersByName)
        }
        else{
            return tokenId43
        }
    }
        catch (error) {
            return error;
        }

    },
    getCustomerDetail: async (req, res) => {
        try {
            let tokenId44 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId44)
                if(tokenId44==true){
            const customerDetail = await serviceIndex.adminService.customerDetail(req);
            return responseSend.sendSuccess(req.query, customerDetail)
        }
        else{
            return tokenId44
        }
    }
        catch (error) {
            return error;
        }

    },
    assignDriver: async (req, res) => {
        try {
            let tokenId45 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId45)
                if(tokenId45==true){
                    let status44 = await serviceIndex.adminService.checkValidBookingId(req);
                   console.log(status44)
                   if(status44==false){
                    return ConstantMsg.booking_idNotExist; 
                   }
                   else{
                    let status45 = await serviceIndex.adminService.checkValidDriverId(req); 
                    console.log(status45)
                    if(status45==false){
                     return ConstantMsg.driver_idNotExist; 
                    }
                    else{
                        console.log(req.payload.booking_id)
                    let status43 = await serviceIndex.adminService.checkBooking(req.payload.booking_id);
                   console.log(status43)
                    if(status43==false){
                        console.log("00000000")
                        return ConstantMsg.bookingNotFree;
                    }
                    else{
            const bookingHistory1 = await serviceIndex.adminService.createBookingHistory1(req);
            const assignDriver = await serviceIndex.adminService.assignDriver(req);
            return responseSend.sendSuccess(req.query, assignDriver)
        }
    }
}
}
        else{
            return tokenId45
        }
    }
        catch (error) {
            return error;
        }

    },
    getAllCustomers: async (req, res) => {
        try {
            let tokenId48 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId48)
                if(tokenId48==true){
            const customersAll = await serviceIndex.adminService.customersAll(req);
            return responseSend.sendSuccess(req.query, customersAll)
        }
        else{
            return tokenId43
        }
    }
        catch (error) {
            return error;
        }

    },
    getAllDrivers: async (req, res) => {
        try {
            let tokenId46 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId46)
                if(tokenId46==true){
            const driversAll = await serviceIndex.adminService.driversAll(req);
            return responseSend.sendSuccess(req.query, driversAll)
        }
        else{
            return tokenId43
        }
    }
        catch (error) {
            return error;
        }

    },
    getAllDriverAllottedBookings: async (req, res) => {
        try {
            let tokenId47 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId47)
                if(tokenId47==true){
            const bookingsAll = await serviceIndex.adminService.getAllDriverAllottedBookings(req);
            return responseSend.sendSuccess(req.query, bookingsAll)
        }
        else{
            return tokenId43
        }
    }
        catch (error) {
            return error;
        }

    },
    getAllFreeBookings: async (req, res) => {
        try {
            let tokenId53 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId53)
                if(tokenId53==true){
            const bookingsAllFree = await serviceIndex.adminService.bookingsAllFree(req);
            return responseSend.sendSuccess(req.query, bookingsAllFree)
        }
        else{
            return tokenId53
        }
    }
        catch (error) {
            return error;
        }

    },
    getAllDriversByName: async (req, res) => {
        try {
            let tokenId49 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId49)
                if(tokenId49==true){
            const driversByName = await serviceIndex.adminService.driversByUsername(req);
            return responseSend.sendSuccess(req.query, driversByName)
        }
        else{
            return tokenId43
        }
    }
        catch (error) {
            return error;
        }

    },
    historyOfCustomerAndBooking: async (req, res) => {
        try {
            let tokenId50 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId50)
                if(tokenId50==true){
                    let status46 = await serviceIndex.adminService.checkValidBookingId(req);
                   console.log(status46)
                   if(status46==false){
                    return ConstantMsg.booking_idNotExist; 
                   }
                   else{
                    let status47 = await serviceIndex.adminService.checkValidCustomerId(req); 
                    console.log(status47)
                    if(status47==false){
                     return ConstantMsg.customer_idNotExist; 
                    }
                    else{
                     let bookingHistory = await serviceIndex.adminService.checkBookingHistory(req);    
                    
                     return responseSend.sendSuccess(req.query, bookingHistory)
        }
    }

}
        else{
            return tokenId50
        }
    }
        catch (error) {
            return error;
        }

    },
    historyOfBookingsOfCustomer: async (req, res) => {
        try {
            let tokenId51 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId51)
                if(tokenId51==true){
                    let status48 = await serviceIndex.adminService.checkValidCustomerId(req); 
                    console.log(status48)
                    if(status48==false){
                     return ConstantMsg.customer_idNotExist; 
                    }
                    else{
                     let bookingsHistoryOfCustomer = await serviceIndex.adminService.checkBookingsHistoryOfCustomer(req);    
                     return responseSend.sendSuccess(req.query, bookingsHistoryOfCustomer)
        }
    

}
        else{
            return tokenId50
        }
    }
        catch (error) {
            return error;
        }

    },

    globalSearch2: async (req, res) => {
        try {
            let tokenId52 = await serviceIndex.adminService.checkToken(req.headers.token);  
            console.log(tokenId52)
                if(tokenId52==true){
            const globalSearch3 = await serviceIndex.adminService.globalSearch4(req);
           // const globalSearch5 = await serviceIndex.adminService.globalSearch6(req);
            data= {
                customer:globalSearch3,
                driver:globalSearch5
            }
            return responseSend.sendSuccess(req.query, data)
        }
        else{
            return ConstantMsg.usernameNotExist;
        }
    }
        catch (error) {
            return error;
        }

    },
};