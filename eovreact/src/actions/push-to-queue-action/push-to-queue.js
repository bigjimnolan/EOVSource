const core = require('@actions/core');
const amqp = require('amqplib/callback_api');

async function run() {
    try {
        const mqUrl = core.getInput('mq-url', { required: true });
        const message = core.getInput('message', { required: true });

        amqp.connect(mqUrl, function(error0, connection) {
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

                channel.sendToQueue(queue, Buffer.from(message));
                console.log(" [x] Sent %s", msg);
            });
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = run;

if (require.main === module) {
    run();
}
