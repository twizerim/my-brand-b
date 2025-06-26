import express,{Request,Response} from "express"
import User from "../model/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


class UserController {
   public static async Login(req:Request,res:Response):Promise<void>{
      const {email,password} = req.body

      const user = await User.findOne({email})
      if(!user){
          res.status(401).json({message:"Invalid email or password"})
          return
      }else{
         const comparePasswod = bcrypt.compareSync(password,user.password)
         if(!comparePasswod){
            res.status(401).json({message:"Invalid email or password"})
         }else{
            const SCRET_KY = "fdgfhtt"
            const token = jwt.sign({user:user},SCRET_KY,{expiresIn:"1d"})

            res.status(201).json({
               token:token,
               playload:{
                  user:user
               }
          })
         }
      }

   }

   public static async deleteUser(req:Request,res:Response):Promise<void>{
      const user = await User.deleteMany()
      if(!user){
         res.status(403).json({message:'user not found'})
      }else{
         res.status(201).json({message:"user deleted"})
      }
   }

}
export default UserController