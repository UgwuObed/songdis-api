import { Sequelize } from "sequelize";
import { Logger } from "../libs";
import { env } from "../config";

const postgresClient = new Sequelize(
    env.DB_NAME,
    env.DB_USERNAME,
    env.DB_PASSWORD,
    {
        host: env.DB_HOST,
        dialect: "postgres",  // Change this to 'postgres'
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
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
);

postgresClient
    .sync()
    .then(() => Logger.info("Successfully connected to PostgreSQL database"))
    .catch((err) => Logger.error(err.message));

export default postgresClient;
