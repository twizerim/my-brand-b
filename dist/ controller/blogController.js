"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const image_1 = __importDefault(require("../model/blog/image"));
class BlogsController {
    static postImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { imageName } = req.body;
            try {
                if (!req.file) {
                    res.status(400).json({ message: "Please upload image." });
                }
                const result = yield cloudinary_1.default.uploader.upload(req.file.path, { folder: "image" });
                const image = yield image_1.default.create({
                    imageName: imageName,
                    image: {
                        public_id: result.public_id,
                        url: result.secure_url
                    }
                });
                if (!image) {
                    res.status(403).json({ message: "Image not posted" });
                    return;
                }
                else {
                    res.status(201).json({ message: "Image successfuly poosted", image });
                    return;
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error is", error });
                return;
            }
        });
    }
    static displayImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageId = req.params.id;
            if (imageId) {
                const image = yield image_1.default.findById(imageId);
                if (!image) {
                    res.status(403).json({ message: `No image found on this id ${imageId}` });
                    return;
                }
                else {
                    res.status(200).json({ message: "Image successfuly retrived", image });
                    return;
                }
            }
            else {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const skip = (page - 1) * limit;
                const totalImage = yield image_1.default.countDocuments();
                const totalPages = Math.ceil(totalImage / limit);
                const image = yield image_1.default.find().sort({ postDate: -1 }).skip(skip).limit(limit);
                if (!image) {
                    res.status(403).json({ message: "No image found" });
                    return;
                }
                else {
                    res.status(200).json({
                        message: "Image successfuly retrived",
                        page,
                        limit,
                        totalPages,
                        totalImage,
                        image
                    });
                    return;
                }
            }
        });
    }
}
exports.default = BlogsController;
