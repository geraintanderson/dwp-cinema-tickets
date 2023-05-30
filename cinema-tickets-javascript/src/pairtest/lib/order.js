export const calculateTotalNumberOfSeats = (ticketTypeRequests) => {
  return ticketTypeRequests.reduce((numberOfSeats, ticketTypeRequest) => {
    if (ticketTypeRequest.getTicketType() === 'INFANT') {
      return numberOfSeats;
    }
    return numberOfSeats += ticketTypeRequest.getNoOfTickets();
  }, 0);
};

export const calculateTotalPrice = (ticketConfig, ticketTypeRequests) => {
  return ticketTypeRequests.reduce((cumulativePrice, ticketTypeRequest) => {
    const ticketType = ticketTypeRequest.getTicketType();
    const numberOfTickets = ticketTypeRequest.getNoOfTickets();
    return cumulativePrice += (ticketConfig[ticketType].price * numberOfTickets);
  }, 0);
};
