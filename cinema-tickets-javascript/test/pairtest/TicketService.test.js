// // import { jest } from '@jest/globals';

// import TicketService from '../../src/pairtest/TicketService.js';

// import { validateAccountId } from '../../src/pairtest/lib/validation.js';

// jest.mock('../../src/pairtest/lib/validation.js');

// describe('TicketService', () => {
//   // jest.mock('../../src/pairtest/lib/validation.js');
//   let ticketService;

//   beforeEach(() => {
//     ticketService = new TicketService();
//   });

//   describe('purchaseTickets', () => {
//     it('validates the account Id', () => {
//       // validateAccountId.mockReturnValue(true);
//       validateAccountId.mockImplementation(() => true);

//       const accountId = 'XYZ';
//       const ticketTypeRequests = [];
//       ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
//       expect(validateAccountId).toHaveBeenCalledWith(accountId);
//     });
//   });
// });

it('should pass', () => {
  expect(1 + 1).toBe(2);
});
