import {
  Publisher,
  Subjects,
  TicketCreatedEvents
} from "@rohxnrai/todo-backend";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvents> {
  readonly subject = Subjects.TicketCreated
}