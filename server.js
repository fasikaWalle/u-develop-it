
const express = require('express');
const inputCheck = require('./utilis/inputCheck');
const db=require('./db/database')
const app = express();
const apiRouters=require('./Routes/ApiRoutes')



const PORT = process.env.PORT || 3001;
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api',apiRouters)




// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
// Start server after DB connection
db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


// Connect to database 

//connect the database to the application

// Start server after DB connection


// If there are no errors in the SQL query, the err value is null
// db.all('SELECT * FROM candidates',(err,rows)=>{
//     console.log(rows)
// })

// db.get(`SELECT * FROM candidates WHERE id=1`,(err,row)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(row)
//     }
// })
//The question mark (?) denotes a placeholder, making this a prepared statement
//delete a candidate
//The result value is undefined. This was expected because run() doesn't return any result data.
// db.run( `DELETE FROM candidates WHERE id= ?`,1,function(err,result){
//     if(err){
//         console.log(err)
//     }
//     console.log(result,this,this.changes)
// })
// Default response for any other request(Not Found) Catch all


// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];
// ES5 function, not arrow function, to use this
// db.run(sql, params, function(err, result) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result, this.lastID);
// });


//get all candidates
// Get all candidates

  //get all candidates



// Default response for any other request(Not Found) Catch all
// Start server after DB connection



