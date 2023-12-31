const router = require('express').Router();
const { User } = require('../../models');
const { sendMail }  = require('../../utils/sendmail');

router.post('/signup', async (req,res) => {
    User.create({
        name: req.body.name,
        email: req.body.useremail,
        password: req.body.password
    })
    .then(dbUserData => {
        sendMail(req.body.useremail);
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.logged_in = true;
            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', async (req,res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.strUserName } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.strPassWord);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' })
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', async (req,res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(400).end();
    }
})

module.exports = router;