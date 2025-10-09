import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it ( "fetches the order", async () => {
  const ticket = Ticket.build ( {
    title : "Concert",
    price : 29.99
  } );
  await ticket.save ();
  
  const user = signup ();
  
  const { body : createdOrder } = await request ( app )
    .post ( "/api/orders" )
    .set ( "Cookie", user )
    .send ( { ticketId : ticket.id } )
    .expect ( 201 );
  
  const { body : fetchedOrder } = await request ( app )
    .get ( `/api/orders/${ createdOrder.id }` )
    .set ( "Cookie", user )
    .expect ( 200, createdOrder )
  
  expect ( fetchedOrder.id ).toEqual ( createdOrder.id );
} )

it ( "returns an error if one user tries to fetch another users order", async () => {
  const ticket = Ticket.build ( {
    title : "Concert",
    price : 29.99
  } );
  await ticket.save ();
  
  const user = signup ();
  
  const { body : createdOrder } = await request ( app )
    .post ( "/api/orders" )
    .set ( "Cookie", user )
    .send ( { ticketId : ticket.id } )
    .expect ( 201 );
  
  await request ( app )
    .get ( `/api/orders/${ createdOrder.id }` )
    .set ( "Cookie", signup () )
    .expect ( 401 )
} )