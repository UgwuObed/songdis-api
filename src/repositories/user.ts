/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../models";
import { UserPayload } from "../interfaces";
import { Op } from "sequelize";

class UserRepo {

    async create(payload: UserPayload): Promise<object> {
        return await User.create(payload);
    }

    async update(id: string, payload: any): Promise<object> {
        return await User.update(payload, {
            where: {id},
            returning: true
        });
    }

    async findOne(id: string): Promise<object> {
        return await User.findByPk(id,)
            // { attributes: 
            //     { 
            //         exclude: ["createdAt", "updatedAt", "password"]
            //     },
            //     include: [
            //         {
            //             model: Address, 
            //         },
            //         {
            //             model: WishList,
            //             include: [{
            //                 model: WishListItem,
            //                 include: [{
            //                     model: Product,
            //                     attributes: ["price"]
            //                 }]
            //             }]
            //         }
            //     ]
            // });
    }

    async findByEmail(email: string): Promise<object> {
        return await User.findOne({
            where: {
                [Op.or]: [
                    { email: email}
                ]
            },
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
    }

    async findByToken(resetToken: string): Promise<object> {
        return await User.findOne({
            where: {resetToken}
        });
    }

    async findAll(query?: object): Promise<{ rows: object[]; count: number }> {
        return await User.findAndCountAll(query);
    }

    // async remove(id: string): Promise<number> {
    //     return await Buyer.destroy({
    //         where: {id}
    //     });
    // }
}

export default new UserRepo();