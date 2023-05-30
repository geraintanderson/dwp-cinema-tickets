import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { validateAccountId } from './lib/validation.js';

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

  // #validateAccountId(accountId) {
  //   return validateAccountID(accountId);
  // }
  #validateAccountId = validateAccountId;

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
    this.#validateAccountId(accountId);
    return 'XYZ'; // XXX: temp - delete this...
  }
}
