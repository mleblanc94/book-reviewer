const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Book extends Model {}

Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      book_name: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      author_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      book_cover: {
        type: DataTypes.STRING(2500),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(5000),
        allowNull: true,
      },     
    },
    {
      sequelize,      
      freezeTableName: true,
      underscored: true,
      modelName: 'book',
    }
  );

module.exports = Book;