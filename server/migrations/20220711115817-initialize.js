'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users',
            {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.literal("(UUID())"),
                    allowNull: false,
                    primaryKey: true
                },
                username: {
                    type: Sequelize.STRING(440),
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
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.literal("(UUID())"),
                    allowNull: false,
                    primaryKey: true
                },
                user_id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    }
                },
                content: {
                    type: Sequelize.STRING(440),
                    allowNull: false
                },
                is_reply: {
                    type: Sequelize.BOOLEAN(),
                    defaultValue: false,
                    allowNull: false
                },
                parent_comment_id: {
                    type: Sequelize.UUID,
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
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal("(UUID())"),
                allowNull: false,
                primaryKey: true
            },
            comment_id: {
                type: Sequelize.UUID,
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
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('comments');
        await queryInterface.dropTable('users');
        await queryInterface.dropTable('upvotes');
    }
};
