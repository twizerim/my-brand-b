
import { Request,Response,NextFunction } from "express"
import {check,validationResult} from "express-validator"


class Validation {
   
 public static inputValidator(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array().map(e => e.msg) });
         return
    }
    return next();
  }

    public static userAccountRole(){
        return [
            check("email","Provide your eamil format").isEmail(),
            check("password","Please provide your password correctly 'is strong password'")
        ]
    }
}

export default Validation