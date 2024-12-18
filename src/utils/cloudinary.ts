import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import { env } from "../config";

export const uploader = cloudinary.v2.uploader;
export const config = (req: Request, res: Response, next: NextFunction) => {
    cloudinary.v2.config({
        cloud_name: env.CLOUDINARY_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET
    });
    next();
};