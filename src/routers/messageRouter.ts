import express,{Router} from "express"
import ContactController from "../ controller/contactController"

const router:Router = express.Router()
router.post("/",ContactController.sendMessage)

export default router