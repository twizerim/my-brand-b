
import express,{Router} from "express"
import UserController from "../ controller/userController"
import Validation from "../middleware/validator"
import DatorChecker from "../middleware/dataorChecker"

const router:Router = express.Router()
router.post("/login",UserController.Login)
router.delete("/",UserController.deleteUser)
router.delete("/:id",UserController.deleteUser)
router.post("/signUp",DatorChecker.userExist,Validation.userAccountRole(),Validation.inputValidator,UserController.signUp)
router.get("/:id", UserController.getUsers);
router.get("/", UserController.getUsers);


export default router