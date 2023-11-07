const { TicketGenerator } = require('../ticket-generator');

describe('TicketGenerator', () => {
  it('should generate default 50 tickets', () => {
    const tickerGenerator = new TicketGenerator();
    expect(tickerGenerator.tickets.length).toBe(50);

    const fifty = [];
    const size = 50;
    for (let i = 1; i <= size; i++) {
      fifty.push(i);
    }

    expect(tickerGenerator.tickets.toString()).toBe(fifty.toString());
  });

  it('should generate provided size of tickets', () => {
    const size = 100;

    const tickerGenerator = new TicketGenerator(size);
    expect(tickerGenerator.tickets.length).toBe(size);

    const hundred = [];
    for (let i = 1; i <= size; i++) {
      hundred.push(i);
    }
    expect(tickerGenerator.tickets.toString()).toBe(hundred.toString());
  });
});
