const User = require('../../models/user')
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const webIsAuth = require('../../middlewares/web-is-Auth');
const jwt = require('jsonwebtoken');
const VehicleType = require('../../models/vehicleType');


router.get("/", webIsAuth, async (req, res) => {
  // res.send(req.name)
  const models = await VehicleType.findAll({
    attributes: ["id", "type", "photo"],
    where: {
      deletedAt: null
    },
  });
  const arr = []
  models.forEach(element => {
    arr.push({ id: element.id, type: element.type, photo: element.photo })
  });
  // const a = [{a:"a"},{a:"a"},{a:"a"}]
  // res.send(arr)
  res.render("index", {
    layout: "main",
    isLoggedIn: req.isLoggedIn,
    name: req.name,
    total_payment: req.total_payment,
    discount: req.discount,
    models: arr,
    url: process.env.URL
  });
});

router.get('/signup', (req, res) => {
  res.render('user/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false

  });
})

router.post('/signup', (req, res) => {
  // const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: req.body.email } })
    .then(userDoc => {
      if (userDoc || password == null) {
        return res.redirect('/web/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: req.body.name,
            address: null,
            discount: 0,
            total_payment: 0,
            role_id: 2,
            password: hashedPassword,
            email: req.body.email,
          });
          return user.save();
        })
        .then(result => {
          const token = jwt.sign(
            {
              email: result.email,
              userId: result.id.toString(),
              role: result.role_id
            },
            process.env.JWT,
            { expiresIn: '1y' }
          );

          // document.cookie = "token="+token;      // res.status(200).json({ token: token, userId: loadedUser.id.toString() });
          res.cookie('token', token)
          return res.redirect('/web');
        });
    })
    .catch(err => {
      console.log(err);
    });
})

router.get('/login', (req, res) => {
  res.render('user/login', {
    path: '/login',
    pageTitle: 'Login',
  });
})
router.post('/login', (req, res) => {

  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        return res.redirect('/web/login');
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {

      if (!isEqual) {
        return res.redirect('/web/login');
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

      res.cookie('token', token)

      return res.redirect('/web');
    })
    .catch(err => {
      res.send(err);

    });
})




router.get("/settings", webIsAuth, (req, res) => {
  // res.send(req.user)
  if (!req.isLoggedIn) {
    res.redirect('/web/login');
  } else {
    res.render("user/settings", {
      layout: "main",
      isLoggedIn: req.isLoggedIn,
      name: req.name,
      total_payment: req.total_payment,
      discount: req.discount,
      phone: req.phone,

    });
  }

});
router.post("/settings", webIsAuth, async (req, res) => {
  if (!req.isLoggedIn) {
    res.redirect('/web/login');
  }
  if (!req.isLoggedIn) {
    res.render('user/login', {
      path: '/login',
      pageTitle: 'Login',
    });
  }
  // res.send(req.body.pwd+"s")
  if (req.body.pwd !== "") {

    const pass = await bcrypt.hash(req.body.pwd, 12).catch(err => { throw err });
    const user = await User.update({
      name: req.body.name,
      phone: req.body.phone,
      password: pass
    }, {
      where: {
        id: req.userId,
      },
    }).catch(err => { res.send(err) });
    const updatedUser = await User.findOne({ where: { id: req.userId } })

    const token = jwt.sign(
      {
        email: updatedUser.email,
        userId: updatedUser.id.toString(),
        role: updatedUser.role_id
      },
      process.env.JWT,
      { expiresIn: '1y' }
    );
    res.cookie('token', token)

  } else {

    const user = await User.update({
      name: req.body.name,
      phone: req.body.phone,
    }, {
      where: {
        id: req.userId,
      },
    }).catch(err => { res.send(err) });
  }
  res.redirect('/web')
});


module.exports = router;
