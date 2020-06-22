const express = require('express')
const foosRouter = require('./foos-router');

const app = express()
const port = 3000

const someWeirdMiddleware = (req, res, next) => {
    console.log(req.method);

    req.isAuthorized = true;
    req.test2 = 'test2';
    req.test3 = 'test3';

    next();
};


const appGetMiddleware = (req, res) => {
    console.log(req.isAuthorized, req.test2, req.test3);

    res.send('Hello World! // GET');
};

const appPostMiddleware = (req, res) => res.send('Hello World! // POST');

app.use(someWeirdMiddleware);




app.use('/foos', foosRouter);



/** Managing routes */
app.get('/', appGetMiddleware);

app.post('/', appPostMiddleware);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})