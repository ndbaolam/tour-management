import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DATABASE_NAME, // Tên database
    'root', // Username
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