const express = require("express");
require('dotenv').config()
const bodyParser = require("body-parser");
const port = 3000;


const username = process.env.RABBITMQ_USERNAME;
const password = process.env.RABBITMQ_PASSWORD;
const service = process.env.RABBITMQ_SERVICE;

const amqp = require("amqplib/callback_api");

const initRabbitMQConnection = (callback) => {
  amqp.connect(
    `amqp://${username}:${password}@${service}`,
    function (error0, connection) {
      if (error0) {
        throw error0;
      }

      /// 3 Establish a channel
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        const queue_name = "first_queue";
        const wrapper = {
          send: (message) => {
            channel.sendToQueue(queue_name, Buffer.from(message));
          },
        };
        channel.assertQueue(queue_name, { durable: false });
        callback(wrapper);
      });
    }
  );
};


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


initRabbitMQConnection(initServer);
