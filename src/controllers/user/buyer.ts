// import { Response } from "express";
// import { ApiResponse } from "../../libs";
// import { BuyerService } from "../../services";
// import { Logger } from "../../libs";

// const buyer = async (
//     _,
//     res: Response
// ): Promise<Response> => {
//     try {
//         const response: any = await BuyerService.findBuyer(res.locals.user.id, res);
//         return response;
//     } catch (error) {
//         Logger.error(error.message)
//         return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
//     }
// };

// export default buyer;
