import { app } from "./app";
import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  const PORT = 3000;
  
  if ( !process.env.JWT_KEY ) {
    throw new Error ( "JWT_KEY must be defined" );
  }
  if ( !process.env.MONGODB_URI ) {
    throw new Error ( "MONGODB_URI must be defined" );
  }
  if ( !process.env.NATS_URL ) {
    throw new Error ( "NATS_URL must be defined" );
  }
  if ( !process.env.NATS_CLUSTER_ID ) {
    throw new Error ( "NATS_CLUSTER_ID must be defined" );
  }
  if ( !process.env.NATS_CLIENT_ID ) {
    throw new Error ( "NATS_CLIENT_ID must be defined" );
  }

  try {
    await natsWrapper.connect (
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    
    natsWrapper.client.on ( "close", () => {
      console.log ( "Listener connection closed!" )
      process.exit ()
    } )
    
    process.on ( "SIGINT", () => natsWrapper.client.close () )
    process.on ( "SIGTERM", () => natsWrapper.client.close () )
    process.on ( "SIGBREAK", () => natsWrapper.client.close () )
    
    await mongoose.connect ( process.env.MONGODB_URI );
    
    console.log ( "✓ - Connected to MongoDB" )
  } catch ( err ) {
    console.error ( err )
  }
  
  app.listen ( PORT, () => {
    console.log ( `Listening on port ${ PORT }` );
  } );
};

start ().catch ( ( err ) => {
  console.error ( "Failed to start:", err );
  process.exit ( 1 );
} );
