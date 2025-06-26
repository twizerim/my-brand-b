
import express,{Router} from "express"
import UserController from "../ controller/userController"
import Validation from "../middleware/validator"
import DatorChecker from "../middleware/dataorChecker"

const router:Router = express.Router()
router.post("/login",UserController.Login)
router.delete("/",UserController.deleteUser)
router.post("/signUp",DatorChecker.userExist,Validation.userAccountRole(),Validation.inputValidator,UserController.signUp)

export default router