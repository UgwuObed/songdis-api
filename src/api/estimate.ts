import { Request, Response } from 'express'
import api from './config'
import { ApiResponse, Logger } from '../libs'

async function getEstimate(req: Request, res: Response): Promise<object> {
    try {
        const {sourceLat, sourceLng, destinationLat, destinationLng} = req.query
        const response = await api.req(res, `/request/estimate?sourceLat=${sourceLat}
            &sourceLng=${sourceLng}&destinationLat=${destinationLat}
            &destinationLng=${destinationLng}`)
        return ApiResponse.Success(res, response.data)
    } catch (error) {
        Logger.error(`Shipping estimate error: ${error?.message}`)
        return ApiResponse.InternalServerError(res, "Server Error: Something went wrong")
    }
}

export default getEstimate;