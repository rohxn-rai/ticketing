import request from "supertest";
import { app } from "../../app";

const createTicket = (title: string, price: number) => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", signup())
    .send({
      title,
      price,
    })
    .expect(201);
};

it("can fetch a list of tickets", async () => {
  await createTicket("ticket1", 20);
  await createTicket("ticket2", 20);
  await createTicket("ticket3", 20);
  await createTicket("ticket4", 20);

  const response = await request(app).get("/api/tickets").send();
  expect(200);

  expect(response.body.length).toEqual(4);
});
