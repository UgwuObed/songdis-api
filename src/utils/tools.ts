/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config";
import bcrypt from "bcryptjs";
import { ParsedQs } from "qs";
import { totp } from "otplib";
import { OtpRepo } from "../repositories";
import { ResponseType } from "../interfaces";
import { SendMailClient } from "zeptomail"
import { Logger } from "../libs";

export async function hashPassword(password: string){
    return await bcrypt.hash(password, 12);
}
export async function comparePassword(plainPassword: string, hashedPassword: string){
    return await bcrypt.compare(plainPassword, hashedPassword);
}
export function generateToken(id: string, time: string){
    return jwt.sign(
        {id},
        env.SECRET_KEY,
        {expiresIn: time}
    );
}

export function checkToken(req: JwtPayload){
    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"){
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}

export function verifyToken(token: string){
    return jwt.verify(token, env.SECRET_KEY);
}

export function generateName(req){
    let filename = "";
    if( req.query === undefined ){
        filename = req.body.businessName;
    } else {
        filename = req.query.type;
    }

    return filename;
}

export function queryBuilder(arr: Array<string>, value: string | ParsedQs | string[] | ParsedQs[], obj: object = {}){
    return arr.map((item: string) => {
        obj[item] = value;
    });
}

export function generateOtp(secret: string) {
    totp.options = { digits: 6 };
    return totp.generate(secret);
}

export async function verifyOtp(user: string, otp: number){
    const currentDate = new Date();
    const existingOtp: ResponseType = await OtpRepo.findOne(user, otp);
    if(!existingOtp || existingOtp.dataValues.expiration < currentDate){
        return null;
    }

    return existingOtp.dataValues.id;
}

export function tokenExpiration(){
    const tokenExpiration: any = new Date();
    return tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 10);
}

export function compareDates(initialDate: any, today: any){
    // calculate the difference in milliseconds between the two dates
    const diffInMilliSeconds = Math.abs(today - initialDate)
    // convert milliseconds to days
    const diffInDays = diffInMilliSeconds / (1000 * 60 * 60 * 24)
    // const diffInMins = diffInMilliSeconds / (1000 * 60)
    // Check if difference is greater than or equal to maturity date
    return diffInDays >= 7
    // return diffInMins >= 2
}

export async function sendEmail(templateKey: string, to: string, mergeInfo: any ){
    let client = new SendMailClient({
        url: env.MAIL_URL, 
        token: env.MAIL_TOKEN
    });

    try {
        const mail = await client.sendMail({
            "mail_template_key": templateKey,
            "from": { address: env.MAIL_DOMAIN, name: "Songdis"},
            "to": [
                {
                    "email_address": {
                        "address": to
                    }
                }
            ],
            "subject": "Placeholder",
            "merge_info": mergeInfo
        })
        Logger.info('Email sent successfully')
        return mail; 
    } catch (error) {
        Logger.error(`Error sending mail: ${JSON.stringify(error)}`)
    }
    
} 

export function selectFromModelOptions(arr: Array<any>, type: string){
    let selectedModel;
    for(const item of arr){
        if(item.name === type){
            selectedModel = item.model
        }
    }

    return selectedModel;
}

// export function generateRandomPassword(){
//     return generate({
//         length: 15,
//         numbers: true,
//         symbols: true,
//         uppercase: true,
//         excludeSimilarCharacters: true,
//     })
// }

export function generateRandomPassword() {
    const length = Math.floor(Math.random() * (16 - 8 + 1)) + 8; // Random length between 8 and 16
    const digits = '0123456789';
    const specialChars = '!@#$%^&_+-';
    const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:"<>?';
    
    let password = '';
    // Ensure at least one digit
    password += digits.charAt(Math.floor(Math.random() * digits.length));
    // Ensure at least one special character
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    // Fill the rest of the password with random characters
    for (let i = 2; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    // Shuffle the password to avoid predictable patterns
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    return password;
}