'use strict';
const {DataTypes} = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true
                },
                username: {
                    type: DataTypes.STRING(440),
                    allowNull: false
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            }
        );
        await queryInterface.createTable('comments', {
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
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            }
        );
        await queryInterface.createTable('upvotes', {
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
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            }
        );

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('comments');
        await queryInterface.dropTable('users');
        await queryInterface.dropTable('upvotes');

    }
};
