const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../connection')

module.exports = sequelize.define("users", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(440),
            allowNull: false
        },
        createdAt: {
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
        updatedAt: {
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal(
                "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    });