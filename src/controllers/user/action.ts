// import { Request, Response } from "express";
// import { ApiResponse } from "../../libs";
// import { BuyerService } from "../../services";
// import { Logger } from "../../libs";

// const deactivate = async (
//     req: Request,
//     res: Response
// ): Promise<Response> => {
//     try {
//         const response: any = await BuyerService.accountAction(res, req.params.buyerId, req.body);
//         return response;
//     } catch (error) {
//         Logger.error(error.message)
//         return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
//     }
// };

// export default deactivate;
