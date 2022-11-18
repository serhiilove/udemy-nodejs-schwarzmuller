const express = require('express');
const path = require('path');

const users = require('./app');

const router = express.Router();

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '/views/index'));
});

router.get('/users', (req, res) => {
    res.render(path.join(__dirname, 'views/users'), { users: users.users });
});

router.use('/', (req, res) => {
    res.render(path.join(__dirname, 'views/404'));
});

module.exports = router;

