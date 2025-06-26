
import express,{Router} from "express"
import UserController from "../ controller/userController"

const router:Router = express.Router()
router.post("/login",UserController.Login)
router.delete("/",UserController.deleteUser)

export default router