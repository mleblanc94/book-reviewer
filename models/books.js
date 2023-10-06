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
        type: DataTypes.STRING,
        allowNull: false,
      },
      author_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    //   genre: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
      // isbn: {
      //   type: DataTypes.DECIMAL,
      //   allowNull: false,
      //   isDecimal: true,
      // },
      book_cover: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // review_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //       model: 'review',
      //       key: 'id',
      //       unique: false
      //   },
      // },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'book',
    }
  );

module.exports = Book;