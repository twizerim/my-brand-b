import {Request,Response, NextFunction } from "express";
import User from "../model/user";

class DatorChecker {

    public static async userExist(req:Request,res:Response,next:NextFunction):Promise<void>{
       const email = req.body.email

       const user = await User.findOne({email})

       if(user){
         res.status(401).json({message:"user already exist"})
         return
       }else{
         return next()
       }
    }

}
export default DatorChecker