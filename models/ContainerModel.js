import { Sequelize, Op } from "sequelize";
import db from "../config/db.js";
import Waste from "./WasteModel.js";

const { DataTypes } = Sequelize;

const container = db.define('container', {
    containerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    station:{
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
    },
    line: {
        type: DataTypes.INTEGER,
    },
    hostname: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps:false
});


Waste.hasMany(container, { foreignKey: 'IdWaste', as: 'container' });
container.belongsTo(Waste, { foreignKey: 'IdWaste', as: 'waste' });

export default container;