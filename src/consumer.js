require("dotenv").config();

const username = process.env.RABBITMQ_USERNAME;
const password = process.env.RABBITMQ_PASSWORD;
const service = process.env.RABBITMQ_SERVICE;

const amqp = require("amqplib/callback_api");
amqp.connect(
  `amqp://${username}:${password}@${service}`,
  function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const queue = "first_queue";
      channel.assertQueue(queue, {
        durable: false,
      });
      console.log("Waiting for messages in %s. To exit press CTRL+C", queue);
      channel.consume(
        queue,
        function (msg) {
          console.log("Received %s", msg.content.toString());
        },
        {
          noAck: true,
        }
      );
    });
  }
);
