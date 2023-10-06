const Book = require('./books');
const Review = require('./reviews');
const User = require('./users');

// Review belongs to User and sets the user_id as the user name

Review.belongsTo(User, { 
    foreignKey: 'user_id', as: 'user' 
});

// Reviews belong to books

Review.belongsTo(Book, { 
    foreignKey: 'book_id',
});

// Books have many reviews

// Book.hasMany(Review, {
//     foreignKey: 'review_id', 
// });

// Users have many reviews

// User.hasMany(Review, {
//     foreignKey: 'review_id', 
// });
  

module.exports = {
    Book,
    Review,
    User,
};