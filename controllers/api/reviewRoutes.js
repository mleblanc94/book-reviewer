const router = ('express').Router();
const { Review, Book, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Post a new review
router.post('/review', withAuth, async (req, res) => {
    try {
        const newReview = await Review.create({
            user_id: req.session.user_id,
            author_name: req.body.author_name,
            book_name: req.body.bookName,
            review: req.body.review,
            book_cover: req.body.cover,
            rating: req.body.rating,
            description: req.body.description,
        });
        res.status(200).json(newReview);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
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
],
    include: [{
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

// Delete a review
router.delete("/:id", withAuth, (req, res) => {
    Review.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No review found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/new', (req, res) => {
    res.render('createreview', {
        logged_in: true
    })
})

module.exports = router;