import TicketTypeRequest from './TicketTypeRequest.js';

const MAXIMUM_TICKETS_PER_ORDER = 20;

export const validateAccountId = (accountId) => {
  if (!Number.isInteger(accountId)) {
    throw new TypeError('accountId must be an integer');
  }

  if (accountId <= 0) {
    throw new TypeError('accountId must be greater than 0');
  }

  return true;
};

export const validateTicketRequestsForOrder = (ticketTypeRequests) => {
  if (!Array.isArray(ticketTypeRequests)) {
    throw new TypeError('ticketTypeRequests must be an array');
  }

  ticketTypeRequests.forEach((ticketTypeRequest) => {
    if (ticketTypeRequest instanceof TicketTypeRequest === false) {
      throw new TypeError('ticketTypeRequests must be an array of TicketTypeRequest');
    }
  });

  const numberOfTicketsRequested = ticketTypeRequests.reduce((numberOfTickets, ticketTypeRequest) => {
    return numberOfTickets += ticketTypeRequest.getNoOfTickets();
  }, 0);

  if (numberOfTicketsRequested > MAXIMUM_TICKETS_PER_ORDER) {
    throw new RangeError(`Number of tickets per order must not exceed ${MAXIMUM_TICKETS_PER_ORDER}`);
  }

  return true;
};
