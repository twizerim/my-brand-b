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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
const mongoose_1 = __importDefault(require("mongoose"));
const createDefaltAdmin_1 = require("./utils/createDefaltAdmin");
dotenv_1.default.config();
const brand = (0, express_1.default)();
brand.use(body_parser_1.default.json());
brand.use((0, cors_1.default)());
brand.use("/api/v1", routers_1.default);
const port = parseInt(process.env.PORT || '3500', 10);
const db = process.env.MONGODB_URI || "";
brand.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
mongoose_1.default.connect(db).then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("✅  Database successfuly connected !!!");
    yield (0, createDefaltAdmin_1.CreateDefaultAdmin)(); // 👈 Create default admin here
})).catch((error) => {
    console.log(`❌  The error is ${error}`);
});
exports.default = brand;
