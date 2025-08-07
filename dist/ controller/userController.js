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
            const userId = req.params.id;
            if (userId) {
                const user = yield user_1.default.findByIdAndDelete(userId);
                if (!user) {
                    res.status(403).json({ message: `user on this id ${userId} not found` });
                }
                else {
                    res.status(201).json({ message: "user deleted" });
                }
            }
            else {
                const user = yield user_1.default.deleteMany();
                if (!user) {
                    res.status(403).json({ message: 'user not found' });
                }
                else {
                    res.status(201).json({ message: "user deleted" });
                }
            }
        });
    }
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, confirmPassword, role } = req.body;
            if (req.body.password !== req.body.confirmPassword) {
                res.status(403).json({ message: 'Incorrect password' });
                return;
            }
            else {
                const hashPassword = bcrypt_1.default.hashSync(password, 10);
                const user = yield user_1.default.create({ firstName, lastName, email, password: hashPassword, confirmPassword, role });
                if (!user) {
                    res.status(401).json({ message: "user not be created" });
                    return;
                }
                else {
                    const safeUser = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role
                    };
                    res.status(201).json({ message: "user successfuly created", user: safeUser });
                    return;
                }
            }
        });
    }
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                if (userId) {
                    const user = yield user_1.default.findById(userId).select('firstName lastName email role image');
                    if (!user) {
                        res.status(404).json({ message: `Users of this id:${userId} not found` });
                        return;
                    }
                    else {
                        res.status(200).json({ message: "User successfully retrieved", user });
                    }
                }
                else {
                    const users = yield user_1.default.find().select('firstName lastName email role image');
                    if (!users || users.length === 0) {
                        res.status(404).json({ message: "Users not found" });
                        return;
                    }
                    else {
                        res.status(200).json({ message: "Users successfully retrieved", users });
                    }
                }
            }
            catch (error) {
                res.status(500).json({ message: "Server error", error });
            }
        });
    }
}
exports.default = UserController;
