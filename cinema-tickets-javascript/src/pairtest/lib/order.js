export const calculateTotalNumberOfSeats = (ticketTypeRequests) => {
  // NOTE: If ticket infants are allocated a seat for some events, an implementation more similar to calculateTotalPrice can be used so this is dynamically calulated by adding 'seats' to the config object.
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
