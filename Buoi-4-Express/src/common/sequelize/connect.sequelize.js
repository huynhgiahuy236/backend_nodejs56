import { Sequelize } from "sequelize";


// tao ket noi den database
const sequelize = new Sequelize('mysql://root:123456@localhost:3307/nodeJs_56')
// kiem tra ket noi
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
export default sequelize