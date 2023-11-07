export class TicketSeller {
  /**
   * @type {number[]}
   */
  tickets;
  /**
   * @type {Player[]}
   */
  players = [];
  constructor(tickets = []) {
    if (Array.isArray(tickets)) {
      this.tickets = tickets;
    }
  }

  /**
   * purchase a ticket for a player
   * @param {string} playerName player name
   * @returns {Player}
   */
  purchase(playerName) {
    if (this.tickets.length === 0) {
      throw new Error('No available tickets left');
    }
    const index = Math.floor(Math.random() * this.tickets.length);
    const player = {
      name: playerName,
      ticket: this.getPlayerTicket(index),
    };
    this.players.push(player);

    return player;
  }

  /**
   * Select a ticket number from the tickets
   * @param {number} index index of ticket to get
   * @returns {number}
   */
  getPlayerTicket(index) {
    const ticket = this.tickets[index];
    this.tickets.splice(index, 1);
    return ticket;
  }
}
