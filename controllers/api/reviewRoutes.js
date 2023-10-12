const router = require('express').Router();
const { Review, Book, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Post a new review
router.post('/add', withAuth, async (req, res) => {

    Book.create({
        book_name: req.body.book_name,
        author_name: req.body.author_name,
        book_cover: req.body.book_cover,
        description: req.body.book_description
    })
        .then((createdBook) => {
            return Review.create({
                rating: req.body.rating,
                comment: req.body.reviewContent,
                user_id: req.session.user_id,
                book_id: createdBook.id,
            });
        })
        .then((createdReview) => res.json({ createdReview }))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get all reviews
router.get('/', async (req, res) => {
    Review.findAll({
        attributes: ["id", "rating", "comment", "created_at"],
        order: [
            ["created_at", "DESC"]
        ],
        include: [{
            model: Book,
            attributes: ["book_name", "author_name", "book_cover", "description"],
    },
    {
        model: User,
        attributes: ["name"],
    },
],
    })
    .then(dbReviewData => {
        const reviews = dbReviewData.map(post => post.get({
            plain: true
        }));
        res.render('allreviews', {
            reviews,
            logged_in: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/new', (req, res) => {
    res.render('createreview', {
        logged_in: true
    })
})

module.exports = router;