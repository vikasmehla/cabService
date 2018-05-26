const mysql = require('mysql');
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  //password:'root',
  database : 'finalDatabase'
});
db.connect((error)=>{
if(error){
  console.log("0000000000000")
  throw error;
}
else{
  console.log("connected");
}
});
 
module.exports={
  connection: db
};
