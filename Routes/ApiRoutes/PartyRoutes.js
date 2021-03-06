//display parties
const express=require('express')
const router=express.Router()
const db=require('../../db/database')
router.get('/parties',(req,res)=>{
    const sql=`SELECT * FROM parties`
    const params=[]
    db.all(sql,params,(err,rows)=>{
    if(err){
      res.status(500).json({error:err.message});
      return;
    }
    res.json({message:"success",data:rows})
    })
  })
  router.get('/party/:id',(req,res)=>{
    const sql=`SELECT * FROM parties WHERE id=?`
    const params=[req.params.id]
    db.get(sql,params,(err,row)=>{
      if(err){
        res.status(400).json({message:err.message});
        return;
      }
      res.json({message:"success",data:row})
    })
    
  })
  router.delete('/party/:id',(req,res)=>{
    const sql=`DELETE FROM parties WHERE id=?`
    const params=[req.params.id]
    db.run(sql,params,function(err,row){
      if(err){
        res.status(404).json({error:err.message});
        return;
      }
      res.json({message:"deleted succesfully",changes:this.changes})
    })
  })
  module.exports=router