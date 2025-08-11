"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = __importDefault(require("../ controller/blogController"));
const multer_1 = __importDefault(require("../validator/multer"));
const router = express_1.default.Router();
router.post("/image", multer_1.default.single("image"), blogController_1.default.postImage);
router.get("/image", blogController_1.default.displayImage);
router.get("/image/:id", blogController_1.default.displayImage);
exports.default = router;
