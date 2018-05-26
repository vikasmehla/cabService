const modelIndex = require('./model');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'finalDatabase';
module.exports={
    databaseConnection: ()=>{
async function dbConnection(){
  
try{

MongoClient.connect(url, function(err, client) {
  
 global.db=client.db(dbName);
 modelIndex.modelBookingHistory.Collection();
 console.log("connected")
  });

}
catch(error){
   return error;
}
}
dbConnection();
}
};