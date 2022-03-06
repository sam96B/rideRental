const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  console.log(req.body)

  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    res.status(401).json({
      'status1': false
    });
  }
  const token = authHeader
  console.log(token)

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT);
  } catch (err) {
    // throw err;
    res.status(401).json({
      'status2': false
    })
  }
  //   res.json({test: "test"})
  if (!decodedToken) {
    return res.status(401).json({
      'status3': false
    })

  } else {
    const user = await User.findOne({
      attributes: ['id', 'name', 'phone', 'address', 'email', 'role_id'],
      where: { id: decodedToken.userId }
    })
    if (user.role_id != 1) {
      res.status(401).json({
        'status': 'false4'
      })
    }
    req.userId = decodedToken.userId
    req.user = user;
    

    next();

  }

};
