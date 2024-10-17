import { DataTypes, UUIDV4 } from "sequelize";
import { mysqlClient } from "../datasources";
import { OtpModel, OtpPayload } from "../interfaces";

const Otp = mysqlClient.define<OtpModel, OtpPayload>(
    "otp",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        user: {
            type: DataTypes.UUID,
            allowNull: false
        },
        otp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expiration: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
    },
    {
        timestamps: true
    }
);

export default Otp;
