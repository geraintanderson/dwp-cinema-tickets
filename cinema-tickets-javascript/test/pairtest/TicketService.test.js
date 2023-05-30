import TicketService from '../../src/pairtest/TicketService.js';

describe('TicketService', () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  describe('purchaseTickets', () => {
    it('returns dummy data', () => {
      // XXX: TMP Test only for initial setup
      const accountId = '123';
      const ticketTypeRequests = [];
      const result = ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      expect(result).toEqual('XYZ');
    });
  });
});
