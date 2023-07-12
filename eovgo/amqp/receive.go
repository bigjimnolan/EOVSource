package amqp

import (
	"encoding/json"
	"fmt"
	"log"
	"os/exec"

	amqp "github.com/rabbitmq/amqp091-go"
)

// CommandMessage is the structure holding different commands we can send to our site/docker stack.
type CommandMessage struct {
	Command string `json:"command"`
	Data    string `json:"data"`
}

// Receive connects to our preconfigured message queue and grabs the latest message.  If it is an update one, it updates the web container.
func Receive(amqpUrl string) {
	conn, err := amqp.Dial(amqpUrl)
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"updates", // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	failOnError(err, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	var forever chan struct{}

	go func() {
		var message CommandMessage
		for d := range msgs {

			json.Unmarshal(d.Body, &message)
			switch message.Command {
			case "update":
				/*
				docker-compose pull
				docker-compose up -d --remove-orphans
				yes | docker image prune
				 */
				exec.Command("docker-compose","pull")
				exec.Command("docker-compose","up", "-d", "--remove-orphans")
				exec.Command("yes","|", "docker","image","prune")
				break
			default:
				fmt.Printf("Unrecognized Command: %v\n msg-> %v\n", message.Command, message)
				break

			}
			log.Printf("Received a message: %s", d.Body)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}