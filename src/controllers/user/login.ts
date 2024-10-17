import { Request, Response } from "express";
import { ApiResponse, SchemaValidation, Logger } from "../../libs";
import { UserService } from "../../services";

const login = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { error } = SchemaValidation.login(req.body);
        if(error){
            return ApiResponse.AuthenticationError(res, error.details[0].context.label);
        }
        const response: any = await UserService.login(req.body, res);
        return response;
    } catch (error) {
        Logger.error(error.message)
        return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
    }
};

export default login;
