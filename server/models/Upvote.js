const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../connection');

module.exports = sequelize.define("upvotes",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.literal("(UUID())"),
            allowNull: false,
            primaryKey: true
        },
        commentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'comments',
                key: 'id'
            }
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