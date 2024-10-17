// import { Request, Response } from "express";
// import { ApiResponse, Logger } from "../../libs";
// import { BuyerService } from "../../services";
// import { Op } from "sequelize";

// const buyers = async (
//     req: Request,
//     res: Response
// ): Promise<Response> => {
//     try {
//         const { parameter, startDate, endDate } = req.query;

//         if (startDate && endDate) {
//             const start = new Date(startDate as string);
//             const end = new Date(`${endDate} 23:59:59`);

//             if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//                 return ApiResponse.InternalServerError(res, "Invalid date format.");
//             }

//             const attributes = {
//                 exclude: ["updatedAt", "createdAt"]
//             };

//             const query = {
//                 attributes,
//                 where: {
//                     ...parameter ? {
//                         [Op.or]: [
//                             { id: parameter }, 
//                             { firstName: parameter },
//                             { lastName: parameter },
//                             { email: parameter }
//                         ]
//                     } : {},
//                     createdAt: {
//                         [Op.between]: [start, end]
//                     }
//                 },
//                 order: [["createdAt", "DESC"]],
//                 separate: true
//             };

//             const response: any = await BuyerService.findAllBuyers(res, query);
//             return ApiResponse.Success(res, response);
//         } else {
//             const attributes = {
//                 exclude: ["updatedAt", "createdAt"]
//             };

//             const query = {
//                 attributes,
//                 where: parameter ? {
//                     [Op.or]: [
//                         { id: parameter }, 
//                         { firstName: parameter },
//                         { lastName: parameter },
//                         { email: parameter }
//                     ]
//                 } : {},
//                 order: [["createdAt", "DESC"]],
//                 separate: true
//             };

//             const response: any = await BuyerService.findAllBuyers(res, query);
//             return ApiResponse.Success(res, response);
//         }
//     } catch (error) {
//         Logger.error(error.message);
//         return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
//     }
// };

// export default buyers;
