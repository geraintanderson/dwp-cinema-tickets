// import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { validateAccountId, validateTicketRequestsForOrder } from './lib/validation.js';
import { calculateTotalNumberOfSeatsForOrder } from './lib/seats.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  #ticketConfig = {
    INFANT: {
      price: 0, seats: 0
    },
    CHILD: {
      price: 10, seats: 1
    },
    ADULT: {
      price: 20, seats: 1
    }
  };

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
    validateAccountId(accountId);
    validateTicketRequestsForOrder(ticketTypeRequests);

    const totalSeatsRequired = calculateTotalNumberOfSeatsForOrder(ticketTypeRequests);

  }
}
