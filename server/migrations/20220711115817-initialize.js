'use strict';
const {DataTypes, Sequelize} = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                username: {
                    type: DataTypes.STRING(440),
                    allowNull: false
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
                }
            }
        );
        await queryInterface.createTable('comments', {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
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
                }
            }
        );
        await queryInterface.createTable('upvotes', {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
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
                }
            }
        );

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('comments');
        await queryInterface.dropTable('users');
        await queryInterface.dropTable('upvotes');

    }
};
