const express = require('express');
const path = require('path');

const router = require('./router');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

const port = 3000;

app.listen(port, () => {
    console.log(`App listening port ${port}`);
})
