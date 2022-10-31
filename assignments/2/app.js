const http = require('http');
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('req: ', req);
});

const server = http.createServer(app);
app.listen(3000);


