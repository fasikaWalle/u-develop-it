const express=require('express')
const router=express.Router()
const db=require('../../db/database')
const inputCheck = require('../../utilis/inputCheck');

router.get('/voters',(req,res)=>{
    const sql=`SELECT * FROM voters ORDER BY last_name ASC`;
    const params=[];
    db.all(sql,params,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        rows=rows.sort()
        res.json({message:"success",data:rows})
    })
    
})
router.get('/voter/:id',(req,res)=>{
    const sql=`SELECT * FROM voters WHERE id=?`
    const params=[req.params.id]
    db.get(sql,params,(err,row)=>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({message:"success",data:row})
    })
})
router.post('/voter',({body},res)=>{
    const sql=`INSERT INTO voters (first_name,last_name,email) VALUES(?,?,?)`;
    const params=[body.first_name,body.last_name,body.email];
    const errors=inputCheck(body,'first_name','last_name','email');
    if(errors){
        res.status(400).json({error:errors});
        return;
    }
    db.run(sql,params,function(err,data){
       if(err){
           res.status(400).json({error:err.message});
           return;       
       } 
       res.json({message:"succesfully added",data:body,id:this.lastID})
    })
    
})

router.delete('/voter/:id',(req,res)=>{
 const sql=`DELETE FROM voters WHERE id=?`;
const params=[req.params.id];
db.run(sql,params,function(err,result){
    if(err){
        res.status(400).json({error:err.message});
        return;
    }
    res.json({message:"deleted succesfully",changes:this.changes})
    
})
})

router.put('/voter/:id',(req,res)=>{
    const errors=inputCheck(req.body,'email')
    if(errors){
        res.status(400).json({error:errors});
        return;
    }
    //create statment 
    const sql=`UPDATE voters SET email=? WHERE id=?`
    const params=[req.body.email,req.params.id];
    db.run(sql,params,function(err,data){
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({message:"update",data:req.body,changes:this.changes})
    })
})

module.exports=router;

// -- get all voters who do not have a last name of Cooper or Jarman
// SELECT * FROM voters WHERE last_name != 'Cooper' AND last_name != 'Jarman';

// -- get all voters who have a .edu email address
// SELECT * FROM voters WHERE email LIKE '%.edu';

// -- get only the last created voter
// SELECT * FROM voters ORDER BY created_at DESC LIMIT 1;