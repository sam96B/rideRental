const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log(authHeader)
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    res.status(401).json({
      'status': false
    });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT);
  } catch (err) {
    err.statusCode = 500;
    // throw err;
    res.status(401).json({
      'status': false
    })
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    res.status(401).json({
      'status': false
    })
  }
  req.userId = decodedToken.userId;
  next();
};
