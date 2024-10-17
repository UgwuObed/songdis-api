import { DataTypes, UUIDV4 } from "sequelize";
import { mysqlClient } from "../datasources";
import bcrypt from "bcryptjs";
import { UserModel, UserPayload } from "../interfaces";

const User = mysqlClient.define<UserModel, UserPayload>(
    "user",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "email"
        },
        accountType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resetToken: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    },
    {
        timestamps: true
    }
);

User.beforeCreate(async (user) => {
    try {
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
    } catch (err) {
        throw new Error(err.message);
    }
});

export default User;
