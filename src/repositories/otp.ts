import { Otp } from "../models";
import { OtpPayload } from "../interfaces";
import { Op } from "sequelize";

class OtpRepo {

    async create(payload: OtpPayload): Promise<object> {
        return await Otp.create(payload);
    }

    async findOne(user: string, otp: number): Promise<object> {
        return Otp.findOne({
            where: {
                [Op.and]: [
                    { user },
                    { otp }
                ]
            }
        });
    }

    async findByOtp(otp: string): Promise<object> {
        return await Otp.findOne({
            where: {otp}
        });
    }

    async remove(id: string): Promise<number> {
        return await Otp.destroy({
            where: {id}
        });
    }
}

export default new OtpRepo();