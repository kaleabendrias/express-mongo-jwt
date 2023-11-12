const User = require('../models/user')

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.signin_get = (req, res) => {
    res.render('signin')
}

module.exports.signin_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);
    res.send('user login');
}

module.exports.signup_post = async (req, res) => {
   const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  }
  catch(err) {
    console.log(err);
    res.status(400).send('error, user not created');
  }
 
}