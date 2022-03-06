const User = require('../models/user');
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {

  const { email, name, password, } = req.body;
  bcrypt.hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        name: name,
        discount: 0,
        total_payment: 0,
        role_id: 1,
        password: hashedPw,
        email: email,
      })
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', user: result.id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

router.post('/login', (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body;
  if (email == null || password == null) return res.status(401).json({ status: false })
  let loadedUser;

  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        res.status(401).json({ status: false });
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {

      if (!isEqual) {
        return res.status(401).json({ status: false });
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id.toString(),
          role: loadedUser.role_id

        },
        process.env.JWT,
        { expiresIn: '1y' }
      );
      res.status(200).json({ token: token, userId: loadedUser.id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        console.log(err)
        res.status(500).json("error")
      }
    });
})

module.exports = router;
