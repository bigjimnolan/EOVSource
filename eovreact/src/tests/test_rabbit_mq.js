const amqp = require('amqplib/callback_api');
const user = process.env.MQ_USER
const pwd  = process.env.MQ_PASS

async function send() {
    try {
        const mqUrl = "amqps://"+user+":"+pwd+"@electroopticalvisions.com"
        const message = "TestUpdate2"

        amqp.connect(mqUrl, function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                let queue = 'updates';
                channel.assertQueue(queue, {
                    durable: false
                });

                channel.sendToQueue(queue, Buffer.from(message));
            });
	    setTimeout(function() {
	    connection.close();
            console.log("closing")
	    process.exit()},500)
        });
    } catch (error) {
        console.log(error.message)
    }
}

async function receive() {
    try {
        amqp.connect("amqps://"+user+":"+pwd+"@electroopticalvisions.com", function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
          if (error1) {
            throw error1;
          }
          var queue = 'updates';
   
          channel.assertQueue(queue, {
            durable: false
          });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });		
        });
      });
    } catch (error) {
	console.log(error.message)
    }
}

send().then(()=>receive()).then(()=>{console.log("starting...")})
