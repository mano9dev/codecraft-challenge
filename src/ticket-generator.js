/**
 * Ticket Generator class
 * @property {number[]} tickets - list of tickets generated
 */
export class TicketGenerator {
  tickets = [];
  /**
   *
   * @param {number} total number of tickets to generate
   */
  constructor(total = 50) {
    if (!isNaN(total) && total > 0) {
      this.generateTicket(total);
    }
  }

  /**
   *
   * @param {number} total number of tickets to generate
   */
  generateTicket(total) {
    const tickets = [];
    for (let i = 0; i < total; i++) {
      tickets.push(i + 1);
    }
    this.tickets = tickets;
  }
}
