// import { Request, Response } from "express";
// import { ApiResponse, Logger } from "../../libs";
// import { BuyerService } from "../../services";


// const verificationEmail = async (
//     req: Request,
//     res: Response
// ): Promise<Response> => {
//     try {
//         const response: any = await BuyerService.verifyEmail(req.body, res);
//         return response;
//     } catch (error) {
//         Logger.error(error.message)
//         return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
//     }
// };

// export default verificationEmail;
