/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";
import { UserPayload } from "../interfaces";

const PHONE_REGEX = /^0(7|8|9)(0|1)\d{8}$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?])[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?]{8,16}$/;
// const EMAIL_REGEX = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

class SchemaValidation {
   

    registerUser(payload) {
        const user: Joi.ObjectSchema = Joi.object({
            firstName: Joi.string().min(3).label("First name is required and not less than three characters").required(),
            lastName: Joi.string().min(3).label("Last name is required and not less than three characters").required(),
            accountType: Joi.string().label("Account Type is required").required(),
            email: Joi.string().label("A valid email address is required").email({ minDomainSegments: 2, tlds: { allow: ["com", "io", "ng"] } }).required(),
            password: Joi.string().min(8).label("A valid password is required").pattern(PASSWORD_REGEX).required()
        });
        return user.validate(payload)
    }

    login(payload: UserPayload) {
        const loginSchema: Joi.ObjectSchema = Joi.object({
            email: Joi.string().label("Email is required").required(),
            password: Joi.string().min(6).label("A valid password is required").required(),
        });
        return loginSchema.validate(payload);
    }
}

export default new SchemaValidation();
