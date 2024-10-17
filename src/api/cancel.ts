import { Request, Response } from 'express';
import api from './config';
import { ApiResponse, Logger } from '../libs';

async function cancelRequest(req: Request, res: Response): Promise<object> {
    try {
        const { code } = req.query;
        const response = await api.req(res, `/request/cancel?code=${code}`, 'post');
        return ApiResponse.Success(res, response.data);
    } catch (error) {
        Logger.error(`Cancel request error: ${error?.message}`);
        return ApiResponse.InternalServerError(res, "Server Error: Something went wrong");
    }
}

export default cancelRequest;
