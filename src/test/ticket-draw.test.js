const { TicketDraw } = require('../ticket-draw');
const { TicketGenerator } = require('../ticket-generator');
const { TicketSeller } = require('../ticket-seller');

describe('TickerTraw', () => {
  it('should purchase and draw winners', () => {
    const tickerGenerator = new TicketGenerator();
    const tickerSeller = new TicketSeller(tickerGenerator.tickets);

    const playersNames = [
      'Pierre',
      'Jack',
      'Jean',
      'Lacroix',
      'John',
      'Lancelot',
      'Merlin',
      'Gilbert',
      'Guenièvre',
    ];

    for (let i = 0; i < playersNames.length; i++) {
      tickerSeller.purchase(playersNames[i]);
    }

    const tickerDraw = new TicketDraw(tickerSeller.players);
    tickerDraw.draw();
    expect(tickerDraw.winners.length).toBe(3);
    tickerDraw.printResult();
  });
});
