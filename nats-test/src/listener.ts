import nats, { Message } from "node-nats-streaming"
import { randomBytes } from "crypto";

console.clear ()

const stan = nats.connect (
  "ticketing",
  randomBytes ( 4 ).toString ( 'hex' )
  , {
    url : "http://localhost:4222"
  } )

stan.on ( "connect", () => {
  console.log ( "Listener connected to NATS" )
  
  stan.on ( "close", () => {
    console.log ( "Listener disconnected" )
    process.exit ()
  } )
  
  const options = stan
    .subscriptionOptions ()
    .setManualAckMode ( true )
    .setDeliverAllAvailable()
    .setDurableName("accounting-service")
    
  const subscription = stan.subscribe (
    "ticket:created",
    "orders-service-queue-group",
    options
  )
  
  subscription.on ( "message", ( msg : Message ) => {
    const data = msg.getData ()
    
    if ( typeof data === "string" ) {
      console.log ( `Received event #${ msg.getSequence () } at ${ msg.getTimestamp () }, with data: ${ data }` );
    }
    
    msg.ack ()
  } )
} )

process.on ( "SIGINT", () => stan.close () )
process.on ( "SIGTERM", () => stan.close () )
process.on ( "SIGBREAK", () => stan.close () )
