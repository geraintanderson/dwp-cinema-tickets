import TicketService from '../../src/pairtest/TicketService.js';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest.js';
import { validateAccountId, validateTicketRequestsForOrder } from '../../src/pairtest/lib/validation.js';
import { calculateTotalNumberOfSeats, calculateTotalPrice } from '../../src/pairtest/lib/order.js';

jest.mock('../../src/pairtest/lib/validation.js');
jest.mock('../../src/pairtest/lib/order.js');

describe('TicketService', () => {
  describe('purchaseTickets', () => {
    let ticketService;

    beforeEach(() => {
      jest.clearAllMocks();
      ticketService = new TicketService();
    });

    it('validates the account Id', () => {
      validateAccountId.mockReturnValue(true);

      const accountId = 1;
      const ticketTypeRequests = [];
      ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      expect(validateAccountId).toHaveBeenCalledWith(accountId);
    });

    it('validates the ticket requests', () => {
      validateAccountId.mockReturnValue(true);
      validateTicketRequestsForOrder.mockReturnValue(true);

      const accountId = 1;
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 2),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 4)
      ];
      ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      expect(validateTicketRequestsForOrder).toHaveBeenCalledWith(ticketTypeRequests);
    });

    it('calculates the number of seats required', () => {
      validateAccountId.mockReturnValue(true);
      validateTicketRequestsForOrder.mockReturnValue(true);
      calculateTotalNumberOfSeats.mockReturnValue(7);

      const accountId = 1;
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 2),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 4)
      ];
      ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      expect(calculateTotalNumberOfSeats).toHaveBeenCalledWith(ticketTypeRequests);
    });

    it('calculates the total order price required', () => {
      validateAccountId.mockReturnValue(true);
      validateTicketRequestsForOrder.mockReturnValue(true);
      calculateTotalNumberOfSeats.mockReturnValue(7);
      calculateTotalPrice.mockReturnValue(30);

      const accountId = 1;
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 2),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 4)
      ];
      const ticketConfig = {
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
      ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      expect(calculateTotalPrice).toHaveBeenCalledWith(ticketConfig, ticketTypeRequests);
    });
  });
});
