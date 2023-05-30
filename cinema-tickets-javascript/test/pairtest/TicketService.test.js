import TicketService from '../../src/pairtest/TicketService.js';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest.js';
import { validateAccountId, validateTicketRequestsForOrder } from '../../src/pairtest/lib/validation.js';
import { calculateTotalNumberOfSeatsForOrder } from '../../src/pairtest/lib/seats.js';

jest.mock('../../src/pairtest/lib/validation.js');
jest.mock('../../src/pairtest/lib/seats.js');

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
      calculateTotalNumberOfSeatsForOrder.mockReturnValue(7);

      const accountId = 1;
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 2),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 4)
      ];
      ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      expect(calculateTotalNumberOfSeatsForOrder).toHaveBeenCalledWith(ticketTypeRequests);
    });
  });
});
