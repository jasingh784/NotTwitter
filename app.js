const express = require('express');
const app = express();


app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes/index.js'));

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/login', (req, res) => {
    res.render("register");
});

app.get('/register', (req, res) => {
    res.render("register");
});

app.post('/register', (req, res) => {
    res.render("register");
});



app.listen(3000,  () => "The sever is running");