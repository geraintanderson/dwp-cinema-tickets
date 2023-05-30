import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js';
import { calculateTotalNumberOfSeatsForOrder } from '../../../src/pairtest/lib/seats.js';

describe('seats', () => {
  describe('calculateTotalNumberOfSeatsForOrder', () => {
    it('should not allocate seats for infant tickets', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 1),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 5)
      ];
      const numberOfSeats = calculateTotalNumberOfSeatsForOrder(ticketTypeRequests);
      expect(numberOfSeats).toBe(8);
    });

    it('should correctly handle multiple ticket types', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 1),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 5),
        new TicketTypeRequest('ADULT', 5)
      ];
      const numberOfSeats = calculateTotalNumberOfSeatsForOrder(ticketTypeRequests);
      expect(numberOfSeats).toBe(13);
    });
  });
});
