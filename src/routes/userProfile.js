const router = require("express").Router();
const isAdmin = require('../middlewares/is-Admin')
const Model = require("../models/user");



router.get("/", isAdmin ,(req, res, next) => {
    res.status(200).json(req.user)
});

router.post("/", isAdmin , async (req, res, next) => {
    console.log(req.body)
    let userr = {}
    if (req.body.pwd) {

        const pass = await bcrypt.hash(req.body.pwd, 12).catch(err => { throw err });
        const user = await Model.update({
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
          password: pass
        }, {
          where: {
            id: req.user.id,
          },
        }).catch(err => { res.send(err) });
        userr = await Model.findOne({ where: { id: req.userId } })
      } else {
    
        userr = await Model.update({
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
        }, {
          where: {
            id: req.userId,
          },
        }).catch(err => { res.send(err) });
        console.log("asdfasdfsadf")
        console.log(userr)
      }
    res.status(200).json(userr)
});


module.exports = router;