'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {

    static associate(models) {
    }
  }
  Movies.init({
    title: DataTypes.STRING,
    rating: DataTypes.DECIMAL(3,1),
    awards: DataTypes.INTEGER,
    release_date: DataTypes.DATE,
    length: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};