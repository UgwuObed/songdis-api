/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRepo, OtpRepo, } from "../repositories";
import { ApiResponse } from "../libs";
import { UserPayload } from "../interfaces";
import { Tools } from "../utils";
import { Response } from "express";
import { env } from "../config";
import { User } from "../models";

class UserService {

    async register(
        res: Response,
        payload: UserPayload
    ): Promise<object> {
        const { email } = payload;
        const existingEmail = await UserRepo.findByEmail(email);
        if(existingEmail)
            return ApiResponse.AuthenticationError(res, "Email is already taken");

        const details: any = await UserRepo.create(payload);

        return ApiResponse.Success(res, {
            message: "You've sucessfully registered", 
            details 
        }, 201)
    }

    // async sendOtp(email: string, res: Response): Promise<object>{
    //     const existingUser: any = await UserRepo.findByEmailOrPhone(email);
    //     if(existingUser === null)
    //         return ApiResponse.NotFoundError(res, "User does not exist");

    //     // Generate Otp for email verification
    //     const otp: string = Tools.generateOtp(env.OTP_SECRET);
    //     await OtpRepo.create({
    //         user: existingUser.id,
    //         otp,
    //         expiration: new Date(Tools.tokenExpiration()),
    //     });

    //     // Send email verification mail to users who have not verified their mail 
    //     const params = {
    //         "name": existingUser?.firstName,
    //         "otp": otp
    //     }
    //     await Tools.sendEmail(env.ACCOUNT_ACTIVATION_TEMPLATE, email, params);

    //     return ApiResponse.Success(res, {
    //         message: "Otp has been sent successfully"
    //     })
    // }

    // async verifyEmail(payload: any, res: Response): Promise<object>{
    //     const { email, otp } = payload;
    //     const buyer: any = await UserRepo.findByEmailOrPhone(email);
    //     if (buyer === null) {
    //         return ApiResponse.NotFoundError(res, "User with this email cannot be found");
    //     }
    //     if(buyer.isEmailVerified){
    //         return ApiResponse.AuthenticationError(res, "User email is already verified");
    //     }

    //     // Verify Otp
    //     const isOtpValid = await Tools.verifyOtp(buyer.id, otp);
    //     if(!isOtpValid){
    //         return ApiResponse.AuthenticationError(res, "OTP is invalid");
    //     }

    //     await UserRepo.update(buyer.id, { isEmailVerified: true });
    //     const updatedUser = await UserRepo.findOne(buyer.id);

    //     // Find Otp
    //     const existingOtp: any = await OtpRepo.findByOtp(otp);
    //     // Delete Otp
    //     await OtpRepo.remove(existingOtp.id);
    //     // Send response
    //     return ApiResponse.Success(res, {
    //         message: "Email verification successful",
    //         details: updatedUser
    //     })
    // }

    async login(payload: UserPayload, res: Response): Promise<object> {
        const { email, password } = payload;
        const user: any = await UserRepo.findByEmail(email);
        if (user === null)
            return ApiResponse.NotFoundError(res, "User not found");

        if(!user.isActive) {
                return ApiResponse.AuthorizationError(res, "This account has been deactivated. Kindly contact admin for support");
        }
        // Compare passwords
        const validPassword = await Tools.comparePassword(
            password,
            user.password
        );

        if (!validPassword) {
            return ApiResponse.AuthenticationError(res, "Password is incorrect");
        }

        const token = Tools.generateToken(user.id, "1hr");
        return ApiResponse.Success(res, {
            message: "You've successfully logged in",
            token,
            details: user
        })
    }
    // async update(id: string, payload: UserPayload, res: Response): Promise<object> {
    //     const buyer = await UserRepo.findOne(id);
    //     if(buyer === null)
    //         return ApiResponse.NotFoundError(res, "User not found");
    //     await UserRepo.update(id, payload);
    //     const updatedUser = await UserRepo.findOne(id);
    //     return ApiResponse.Success(res, {
    //         message: "Successfully updated profile",
    //         details: updatedUser
    //     })
    // }


 

    // async deleteBuyer(id: string, res: Response): Promise<object> {
    //     const buyer = await BuyerRepo.findOne(id);
    //     if (buyer === null)
    //         return ApiResponse.NotFoundError(res, "User not found");

    //     await BuyerRepo.remove(id);
    //     return {
    //         message: "Successfully deleted user",
    //         details: buyer
    //     };
    // }



    async forgotPassword(res: Response, payload: UserPayload): Promise<object>{
        const { email } = payload;
        const buyer: any = await UserRepo.findByEmail(email);
        if(buyer === null)
            return ApiResponse.NotFoundError(res, "Account with this email does not exist");

        const resetToken = Tools.generateToken(buyer.email, "10m");
        await UserRepo.update(buyer.id, { resetToken });

        // Send forgot password email to user
        const params = {
            "token": resetToken,
            "name": buyer?.firstName,
            "url": env.BUYER_URL
        }
        await Tools.sendEmail(env.PASSWORD_RESET_TEMPLATE, email, params);
        return ApiResponse.Success(res, {
            message: "Email sent successfully. Kindly check your mail to proceed"
        })
    }

    async resetPassword(res: Response, payload: UserPayload, token: string): Promise<object>{
        let { password } = payload;
        if(token){
            const validToken = Tools.verifyToken(token);
            if(!validToken){
                return ApiResponse.AuthorizationError(res, "Invalid or expired link");
            }
        }
        const buyer: any = await UserRepo.findByToken(token);
        const hashedPassword = await Tools.hashPassword(password);
        password = hashedPassword;
        await UserRepo.update(buyer.id, {
            password,
            resetToken: null
        });
        const updatedUser = await UserRepo.findOne(buyer.id);
        return ApiResponse.Success(res, {
            message: "Successfully reset user password",
            details: updatedUser
        })
    }
}

export default new UserService();
