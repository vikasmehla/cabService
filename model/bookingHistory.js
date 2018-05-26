module.exports={
    Collection: ()=>{
        db.createCollection('bookinghistory',
    {
        validator:
        {
          $jsonSchema:
          {
              bsonType: "object",
             // required: ["user_id","jobid","jobname","jobtype","core","basic","createdat","modifiedat"],
              additionalProperties: false,
              properties:
              {
                //_id:{},
                  booking_id:{
                      bsonType:"string",
                      description:"'booking_id' is required and is a string"
                  },
                  driver_id:{
                    bsonType:"string",
                    description:"'driver_id' is required and is a integer "
                },
                driverassignedat:{
                    bsonType:"date",
                    description:"'ddriverassignedat' is required and is a date "
                },

                createdat:{
                    bsonType:"date",
                    description:"'createdat' is required and is a date"
                },
                 modifiedat:{
                    bsonType:"date",
                    description:"'modifiedat' is required and is a date"
                },
                  pickuplocation:{
                    bsonType:"string",
                    description:"'pickuplocation' is required and is a string"
                },
                droplocation:{
                    bsonType:"string",
                    description:"'droplocation' is required and is a string"
                },
                canceledat:{
                    bsonType:"date",
                    description:"'canceled date' is required and is a date"
                },
                customer_id:{
                    bsonType:"string",
                    description:"'customer_id' is required and is a string"
                }

              }
          },
        // validationLevel: 'moderate',
  //validationAction: 'error',  
        }
    });
    
    }
    }