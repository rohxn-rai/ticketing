import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@rohxnrai/todo-backend";

it ( "marks an order as cancelled", async () => {
  const ticket = Ticket.build ( {
    title : "tent house",
    price : 9.99
  } );
  await ticket.save ();
  
  const user = signup ();
  
  const { body : order } = await request ( app )
    .post ( "/api/orders" )
    .set ( "Cookie", user )
    .send ( { ticketId : ticket.id } )
    .expect ( 201 );
  
  const { body : cancellingOrder } = await request ( app )
    .patch ( `/api/orders/${ order.id }` )
    .set ( "Cookie", user )
    .expect ( 204 );
  
  const updatedOrder = await Order.findById ( order.id );
  
  expect ( updatedOrder!.status ).toEqual ( OrderStatus.Cancelled );
} );

it.todo ( "emits an order cancelled event" );