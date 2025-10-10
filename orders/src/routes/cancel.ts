import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth
} from "@rohxnrai/todo-backend";
import { Order, OrderStatus } from "../models/order";
import mongoose from "mongoose";

const router = express.Router ();

router.patch (
  "/api/orders/:orderId",
  requireAuth,
  async (
    req : Request,
    res : Response
  ) => {
    const { orderId } = req.params
    if ( !mongoose.Types.ObjectId.isValid ( orderId ) )
      throw new BadRequestError ( "Not a valid Order ID." );
    
    const order = await Order.findById ( orderId )
      .populate ( "ticket" )
    
    if ( !order )
      throw new NotFoundError ();
    
    if ( order.userId !== req.currentUser!.id )
      throw new NotAuthorizedError ();
    
    order.status = OrderStatus.Cancelled;
    
    await order.save ();
    
    res.status ( 204 ).send ( order );
  } )

export { router as cancelOrderRouter }