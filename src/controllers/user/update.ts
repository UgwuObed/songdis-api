// import { Request, Response } from "express";
// import { ApiResponse, Logger } from "../../libs";
// import { BuyerService } from "../../services";

// const update = async (
//     req: Request,
//     res: Response
// ): Promise<Response> => {
//     try {
//         const response: any = await BuyerService.update(res.locals.user.id, req.body, res);
//         return response;
//     } catch (error) {
//         Logger.error(error.message)
//         return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
//     }
// };

// export default update;
