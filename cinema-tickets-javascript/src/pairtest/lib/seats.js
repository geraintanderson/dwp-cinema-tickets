export const calculateTotalNumberOfSeatsForOrder = (ticketTypeRequests) => {
  return ticketTypeRequests.reduce((numberOfSeats, ticketTypeRequest) => {
    if (ticketTypeRequest.getTicketType() === 'INFANT') {
      return numberOfSeats;
    }
    return numberOfSeats += ticketTypeRequest.getNoOfTickets();
  }, 0);
};
