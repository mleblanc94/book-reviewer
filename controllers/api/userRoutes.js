const router = require('express').Router();
const { User } = require('../../models');
const { sendMail }  = require('../../utils/sendmail');
const bcrypt = require('bcrypt');

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.useremail,
      password: req.body.password
    });

    // fire-and-forget email
    try { sendMail(req.body.useremail); } catch (e) { console.error('sendMail failed:', e); }

    // assign first, then save
    req.session.user_id   = dbUserData.id;
    req.session.role      = 'user';
    req.session.logged_in = true;

    req.session.save(err => {
      if (err) return res.status(500).json({ message: 'Session save failed' });
      res.json(dbUserData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.strUserName } });
    if (!userData) return res.status(400).json({ message: 'Incorrect email or password, please try again' });

    const validPassword = await userData.checkPassword(req.body.strPassWord);
    if (!validPassword) return res.status(400).json({ message: 'Incorrect email or password, please try again' });

    // assign first, then save
    req.session.user_id   = userData.id;
    req.session.role      = 'user';
    req.session.logged_in = true;

    req.session.save(err => {
      if (err) return res.status(500).json({ message: 'Session save failed' });
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// GUEST LOGIN (shared "Guest" user)
router.post('/guest', async (req, res) => {
  try {
    const guestEmail = process.env.GUEST_EMAIL || 'guest@bookreviewer.local';

    const [guest] = await User.findOrCreate({
      where: { email: guestEmail },
      defaults: {
        name: 'Guest',
        email: guestEmail,
        password: await bcrypt.hash(process.env.GUEST_PWD || 'guest', 10),
      },
    });

    // assign first, then save
    req.session.user_id   = guest.id;
    req.session.role      = 'guest';
    req.session.logged_in = true;

    req.session.save(err => {
      if (err) return res.status(500).json({ message: 'Session save failed' });
      res.json({ ok: true, user: { id: guest.id, name: 'Guest' } });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to start guest session' });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(err => {
      if (err) return res.status(500).json({ message: 'Failed to destroy session' });
      res.status(204).end();
    });
  } else {
    res.status(400).end();
  }
});

module.exports = router;
