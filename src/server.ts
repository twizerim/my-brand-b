import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import router from "./routers"

dotenv.config()
const brand = express()
brand.use(bodyParser.json())
brand.use(cors())
brand.use("/api/v1",router)

const port = parseInt(process.env.PORT ||'3500',10)


brand.listen(port,()=>{
    console.log(`Port successfuly running on ${port}`)
})

export default brand