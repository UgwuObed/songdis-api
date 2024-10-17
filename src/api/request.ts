import { Request, Response } from 'express'
import api from './config'
import { ApiResponse, Logger } from '../libs'

async function requestForRide(req: Request, res: Response): Promise<object> {
    try {
        const response = await api.req(res, '/business/request', "post", req.body)
        return ApiResponse.Success(res, response.data)
    } catch (error) {
        Logger.error(`Reuqest ride error: ${error?.message}`)
        return ApiResponse.InternalServerError(res, "Server Error: Something went wrong")
    }
}

export default requestForRide;