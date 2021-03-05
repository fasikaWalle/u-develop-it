const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const inputCheck = require('./utilis/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database 
const db = new sqlite3.Database('./db/election.db', err => {
  if (err) {
    return console.error(err.message);
  }

  console.log('Connected to the election database.');
});
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
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT candidates .*,parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id=parties.id  `;
    const params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
  
  
// Get single candidate
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT candidates .*,parties.name AS party_name  FROM candidates LEFT JOIN parties ON candidates.party_id=parties.id WHERE candidates.id=?`;
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: row
    });
  });
});
//delete candidate
  app.delete('/api/candidate/:id',(req,res)=>{
    const sql=`DELETE FROM candidates  WHERE id=?`
    const params=[req.params.id]
    db.run(sql,params,function(err,result){
        if(err){
            res.status(400).json({error:res.message})
            return
        }
        res.json({message:"deleted succesfully",change:this.changes})
    })
    
  })
  


// Create a candidate
// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql =  `INSERT INTO candidates (first_name, last_name, industry_connected) 
                VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];
  // ES5 function, not arrow function, to use this
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      id: this.lastID
    });
  });
  
});



// Default response for any other request(Not Found) Catch all

// Start server after DB connection
db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});




