import request from "supertest";
import { app } from "../../app";
// import mongoose from "mongoose";
// import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

const buildTicket = async ( title : string, price : number ) => {
  const ticket = Ticket.build ( {
    title,
    price
  } );
  await ticket.save ();
  
  return ticket;
};

it ( "fetches orders for an particular user", async () => {
  const ticketOne = await buildTicket ( "concert", 19.99 );
  const ticketTwo = await buildTicket ( "concert", 19.99 );
  const ticketThree = await buildTicket ( "concert", 19.99 );
  
  const userOne = signup ();
  const userTwo = signup ();
  
  const { body : orderOne } = await request ( app )
    .post ( "/api/orders" )
    .set ( "Cookie", userOne )
    .send ( {
      ticketId : ticketOne.id
    } )
    .expect ( 201 );
  
  const { body : orderTwo } = await request ( app )
    .post ( "/api/orders" )
    .set ( "Cookie", userTwo )
    .send ( {
      ticketId : ticketTwo.id
    } )
    .expect ( 201 );
  
  const { body : orderThree } = await request ( app )
    .post ( "/api/orders" )
    .set ( "Cookie", userTwo )
    .send ( {
      ticketId : ticketThree.id
    } )
    .expect ( 201 );
  
  const responseOne = await request ( app )
    .get ( "/api/orders" )
    .set ( "Cookie", userOne )
    .expect ( 200 );
  
  const responseTwo = await request ( app )
    .get ( "/api/orders" )
    .set ( "Cookie", userTwo )
    .expect ( 200 );
  
  expect ( responseOne.body.length ).toEqual ( 1 );
  expect ( responseOne.body[0].id ).toEqual ( orderOne.id );
  expect ( responseOne.body[0].ticket.id ).toEqual ( ticketOne.id );
  
  expect ( responseTwo.body.length ).toEqual ( 2 );
  expect ( responseTwo.body[0].id ).toEqual ( orderTwo.id );
  expect ( responseTwo.body[0].ticket.id ).toEqual ( ticketTwo.id );
  expect ( responseTwo.body[1].id ).toEqual ( orderThree.id );
  expect ( responseTwo.body[1].ticket.id ).toEqual ( ticketThree.id );
} )