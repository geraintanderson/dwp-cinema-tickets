import TicketService from '../../src/pairtest/TicketService.js';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest.js';
import { validateAccountId, validateTicketRequestsForOrder } from '../../src/pairtest/lib/validation.js';
import { calculateTotalNumberOfSeats, calculateTotalPrice } from '../../src/pairtest/lib/order.js';
import TicketPaymentService from '../../src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../../src/thirdparty/seatbooking/SeatReservationService.js';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException.js';

jest.mock('../../src/pairtest/lib/validation.js');
jest.mock('../../src/pairtest/lib/order.js');
jest.mock('../../src/thirdparty/paymentgateway/TicketPaymentService.js');
jest.mock('../../src/thirdparty/seatbooking/SeatReservationService.js');

describe('TicketService', () => {
  describe('purchaseTickets', () => {
    let ticketService;
    const DUMMY_ORDER_PRICE = 30;
    const DUMMY_ORDER_SEATS = 7;

    beforeEach(() => {
      jest.clearAllMocks();
      ticketService = new TicketService();
      validateAccountId.mockReturnValue(true);
      validateTicketRequestsForOrder.mockReturnValue(true);
      calculateTotalPrice.mockReturnValue(DUMMY_ORDER_PRICE);
      calculateTotalNumberOfSeats.mockReturnValue(7);
    });

    it('validates the account Id', () => {
      const accountId = 1;
      const ticketTypeRequests = [];
      ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      expect(validateAccountId).toHaveBeenCalledWith(accountId);
    });

    it('throws an InvalidPurchaseException if the account Id is invalid', () => {
      validateAccountId.mockImplementation(() => {
        throw new TypeError('validation error');
      });

      const accountId = 1;
      const ticketTypeRequests = [];
      
      expect(() => {
        ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      }).toThrow(new InvalidPurchaseException('validation error'));
    });

    it('validates the ticket requests', () => {
      const accountId = 1;
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 2),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 4)
      ];
      ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      expect(validateTicketRequestsForOrder).toHaveBeenCalledWith(ticketTypeRequests);
    });

    it('throws an InvalidPurchaseException if the ticket request is invalid', () => {
      validateTicketRequestsForOrder.mockImplementation(() => {
        throw new TypeError('validation error');
      });

      const accountId = 1;
      const ticketTypeRequests = [];
      
      expect(() => {
        ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      }).toThrow(new InvalidPurchaseException('validation error'));
    });

    it('calculates the total order price required', () => {
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

    it('makes the payment', () => {
      const mockTicketPaymentServiceInstance = TicketPaymentService.mock.instances[0];
      const mockMakePayment = mockTicketPaymentServiceInstance.makePayment;

      const accountId = 1;
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 2),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 4)
      ];
      ticketService.purchaseTickets(accountId, ...ticketTypeRequests);

      expect(mockMakePayment).toHaveBeenCalledWith(accountId, DUMMY_ORDER_PRICE);
    });

    it('calculates the number of seats required', () => {
      const accountId = 1;
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 2),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 4)
      ];
      ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
      expect(calculateTotalNumberOfSeats).toHaveBeenCalledWith(ticketTypeRequests);
    });

    it('reserves the seats', () => {
      const mockSeatReservationServiceInstance = SeatReservationService.mock.instances[0];
      const mockReserveSeat = mockSeatReservationServiceInstance.reserveSeat;

      const accountId = 1;
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 2),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 4)
      ];
      ticketService.purchaseTickets(accountId, ...ticketTypeRequests);

      expect(mockReserveSeat).toHaveBeenCalledWith(accountId, DUMMY_ORDER_SEATS);
    });

    it('returns the order details', () => {
      const accountId = 1;
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 2),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 4)
      ];
      const orderDetails = ticketService.purchaseTickets(accountId, ...ticketTypeRequests);

      expect(orderDetails).toEqual({
        // NOTE: The expected response type was not defined in the spec, and could be changed.
        seats: DUMMY_ORDER_SEATS,
        price: DUMMY_ORDER_PRICE
      });
    });
  });
});
