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

  _validateNumberOfTicketsPerOrder(ticketTypeRequests);
  _validateTicketCombinations(ticketTypeRequests);

  return true;
};

const _validateNumberOfTicketsPerOrder = (ticketTypeRequests) => {
  const numberOfTicketsRequested = ticketTypeRequests.reduce((numberOfTickets, ticketTypeRequest) => {
    return numberOfTickets += ticketTypeRequest.getNoOfTickets();
  }, 0);

  if (numberOfTicketsRequested > MAXIMUM_TICKETS_PER_ORDER) {
    throw new RangeError(`Number of tickets per order must not exceed ${MAXIMUM_TICKETS_PER_ORDER}`);
  }
};

const _validateTicketCombinations = (ticketTypeRequests) => {
  if (ticketTypeRequests.length === 0) {
    throw new RangeError('At least one ticket must be requested');
  }

  const doesIncludeAdultTicket = !!ticketTypeRequests.find((ticketTypeRequest) => ticketTypeRequest.getTicketType() === 'ADULT');
  if (!doesIncludeAdultTicket) {
    throw new RangeError('A Child or Infant ticket must be accompanied by an Adult ticket');
  }
};
