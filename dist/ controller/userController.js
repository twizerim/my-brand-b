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
const user_1 = __importDefault(require("../model/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    static Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield user_1.default.findOne({ email });
            if (!user) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }
            else {
                const comparePasswod = bcrypt_1.default.compareSync(password, user.password);
                if (!comparePasswod) {
                    res.status(401).json({ message: "Invalid email or password" });
                }
                else {
                    const SCRET_KY = "fdgfhtt";
                    const token = jsonwebtoken_1.default.sign({ user: user }, SCRET_KY, { expiresIn: "1d" });
                    res.status(201).json({
                        token: token,
                        playload: {
                            user: user
                        }
                    });
                }
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.deleteMany();
            if (!user) {
                res.status(403).json({ message: 'user not found' });
            }
            else {
                res.status(201).json({ message: "user deleted" });
            }
        });
    }
}
exports.default = UserController;
