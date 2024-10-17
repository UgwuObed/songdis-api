// // require('ts-node/register');
// require('dotenv/config.js');

// const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DATABASE_URL } = process.env;

// module.exports = {
//   ...(DATABASE_URL
//     ? {
//         use_env_variable: 'DATABASE_URL', 
//         dialect: 'postgres',  
//         dialectOptions: {
//           ssl: {
//             require: true,  
//             rejectUnauthorized: false,
//           },
//         },
//       }
//     : {
//         username: DB_USERNAME,
//         password: DB_PASSWORD,
//         database: DB_NAME,
//         host: DB_HOST,
//         port: DB_PORT,
//         dialect: 'mysql', 
//         logging: false,
//         migrationStorageTableName: 'migrations',
//         pool: {
//           max: 2,
//           min: 0,
//           acquire: 3000,
//           idle: 0,
//         },
//         define: {
//           freezeTableName: true,
//         },
//       }),
// };

module.exports = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
