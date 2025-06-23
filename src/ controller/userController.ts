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
      const userId = req.params.id
      if(userId){
          const user = await User.findByIdAndDelete(userId)
          if(!user){
            res.status(403).json({message:`user on this id ${userId} not found`})
          }else{
            res.status(201).json({message:"user deleted"})
          }
      }else{
        const user = await User.deleteMany()
      if(!user){
         res.status(403).json({message:'user not found'})
      }else{
         res.status(201).json({message:"user deleted"})
      }
      }
      
   }


   public static async signUp(req:Request,res:Response):Promise<void>{
      const {firstName,lastName,email,password,confirmPassword,role} = req.body

      if(req.body.password !== req.body.confirmPassword){
         res.status(403).json({message:'Incorrect password'})
         return
      }else{
         const hashPassword = bcrypt.hashSync(password,10)

         const user = await User.create({firstName,lastName,email,password:hashPassword,confirmPassword,role})

         if(!user){
            res.status(401).json({message:"user not be created"})
            return
         }else{
             const safeUser = {
               id:user.id,
               firstName:user.firstName,
               lastName:user.lastName,
               email:user.email,
               role:user.role
             }
            res.status(201).json({message:"user successfuly created",user:safeUser})
            return
         }
      }
   }

  public static async getUsers(req: Request, res: Response): Promise<void> {
   const userId = req.params.id
  try {
   if(userId){
      const user = await User.findById(userId).select('firstName lastName email role image')
      if(!user){
         res.status(404).json({ message: `Users of this id:${userId} not found` });
         return;
      }else{
         res.status(200).json({ message: "User successfully retrieved", user });
      }
   } else{
      const users = await User.find().select('firstName lastName email role image');
         if (!users || users.length === 0) {
           res.status(404).json({ message: "Users not found" });
           return;
         }else{
            res.status(200).json({ message: "Users successfully retrieved", users });
         }
       
   }
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

}
export default UserController