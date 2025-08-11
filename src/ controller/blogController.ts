import express,{Request,Response} from "express"
import cloudinary from "../utils/cloudinary"
import Image from "../model/blog/image"
class BlogsController{

    public static async postImage(req:Request,res:Response):Promise<void>{
       const {imageName}= req.body

       try {
        if(!req.file){
            res.status(400).json({message:"Please upload image."})
        }
        const result = await cloudinary.uploader.upload(req.file!.path,{folder:"image"})
         const image = await  Image.create({
            imageName:imageName,
            image:{
                public_id:result.public_id,
                url:result.secure_url
            }
         })
         if(!image){
            res.status(403).json({message:"Image not posted"})
            return
         }else{
           res.status(201).json({message:"Image successfuly poosted",image})
            return
         }
       } catch (error) {
          res.status(500).json({message:"Error is",error})
          return
       }
    }

    public static async displayImage(req:Request,res:Response):Promise<void>{
        const imageId = req.params.id
        if(imageId){
            const image = await Image.findById(imageId)
            if(!image){
            res.status(403).json({message:`No image found on this id ${imageId}`})
            return
        }else{
            res.status(200).json({message:"Image successfuly retrived",image})
            return
        }
        }else{
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            const skip = (page -1) * limit
            

            const totalImage = await Image.countDocuments()
            const totalPages = Math.ceil(totalImage/limit)

          const image = await Image.find().sort({postDate:-1}).skip(skip).limit(limit)
          if(!image){
            res.status(403).json({message:"No image found"})
            return
        }else{
            res.status(200).json({
                message:"Image successfuly retrived",
                page,
                limit,
                totalPages,
                totalImage,
                image})
            return
        }
        }
        
    }


}
export default BlogsController