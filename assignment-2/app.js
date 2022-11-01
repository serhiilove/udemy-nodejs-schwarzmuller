const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log('Request type: ', req.method);
    next();
})

app.get('/', (req, res) => {
    res.send('Hello world!');
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
