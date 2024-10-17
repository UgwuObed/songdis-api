import { Response } from "express";
import { ResponseInterface } from "../interfaces";

class ExceptionError {
    public response: ResponseInterface;

    NotFoundError(res: Response, message: string) {
        this.response = {
            status: "failed",
            message
        };
        return res.status(404).json(this.response);
    }

    AuthenticationError(res: Response, message: string) {
        this.response = {
            status: "failed",
            message
        };
        return res.status(401).json(this.response);
    }


    AuthorizationError(res: Response, message: string, data?: object) {
        this.response = {
            status: "failed",
            message,
            data
        };
        return res.status(403).json(this.response);
    }
    
    InternalServerError(res: Response, message: string) {
        this.response = {
            status: "failed",
            message
        };
        if(res.headersSent){
            return; // Exit function as headers were already sent
        }
        // Send an error response
        return res.status(500).json(this.response);
    }

    Success(res: Response, data: object, code: number = 200){
        this.response = {
            status: "success",
            data
        };
        return res.status(code).json(this.response);
    }
}

export default new ExceptionError();
