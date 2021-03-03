const express =require('express')

const PORT=process.env.PORT||3001;
const app=new express()
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// app.get('/',(req,res)=>{
//   res.json({message:"hello"})  
// })
// Default response for any other request(Not Found) Catch all
app.use((req,res)=>{
    res.status(404).end()
})