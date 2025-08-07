"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../ controller/userController"));
const validator_1 = __importDefault(require("../middleware/validator"));
const dataorChecker_1 = __importDefault(require("../middleware/dataorChecker"));
const router = express_1.default.Router();
router.post("/login", userController_1.default.Login);
router.delete("/", userController_1.default.deleteUser);
router.delete("/:id", userController_1.default.deleteUser);
router.post("/signUp", dataorChecker_1.default.userExist, validator_1.default.userAccountRole(), validator_1.default.inputValidator, userController_1.default.signUp);
router.get("/:id", userController_1.default.getUsers);
router.get("/", userController_1.default.getUsers);
exports.default = router;
