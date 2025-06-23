"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
dotenv_1.default.config();
const brand = (0, express_1.default)();
brand.use(body_parser_1.default.json());
brand.use((0, cors_1.default)());
brand.use("/api/v1", routers_1.default);
const port = parseInt(process.env.PORT || '3500', 10);
brand.listen(port, () => {
    console.log(`Port successfuly running on ${port}`);
});
exports.default = brand;
