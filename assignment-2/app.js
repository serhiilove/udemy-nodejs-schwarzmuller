const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log('Request type: ', req.method);
    next();
})

app.use('/', (req, res) => {
    res.send('This is root page');
});

app.get('/users', (req, res) => {
    res.send('This is users page')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
