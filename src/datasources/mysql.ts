import { Sequelize } from "sequelize";
import { Logger } from "../libs";
import { env } from "../config";

const mysqlClient = new Sequelize(
    env.DB_NAME,
    env.DB_USERNAME,
    env.DB_PASSWORD,
    {
        host: env.DB_HOST,
        dialect: "mysql",
        port: parseInt(env.DB_PORT),
        logging: false,
        pool: {
            max: 2,
            min: 0,
            acquire: 3000,
            idle: 0
        },
        define: {
            freezeTableName: true
        }
    }
);


mysqlClient
    .sync()
    .then(() => Logger.info("Successfully connected to mysql database"))
    .catch((err) => Logger.error(err.message));

export default mysqlClient;
