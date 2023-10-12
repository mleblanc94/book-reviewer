const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Review extends Model {}

Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        isDecimal: true,
      },
      comment: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'book',
            key: 'id',
            unique: false
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
            unique: false
        },
      },

    },
    {
      sequelize,      
      freezeTableName: true,
      underscored: true,
      modelName: 'review',
    }
  );


module.exports = Review;