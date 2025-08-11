import express,{Router} from "express"
import BlogsController from "../ controller/blogController"
import upload from "../validator/multer"

const router:Router = express.Router()
router.post("/image",upload.single("image"),BlogsController.postImage)
router.get("/image",BlogsController.displayImage)
router.get("/image/:id",BlogsController.displayImage)
export default router