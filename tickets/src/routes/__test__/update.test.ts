import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the provided it does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", signup())
    .send({
      title: "ticket",
      price: 100,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", signup())
    .send({
      title: "ticket",
      price: 1001,
    })
    .expect(201);

  const ticketId = response.body.id;
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .send({
      title: "ticket",
      price: 100,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", signup())
    .send({
      title: "ticket",
      price: 1001,
    })
    .expect(201);

  const ticketId = response.body.id;
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", signup())
    .send({
      title: "ticket",
      price: 100,
    })
    .expect(401);
});

it("returns a 400 if the user provides an valid title or price", async () => {
  const userCookie = signup();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", userCookie)
    .send({
      title: "ticket",
      price: 1001,
    })
    .expect(201);

  const ticketId = response.body.id;

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", userCookie)
    .send({
      title: "",
      price: 100,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", userCookie)
    .send({
      price: 100,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", userCookie)
    .send({
      title: "ticket",
      price: -100,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", userCookie)
    .send({
      title: "ticket",
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const userCookie = signup();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", userCookie)
    .send({
      title: "ticket",
      price: 1001,
    })
    .expect(201);

  const ticketId = response.body.id;

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", userCookie)
    .send({
      title: "new ticket",
      price: 100,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual("new ticket");
  expect(ticketResponse.body.price).toEqual(100);
});
