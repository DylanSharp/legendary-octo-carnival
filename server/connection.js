const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'ghost_discussions ',
    'admin',
    '.39Wu9AhsUu9hK2wiqB-2X6b',
    {
        host: 'localhost',
        dialect: 'mysql'
    });

module.exports = sequelize;

