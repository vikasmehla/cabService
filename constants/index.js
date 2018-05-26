const Boom = require('boom')

module.exports = {
    

    errorMessage: {
        eng: {
            emailExist: Boom.conflict("Email Already exist"),
            phoneExist: Boom.conflict("phone Already exist"),
            statusNotVerified: Boom.conflict("user not verified"),
            phoneNotExist: Boom.conflict("phone not exist"),
            problemInStatusUpdation: Boom.conflict("problem in status updation"),
            problemInBookingTypeUpdation: Boom.conflict("problem in booking type updation"),
            problemInGettingCustomerBookings: Boom.conflict("problem in getting customer bookings"),
            problemInCancelationBooking: Boom.conflict("problem in booking deletion"),
            problemInPasswordUpdation: Boom.conflict("problem in password updation"),
            problemInAddressUpdation: Boom.conflict("problem in address updation"),
            bookingnameExist: Boom.conflict("booking Already exist"),
            userNotExist: Boom.conflict("user not exist"),
            adminNotExist: Boom.conflict("admin not exist"),
            adminExist: Boom.conflict("admin  exist"),
            passwordNotExist: Boom.conflict("password not exist"),
            invalidToken:Boom.unauthorized("invalid token"),
            invalidCredentials: Boom.unauthorized("Invalid Credentials"),
            userNotFound: Boom.notFound("User Not found"),
            statusAlreadyVerified: Boom.conflict("status already verified"),
            bookingNotFree: Boom.conflict("driver already alooted to booking"),
            bookingIsCancelled: Boom.conflict("booking is cancelled"),
            booking_idNotExist: Boom.conflict("booking_id not exist"),
            driver_idNotExist: Boom.conflict("driver_id not exist"),
            customer_idNotExist: Boom.conflict("customer_id not exist"),
            usernameNotExist: Boom.conflict("username not exist"),
            otpIsNotCorrect: Boom.conflict("otp is incorrect"),
            problemInOtpUpdation: Boom.conflict("problem in otp resend"),
            problemInAssigningDriver: Boom.conflict("problem in assigning driver"),

            

        }
    }
}