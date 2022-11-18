const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router');

const port = 3000;
const users = [];

const urlParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', urlParser, (req, res, next) => {
    users.push(req.body.name);
    res.send(`User <bold>${req.body.name}</bold> added`);
});

app.use(router);

app.listen(port, () => {
    console.log(`App is listening port: ${port}`);
})

exports.users = users;
