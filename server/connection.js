const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'ghost_discussions ',
    'admin',
    'GgelbHxxSFzylEde1SoR',
    {
        host: 'localhost',
        dialect: 'mysql'
    });

module.exports = sequelize;

