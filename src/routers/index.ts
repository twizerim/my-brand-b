import express,{Router} from "express"
import userRouter from "./userRouter"
import messageRouter from "./messageRouter"
import blogRouter from "./blogRouter"

const router:Router = express.Router()
router.use("/user",userRouter)
router.use("/contact",messageRouter)
router.use("/blog",blogRouter)

export default router