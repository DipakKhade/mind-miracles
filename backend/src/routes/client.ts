
import { Router } from "express";
export const clientRouter =Router();
import { db } from "../db/db";


clientRouter.post('/contact',async(req,res)=>{
    const {data}=req.body
    const {name , phone , email , subject , message } = data

    try{
       const data= await db.contact.create({
            data:{
                name , phone , email , subject , message
            }
        })
        console.log(data)
        return res.status(200).json({
            "success":true,
            data
        })

        
    }catch(e){
        console.log(e)
    }

})
clientRouter.post('/inquiry',async(req,res)=>{
    const {data}=req.body
    const {name,age,gmail,place,whatsappno } = data

    try{
       const data= await db.inquiry.create({
            data:{
                name,place,age,gmail,whatsappno
            }
        })
        console.log(data)

        return res.status(200).json({
            "success":true,
            data
        })

        
    }catch(e){
        console.log(e)
    }
})


