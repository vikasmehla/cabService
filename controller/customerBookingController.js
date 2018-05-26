const async = require('async');
const serviceIndex = require('../service');
const responseSend = require('../library/error');
const ConstantMsg = require('../constants').errorMessage.eng
const jwt = require('jsonwebtoken');

module.exports = {
    registeringBooking: async (req, res) => {
    
        try {
          
             const tokenId2 = await serviceIndex.customerBookingService.checkToken(req.headers.token);
           
             if (tokenId2 == true) {
                const status10 = await serviceIndex.customerBookingService.checkBooking(req);
                
               // console.log(status10)
                if (status10 == true) {
                    const creatingBooking = await serviceIndex.customerBookingService.createBooking(req);
                    console.log(creatingBooking)
                    req.payload.booking_id=creatingBooking.insertId;
                    const bookingHistory = await serviceIndex.customerBookingService.createBookingHistory(req);
                    const creatingBookingAddress = await serviceIndex.customerBookingService.createBookingAddress(req);
                    return responseSend.sendSuccess(req.query, creatingBookingAddress)
                }
                else {
                    return ConstantMsg.bookingnameExist;
                }
            }
            else {
                return tokenId2
            }
       }
        catch (error) {
            return error;
        }

    },
    updationBookingTypeByToken: async (req, res) => {
        try {
            let tokenId6 = await serviceIndex.customerBookingService.checkCancelStatus(req);  
                if(tokenId6==true){
                    return ConstantMsg.bookingIsCancelled;
                }
                else{
            let tokenId3 = await serviceIndex.customerBookingService.checkToken(req.headers.token);  
                if(tokenId3==true){
                    const bookingHistory1 = await serviceIndex.customerBookingService.createBookingHistory1(req);
            const updateBookingType = await serviceIndex.customerBookingService.updateBookingTypeByToken(req);
            return responseSend.sendSuccess(req.query, updateBookingType)
        }
        return tokenId3
    }
}
        catch (error) {
            return error;
        }

    },
    getAllBookingsByToken: async (req, res) => {
        try {
            let tokenId4 = await serviceIndex.customerBookingService.checkToken(req.headers.token);  
            console.log(tokenId4)
                if(tokenId4==true){
            const bookingsByToken = await serviceIndex.customerBookingService.bookingsByToken(req);
            return responseSend.sendSuccess(req.query, bookingsByToken)
        }
        else{
            return tokenId4
        }
    }
        catch (error) {
            return error;
        }

    },

    cancelBookingByToken: async (req, res) => {
        try {
            let tokenId5 = await serviceIndex.customerBookingService.checkToken(req.headers.token);  
                if(tokenId5==true){
                    const bookingHistory1 = await serviceIndex.customerBookingService.createBookingHistory2(req);
            const cancelBookingByToken = await serviceIndex.customerBookingService.cancelBookingByToken(req);
            return responseSend.sendSuccess(req.query, cancelBookingByToken)
        }
        else{
            return tokenId5
        }
    }
        catch (error) {
            return error;
        }
    }





};