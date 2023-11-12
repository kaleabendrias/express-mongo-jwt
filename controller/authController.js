module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.signin_get = (req, res) => {
    res.render('signin')
}

module.exports.signin_post = (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    console.log(email, password)
    res.send('sign in post')
}

module.exports.signup_post = (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    console.log(email, password)
    res.send('signup post');
}