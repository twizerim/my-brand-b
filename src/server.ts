import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import router from "./routers"
import mongoose from "mongoose"
import { CreateDefaultAdmin } from "./utils/createDefaltAdmin"

dotenv.config()
const brand = express()
brand.use(bodyParser.json())
brand.use(cors())
brand.use("/api/v1",router)

const port = parseInt(process.env.PORT ||'3500',10)
const db = process.env.MONGODB_URI || ""


brand.listen(port,()=>{
    console.log(`🚀 Server running on port ${port}`)
})

mongoose.connect(db).then(async()=>{
   console.log("✅  Database successfuly connected !!!")
   await CreateDefaultAdmin() // 👈 Create default admin here

}).catch((error)=>{
   console.log(`❌  The error is ${error}`)

})



export default brand