const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'ghost_comments',
    'admin',
    'GgelbHxxSFzylEde1SoR',
    {
        host: 'database-1.cbazrdku4why.us-east-1.rds.amazonaws.com',
        dialect: 'mysql'
    });

module.exports = sequelize;

