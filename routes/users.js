const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/users');



router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

//register handle
router.post('/register', (req, res) => {
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
    });
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/dashboard');
        });
    });
});

router.post('/login', 
    passport.authenticate('local', { failureRedirect : '/users/login' }),
    (req, res) => {
        console.log(req.user);
        res.render('dashboard');
})



module.exports = router;