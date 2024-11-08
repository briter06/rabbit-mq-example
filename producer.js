require('dotenv').config()

const username = process.env.RABBITMQ_USERNAME
const password = process.env.RABBITMQ_PASSWORD

const amqp = require("amqplib/callback_api");

///2- Establish a connection
amqp.connect(`amqp://${username}:${password}@localhost`, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  /// 3 Establish a channel
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue_name = "first_queue";
    const msg = "Hello world";
    channel.assertQueue(queue_name, { durable: false });
    /// send message using the stablished channel to the queue
    channel.sendToQueue(queue_name, Buffer.from(msg));
    console.log("Sent %s", msg);
  });
  /// Close the connection with the broker server and exit the program
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
