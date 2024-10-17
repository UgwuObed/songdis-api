import { Request, Response } from "express";
import { ApiResponse, SchemaValidation, Logger } from "../../libs";
import { UserService } from "../../services";


const registerUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { error } = SchemaValidation.registerUser(req.body);
        if(error){
            return ApiResponse.AuthenticationError(res, error.details[0].context.label);
        }
        const response: any = await UserService.register(res, req.body);
        return response;
    } catch (error) {
        Logger.error(error.message)
        return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
    }
};

export default registerUser;
