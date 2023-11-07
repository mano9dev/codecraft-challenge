export class TicketDraw {
  /**
   * @type {import("..").Player[]}
   */
  players = [];

  portions = [75, 15, 10];
  kittyAmount = 200;
  /**
   * @type {import("..").Winner[]}
   */
  winners = [];
  constructor(players = []) {
    this.setPlayers(players);
  }

  /**
   * set players from which winner will be selected
   * @param {} players
   */
  setPlayers(players) {
    if (Array.isArray(players) && players.length > 0) {
      this.players = players;
    }
  }

  /**
   * Make draw and select winner from players list
   */
  draw() {
    /**
     * @type {import("..").Winner[]}
     */
    const winners = [];
    for (let i = 0; i < this.portions.length; i++) {
      /**
       * @type {import("..").Winner}
       */
      const winner = this.selectWinner();
      winner.amount = this.computeWinnerAmount(this.portions[i]);
      winners.push(winner);
    }
    this.winners = winners;
  }

  /**
   * select a random winner from players list
   * @returns {import("..).Player}
   */
  selectWinner() {
    const winnerIndex = Math.floor(Math.random() * this.players.length);
    return this.selectPlayerAt(winnerIndex);
  }

  /**
   * select player a provided index
   * @param {number} playerIndex
   * @returns {import("..").Player}
   */
  selectPlayerAt(playerIndex) {
    const player = this.players[playerIndex];
    this.players.splice(playerIndex, 1);
    return { ...player };
  }

  /**
   *
   * @param {number} portion
   * @returns {number}
   */
  computeWinnerAmount(portion) {
    const availableAmount = this.kittyAmount / 2;
    const rate = portion / 100;
    const winnerAmount = rate * availableAmount;
    return winnerAmount;
  }

  /**
   * format and print draw result
   */
  printResult() {
    let text = 'CodeCraft Challenge Results\n\n';
    const generique = ['1st', '2nd', '3rd', 'th'];
    this.winners.forEach((winner, index) => {
      text += `${index + 1 <= 3 ? generique[index] : index + 'th'} ball: [${
        winner.ticket
      }]\n`;
    });
    text += '\n\n';
    text += 'Winners:\n';

    this.winners.forEach((winner, index) => {
      text += `[${winner.name} ${index + 1}] : [${winner.amount} €]\n`;
    });

    console.log(text);
  }
}
