const router = ('express').Router();
const { Review } = require('../../models');

router.post('/post-review', async (req, res) => {
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

    }
});