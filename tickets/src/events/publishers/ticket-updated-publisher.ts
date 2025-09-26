import {
  Publisher,
  Subjects,
  TicketUpdatedEvents
} from "@rohxnrai/todo-backend";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvents> {
  readonly subject = Subjects.TicketUpdated
}