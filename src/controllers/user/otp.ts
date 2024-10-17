// import { Request, Response } from "express";
// import { ApiResponse, Logger } from "../../libs";
// import { UserService } from "../../services";


// const verificationOtp = async (
//     req: Request,
//     res: Response
// ): Promise<Response> => {
//     try {
//         const response: any = await UserService.sendOtp(req.body.email, res);
//         return response;
//     } catch (error) {
//         Logger.error(error.message)
//         return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
//     }
// };

// export default verificationOtp;
