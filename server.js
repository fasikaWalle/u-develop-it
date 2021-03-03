const express =require('express')

const PORT=process.env.PORT||3001;
const app=new express()
//
const sqlite3=require('sqlite3').verbose()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const db=new sqlite3.Database('./db/election.db',err=>{
    if(err){
       return console.error(err.message)
    }
        console.log('Connected to the election database.')
    
})
db.on('open',()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
})
// app.get('/',(req,res)=>{
//   res.json({message:"hello"})  
// })
// Default response for any other request(Not Found) Catch all
app.use((req,res)=>{
    res.status(404).end()
})