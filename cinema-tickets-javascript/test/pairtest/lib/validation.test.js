import { validateAccountId, validateTicketRequestsForOrder } from '../../../src/pairtest/lib/validation.js';
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js';

describe('validation', () => {
  describe('validateAccountID', () => {
    it('should throw an error if the account ID is a string', () => {
      expect(() => {
        const accountId = 'XYZ';
        validateAccountId(accountId);
      }).toThrow(new TypeError('accountId must be an integer'));
    });

    it('should throw an error if the account ID is too small', () => {
      expect(() => {
        const accountId = 0;
        validateAccountId(accountId);
      }).toThrow(new TypeError('accountId must be greater than 0'));
    });

    it('should return true if the accountId is valid', () => {
      const accountId = 1;
      const isValid = validateAccountId(accountId);
      expect(isValid).toBe(true);
    });
  });

  describe('validateTicketRequestsForOrder', () => {
    const ticketConfig = {
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

    it('should throw an error if ticketTypeRequests is not an array', () => {
      expect(() => {
        const ticketTypeRequests = 'XYZ';
        validateTicketRequestsForOrder(ticketConfig, ticketTypeRequests);
      }).toThrow(new TypeError('ticketTypeRequests must be an array'));
    });

    it('should throw an error if the items in ticketTypeRequests are not all of type TicketTypeRequest', () => {
      expect(() => {
        const ticketTypeRequests = [{type: 'ADULT', noOfTickets: 1}];
        validateTicketRequestsForOrder(ticketConfig, ticketTypeRequests);
      }).toThrow(new TypeError('ticketTypeRequests must be an array of TicketTypeRequest'));
    });

    it('should throw an error if an invalid ticket type is requested', () => {
      expect(() => {
        const ticketTypeRequests = [new TicketTypeRequest('VIP', 1)];
        validateTicketRequestsForOrder(ticketConfig, ticketTypeRequests);
      }).toThrow(new TypeError('type must be ADULT, CHILD, or INFANT'));
    });

    it('should throw an error if the total number of tickets requested exceeds the maximum', () => {
      expect(() => {
        const ticketTypeRequests = [
          new TicketTypeRequest('INFANT', 10),
          new TicketTypeRequest('CHILD', 10),
          new TicketTypeRequest('ADULT', 10)
        ];
        validateTicketRequestsForOrder(ticketConfig, ticketTypeRequests);
      }).toThrow(new RangeError('Number of tickets per order must not exceed 20'));
    });

    it('should throw an error if no tickets are requested', () => {
      // NOTE: This is not in the spec. We need to clarify the required behaviour when no tickets are requested.
      expect(() => {
        const ticketTypeRequests = [];
        validateTicketRequestsForOrder(ticketConfig, ticketTypeRequests);
      }).toThrow(new RangeError('At least one ticket must be requested'));
    });

    it('should throw an error if an infant or child ticket is requested without an adult ticket', () => {
      expect(() => {
        const ticketTypeRequests = [new TicketTypeRequest('INFANT', 10), new TicketTypeRequest('CHILD', 1)];
        validateTicketRequestsForOrder(ticketConfig, ticketTypeRequests);
      }).toThrow(new RangeError('A Child or Infant ticket must be accompanied by an Adult ticket'));
    });

    it('should return true if the ticketTypeRequests are valid for a single order', () => {
      const ticketTypeRequests = [new TicketTypeRequest('ADULT', 1)];
      const isValid = validateTicketRequestsForOrder(ticketConfig, ticketTypeRequests);

      expect(isValid).toBe(true);
    });
  });

});
