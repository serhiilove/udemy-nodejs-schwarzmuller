const express = require('express');
const path = require('path');
const users = require('./app');
const bodyParser = require('body-parser');

const router = express.Router();

const urlParser = bodyParser.urlencoded({ extended: false });

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

router.post('/', urlParser, (req, res) => {
    res.status(200).send(`<p>You have added user <strong>${req.body.name}</strong></p>`);
});

router.get('/users', (req, res) => {
    res.render(path.join(__dirname, 'views/users'), { users: users.users });
})

module.exports = router;

