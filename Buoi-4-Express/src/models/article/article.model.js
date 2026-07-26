import { DataTypes } from "sequelize";
import sequelize from "../../common/sequelize/connect.sequelize.js";
import { table } from "node:console";

const articleModel = sequelize.define(
    'Article', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        tableName: "Articles"
    }

);
export default articleModel