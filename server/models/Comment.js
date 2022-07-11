const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../connection')

module.exports = sequelize.define("comments", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.literal("(UUID())"),
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        content: {
            type: DataTypes.STRING(440),
            allowNull: false
        },
        isReply: {
            type: DataTypes.BOOLEAN(),
            defaultValue: false,
            allowNull: false
        },
        parentCommentId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'comments',
                key: 'id',
            }
        },
        createdAt: {
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    })

