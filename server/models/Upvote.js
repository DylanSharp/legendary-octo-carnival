const {DataTypes} = require('sequelize');
const sequelize = require('../connection');

module.exports = sequelize.define("upvotes", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    comment_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'comments',
            key: 'id'
        }
    }
})

