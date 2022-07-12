const {Sequelize} = require('sequelize');
const sequelize = require('../connection')

module.exports = sequelize.define("users",
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("(UUID())"),
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(440),
            allowNull: false
        },
        createdAt: {
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    });