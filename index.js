const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.send('/index.html');
});

app.listen(port, () => {
    console.log(`Piano testing running on https://localhost:${port}`);
});