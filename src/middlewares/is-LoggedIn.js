const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = require("express").Router();

module.exports = async (req, res, next) => {
    const authHeader = req.headers.cookie;
    if (!authHeader) {
        res.render()
    }

    var output = {};
    req.headers.cookie.split(/\s*;\s*/).forEach(function(pair) {
      pair = pair.split(/\s*=\s*/);
      output[pair[0]] = pair.splice(1).join('=');
    });
    var json = JSON.stringify(output, null, 4);
    json = JSON.parse(json)
    

 
    const token= json["token"]
    console.log(json.token)

    let decodedToken;
    try {

        decodedToken = jwt.verify(token, process.env.JWT);
    } catch (err) {
        console.log("--------NOOOOOOOOOO---------------------------")

        return next()

    }
    console.log(decodedToken)
    console.log("-----------------------------------")

    if (decodedToken) {
        console.log("-----------------------------------")
        const user = await User.findOne({id: decodedToken.userId})
        req.isLoggedIn = true
        req.userId = user.id
        req.name = user.name
        req.discount = user.discount
        req.total_payment = user.total_payment
        // req.
        
    }
    //   req.userId = decodedToken.userId;
    next();
};
