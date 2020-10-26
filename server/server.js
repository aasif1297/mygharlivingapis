const express = require('express');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/api', apiRouter);

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT} or 3000`);
})