import { Sequelize } from "sequelize";
require('dotenv').config();

const sequelize = new Sequelize(
   process.env.DATABASE_NAME, // Tên database
   process.env.DATABASE_USERNAME, // Username
   process.env.DATABASE_PASSWORD, // Password
   {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql'
   }
);

sequelize.authenticate().then(() => {
   console.log('Connection success!');
}).catch((error) => {
   console.error(error);
});

export default sequelize;