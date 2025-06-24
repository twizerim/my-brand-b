import express,{Router} from "express"
import userRouter from "./userRouter"
import messageRouter from "./messageRouter"

const router:Router = express.Router()
router.use("/user",userRouter)
router.use("/contact",messageRouter)

export default router