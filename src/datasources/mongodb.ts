import mongoose from "mongoose";
import { env } from '../config'
import { Logger } from "../libs";

async function mongodbClient(){
    try {
        const connection = await mongoose.connect(env.MONGO_URI)
        if(connection){
            Logger.info("Successfully connected to mongodb database")
        }
    } catch (error) {
        Logger.error(`Connection to mongodb failed: `, error)
    }
}

mongodbClient()

export default mongodbClient