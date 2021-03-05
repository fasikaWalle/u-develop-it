const express =require('express')

const PORT=process.env.PORT||3000;
const app=new express()
//
const sqlite3=require('sqlite3').verbose()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
//connect the database to the application
const db=new sqlite3.Database('./db/election.db',err=>{
    if(err){
       return console.error(err.message)
    }
        console.log('Connected to the election database.')
    
})
// Start server after DB connection
db.on('open',()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
})


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
    const sql = `SELECT * FROM candidates`;
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
app.get('/api/candidates/:id', (req, res) => {
  const sql = `SELECT * FROM candidates 
               WHERE id = ?`;
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
  app.delete('/api/candidates/:id',(req,res)=>{
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
  
  
  app.use((req,res)=>{
    res.status(404).end()
})


// Create a candidate
app.post('/api/candidates',({body},res)=>{
  const errors=inputCheck(body,'first_name','last_name','industry_connected');
  if(errors){
      res.status(400).json({error:errors});
      return;
  }
  const sql=`INSERT INTO candidates VALUES (?,?,?)`
  const params=[body.first_name,body.kast_name,body.industry_connected];

   db.run(sql,params,function(err,result){
       if(err){
           res.status(404).json({error:err.message});
           return;
       }
       res.json({message:"success",data:body,id:this.lastID});
  })
})





