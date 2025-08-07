"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class Validation {
    static inputValidator(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array().map(e => e.msg) });
            return;
        }
        return next();
    }
    static userAccountRole() {
        return [
            (0, express_validator_1.check)("email", "Provide your eamil format").isEmail(),
            (0, express_validator_1.check)("password", "Please provide your password correctly 'is strong password'")
        ];
    }
}
exports.default = Validation;
