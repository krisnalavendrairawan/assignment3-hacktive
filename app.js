require("dotenv").config()

const express = require('express');
const app = express();
const PORT = process.env.PORT
const router = require('./routers')
const env = process.env.NODE_ENV

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router)


if(env !== "test"){
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

module.exports = app
