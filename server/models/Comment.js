const {DataTypes} = require('sequelize');
const sequelize = require('../connection')

module.exports = sequelize.define("comments", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
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
    is_reply: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false,
        allowNull: false
    },
    parent_comment_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'comments',
            key: 'id',
        }
    }
})

