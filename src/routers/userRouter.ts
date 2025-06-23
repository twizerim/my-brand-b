
import express,{Router} from "express"
import UserController from "../ controller/userController"

const router:Router = express.Router()
router.post("/",UserController)

export default router