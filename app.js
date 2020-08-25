const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users');

const app = express();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Who controls the past controls the future. Who controls the present controls the past.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
passport.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongo
mongoose.connect(db, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then( () => console.log('MongoDB connected../'))
.catch( err => console.log(err.message));

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users'));



app.listen(3000,  () => "The sever is running");