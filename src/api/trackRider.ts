import { Request, Response } from 'express';
import api from './config';
import { ApiResponse, Logger } from '../libs';

async function trackRider(req: Request, res: Response): Promise<object> {
    try {
        const { code } = req.query;
        const response = await api.req(res, `/request/track/rider?code=${code}`);
        return ApiResponse.Success(res, response.data);
    } catch (error) {
        Logger.error(`Track rider error: ${error?.message}`);
        return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
    }
}

export default trackRider;
