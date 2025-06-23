"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.CreateDefaultAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importStar(require("../model/user")); // Assuming you renamed the model to user
const CreateDefaultAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const defaultFirstName = process.env.FIRST_NAME || "Admin";
    const defaultLastName = process.env.LAST_NAME || "User";
    const defaultEmail = process.env.EMAIL || "admin@example.com";
    const defaultPassword = process.env.ADMIN_PASSWORD || "password123";
    const existingAdmin = yield user_1.default.findOne({ email: defaultEmail });
    if (existingAdmin) {
        console.log("Default admin already exists");
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(defaultPassword, 10);
    const admin = new user_1.default({
        firstName: defaultFirstName,
        lastName: defaultLastName,
        email: defaultEmail,
        password: hashedPassword,
        role: user_1.Role.ADMIN,
    });
    yield admin.save();
    console.log("Default admin created successfully");
});
exports.CreateDefaultAdmin = CreateDefaultAdmin;
