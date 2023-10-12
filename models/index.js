const Book = require('./books');
const Review = require('./reviews');
const User = require('./users');

//User has many records in Review
User.hasMany(Review, {
    foreignKey : 'user_id',
    targetKey: 'id'
  });

// Review belongs to User and sets the user_id as the user name
Review.belongsTo(User, { 
    foreignKey: 'user_id',
    targetKey: 'id'
});

//Book has many records in Review
Book.hasMany(Review, {
    foreignKey : 'book_id',
    targetKey: 'id'
  });

// Reviews belong to books
Review.belongsTo(Book, { 
    foreignKey: 'book_id',
    targetKey: 'id'
});  

module.exports = {
    Book,
    Review,
    User,
};