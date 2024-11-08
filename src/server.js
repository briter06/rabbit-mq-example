const express = require("express");
require('dotenv').config()
const bodyParser = require("body-parser");
const port = 3000;
const rabbitMQ = require('./rabbit-mq');


const initServer = (wrapper) => {
    const app = express();
    
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());
    
    app.post("/", (req, res) => {
      wrapper.send(req.body.message);
      res.send({
        status: true
      });
    });
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
}


rabbitMQ(initServer);
