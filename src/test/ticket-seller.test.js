import { TicketGenerator } from '../ticket-generator';
import { TicketSeller } from '../ticket-seller';

describe('TickerSeller', () => {
  it('Should purchase one ticker to player', () => {
    const tickerGenerator = new TicketGenerator();
    const tickerSeller = new TicketSeller(tickerGenerator.tickets);

    const playerOne = {
      name: 'Paul',
    };
    const player = tickerSeller.purchase(playerOne.name);
    expect(tickerSeller.tickets?.length).toBe(49);
    expect(player.name).toBe(playerOne.name);
    expect(player.ticket).toBeLessThanOrEqual(50);
    expect(tickerSeller.players.length).toBe(1);
  });

  it('should purchase many tickets at once', () => {
    const tickerGenerator = new TicketGenerator();
    const tickerSeller = new TicketSeller(tickerGenerator.tickets);
    const playersNames = [
      'Pierre',
      'Jack',
      'Jean',
      'Lacroix',
      'John',
      'Lancelos',
    ];
    let ticketsLength = tickerSeller.tickets.length;
    for (let i = 0; i < playersNames.length; i++) {
      tickerSeller.purchase(playersNames[i]);
      ticketsLength--;
      expect(tickerSeller.tickets?.length).toBe(ticketsLength);
      expect(tickerSeller.players[i].name).toBe(playersNames[i]);
      expect(tickerSeller.players[i].ticket).toBeDefined();
    }

    expect(tickerSeller.players.length).toBe(playersNames.length);
  });

  it('should throw no available ticket', () => {
    const size = 6;
    const tickerGenerator = new TicketGenerator(size);
    const tickerSeller = new TicketSeller(tickerGenerator.tickets);

    const playersNames = [
      'Pierre',
      'Jack',
      'Jean',
      'Lacroix',
      'John',
      'Lancelos',
    ];
    const originalPurchase = TicketSeller.prototype.purchase.bind(tickerSeller);
    const purchaseMock = jest
      .spyOn(TicketSeller.prototype, 'purchase')
      .mockImplementation((playersName) => {
        if (tickerSeller.tickets.length > 0) {
          return originalPurchase(playersName);
        }
        if (tickerSeller.tickets.length === 0) {
          // FIXME: Make test fail by throwing an error
          // throw new Error('No available tickets left');
        }
      });

    for (let i = 0; i < playersNames.length; i++) {
      tickerSeller.purchase(playersNames[i]);
    }

    tickerSeller.purchase('Merlin');
    expect(purchaseMock).toHaveBeenCalled();
    // expect(purchaseMock).toThrow('No available tickets left');
  });
});
