import { Request, Response } from 'express';
import api from './config';
import { ApiResponse, Logger } from '../libs';

async function getRequestStatus(req: Request, res: Response): Promise<object> {
    try {
        const { code } = req.query;
        const response = await api.req(res, `/request/status?code=${code}`);
        return ApiResponse.Success(res, response.data);
    } catch (error) {
        Logger.error(`Get request status error: ${error?.message}`);
        return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
    }
}

export default getRequestStatus;
