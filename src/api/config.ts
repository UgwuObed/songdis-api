import axios, { AxiosInstance } from "axios";
import { env } from "../config";
import { ApiResponse } from "../libs";
import { Response } from "express";

const instance: AxiosInstance = axios.create({
    baseURL: env.DARUM_BASE_URL,
    headers: {
        Authorization: `Basic ${env.DARUM_API_KEY}`
    }
})

const api = {
    req: async function (res: Response, path: string, method: string = "get", body: object | null = null){
        try {
            return await instance[method](path, body);
        } catch (error) {
            return ApiResponse.InternalServerError(res, error.message);
        }
    }
}

export default api;