// import { Request, Response } from "express";
// import { ApiResponse, Logger } from "../../libs";
// import { BuyerService } from "../../services";

// const reset = async (
//     req: Request,
//     res: Response
// ): Promise<Response> => {
//     try {
//         const response: any = await BuyerService.resetPassword(res, req.body, req.params.token);
//         return response;
//     } catch (error) {
//         Logger.error(error.message)
//         return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
//     }
// };

// export default reset;
