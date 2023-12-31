const User = require('../models/user')
const jwt = require('jsonwebtoken')

// handle err
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //duplicate errr
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
}



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
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge });
    res.status(201).json({user: user._id});
  }
  catch(err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors });
  }
 
}