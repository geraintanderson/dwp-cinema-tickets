import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js';
import { calculateTotalNumberOfSeats, calculateTotalPrice } from '../../../src/pairtest/lib/order.js';

describe('seats', () => {
  describe('calculateTotalNumberOfSeats', () => {
    it('should not allocate seats for infant tickets', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 1),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 5)
      ];
      const numberOfSeats = calculateTotalNumberOfSeats(ticketTypeRequests);
      expect(numberOfSeats).toBe(8);
    });

    it('should correctly handle multiple ticket types', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 1),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 5),
        new TicketTypeRequest('ADULT', 5)
      ];
      const numberOfSeats = calculateTotalNumberOfSeats(ticketTypeRequests);
      expect(numberOfSeats).toBe(13);
    });
  });

  describe('calculateTotalPrice', () => {
    it('should return the total order price for a given ticket configuration', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 1),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 5),
      ];
      const ticketConfig = {
        INFANT: {
          price: 5
        },
        CHILD: {
          price: 7
        },
        ADULT: {
          price: 9
        }
      };
      const orderTotalPrice = calculateTotalPrice(ticketConfig, ticketTypeRequests);
      expect(orderTotalPrice).toBe(71);
    });
  });
});
