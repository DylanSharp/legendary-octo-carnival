const { DataTypes } = require('sequelize');
const sequelize = require('../connection')

module.exports = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(440),
        allowNull: false
    }
})

