import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js';

describe('TicketTypeRequest', () => {
  // ...Existing tests for the existing functionality

  it('should create immutable instances', () => {
    const ticketTypeRequest = new TicketTypeRequest('ADULT', 1);
    expect(() => {
      ticketTypeRequest.ticketType = 'CHILD';
    }).toThrow();
    expect(() => {
      ticketTypeRequest.getNoOfTickets = () => {};
    }).toThrow();
  });
});
