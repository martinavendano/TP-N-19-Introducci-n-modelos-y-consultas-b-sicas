'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rating: {
        allowNull: false,
        type: Sequelize.DECIMAL(3,1)
      },
      awards: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      release_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      length: {
        type: Sequelize.INTEGER
      },
      genre_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Genres'
          },
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};