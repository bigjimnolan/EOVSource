package main

import (
	"eovgo/amqp"
	"fmt"
	"os"
	"time"
)

func main()  {
	amqpUrl := "amqp://" + os.Getenv("MQ_USER") + ":" + os.Getenv("MQ_PASS") + "@localhost"//"@electroopticalvisions.com"
	for {
		fmt.Printf("connecting...\n")
		amqp.Receive(amqpUrl)
		time.Sleep(5 * time.Minute)
	}
}