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
const contact_1 = __importDefault(require("../utils/email/contact"));
class ContactController {
    static sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, email, subject, message } = req.body;
            if (!firstname || !lastname || !email || !subject || !message) {
                res.status(403).json({ message: "Please input must not be empty" });
                return;
            }
            try {
                const composedMessage = `
        Firstname: ${firstname}
        Lastname: ${lastname}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `;
                yield (0, contact_1.default)(email, composedMessage, subject);
                res.status(200).json({ message: "Email sent successfully" });
            }
            catch (error) {
                console.error("Error sending email:", error);
                res.status(500).json({ message: "Failed to send email" });
            }
        });
    }
}
exports.default = ContactController;
