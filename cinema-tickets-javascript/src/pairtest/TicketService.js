// import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { validateAccountId, validateTicketRequestsForOrder } from './lib/validation.js';
import { calculateTotalNumberOfSeats, calculateTotalPrice } from './lib/order.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';
export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  #ticketConfig = {
    INFANT: {
      price: 0
    },
    CHILD: {
      price: 10
    },
    ADULT: {
      price: 20
    }
  };

  #ticketPaymentService = new TicketPaymentService();
  #seatReservationService = new SeatReservationService();

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
    try {
      validateAccountId(accountId);
      validateTicketRequestsForOrder(ticketTypeRequests);
    } catch (error) {
      throw new InvalidPurchaseException(error.message);
    }

    const totalOrderPrice = calculateTotalPrice(this.#ticketConfig, ticketTypeRequests);
    this.#ticketPaymentService.makePayment(accountId, totalOrderPrice);

    const totalSeatsRequired = calculateTotalNumberOfSeats(ticketTypeRequests);
    this.#seatReservationService.reserveSeat(accountId, totalSeatsRequired);

    return {
      seats: totalSeatsRequired,
      price: totalOrderPrice
    };
  }
}
